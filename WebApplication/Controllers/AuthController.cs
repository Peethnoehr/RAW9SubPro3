using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StackOverFlow;
using WebServiceToken.Models;
using WebServiceToken.Services;

namespace WebServiceToken.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IDataService _dataService;
        private readonly IConfiguration _configuration;

        public AuthController(IDataService dataService, IConfiguration configuration)
        {
            _dataService = dataService;
            _configuration = configuration;
        }

        /*
         * URI: api/auth/users
         * Accepts a UserForCreationDto with Username, Password, Email
         * If Username or Password is null, then return error.
         * Otherwise create the user, same as updating the user except it is a CREATE not an UPDATE.
         */
        [HttpPost("users")]
        public ActionResult CreateUser([FromBody] UserForCreationDto dto)
        {
            if (_dataService.GetUser(dto.UserName) != null)
            {
                return BadRequest();
            }

            int.TryParse(
                _configuration.GetSection("Auth:PwdSize").Value, 
                out var size);

            if (size == 0)
            {
                throw new ArgumentException();
            }

            var salt = PasswordService.GenerateSalt(size);

            var pwd = PasswordService.HashPassword(dto.Password, salt, size);

            _dataService.CreateUser(dto.UserName, pwd, dto.Email, salt, DateTime.Now);

            return CreatedAtRoute(null, salt);
        }

        /*
         * URI: api/auth/tokens
         * Takes a login request DTO with variables UserName and Password.
         * If either is null, return error.
         * Then it fetches the user's salt and hashes the password and compares this with the hashed password of the user.
         * If all is OK it returns a token that expires after 10 minutes, as well as the username.
         */
        [HttpPost("tokens")]
        public ActionResult Login([FromBody] UserForLoginDto dto)
        {
            var user = _dataService.GetUser(dto.UserName);

            if (user == null)
            {
                return BadRequest();
            }

            int.TryParse(
                _configuration.GetSection("Auth:PwdSize").Value,
                out var size);

            if (size == 0)
            {
                throw new ArgumentException();
            }

            var pwd = PasswordService.HashPassword(dto.Password, user.Salt, size);

            if(user.Password != pwd)
            {
                return BadRequest();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Auth:Key"]);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                }),
                Expires = DateTime.Now.AddSeconds(600),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var securityToken = tokenHandler.CreateToken(tokenDescription);

            var token = tokenHandler.WriteToken(securityToken);

            return Ok(new {user.UserName, token});

        }
        
        /*
         * URI: api/auth
         * Takes a User dto with UserName, Password, Email
         * If either UserName or Password is null then return error
         * Otherwise hash the new password and update all the information.
         */
        [HttpPut]
        public ActionResult UpdateUser([FromBody] User dto)
        {
            int.TryParse(HttpContext.User.Identity.Name, out var id);
            if (_dataService.GetUser(dto.UserName) == null)
            {
                return BadRequest();
            }

            int.TryParse(
                _configuration.GetSection("Auth:PwdSize").Value, 
                out var size);

            if (size == 0)
            {
                throw new ArgumentException();
            }

            var salt = PasswordService.GenerateSalt(size);

            var pwd = PasswordService.HashPassword(dto.Password, salt, size);

            var user = _dataService.UpdateUser(dto.UserName, pwd, dto.Email, salt);

            return Ok(salt);
        }

        /*
         * URI: api/auth/{username}
         * If user not found, return error.
         * Otherwise delete the user.
         */
        [HttpDelete("{username}")]
        public ActionResult DeleteUser(string username)
        {
            if (!_dataService.DeleteUser(username))
                return NotFound();
            return Ok();
        }
        
    }
}
