﻿﻿using System;
using System.Collections.Generic;
 using System.Diagnostics;
 using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StackOverFlow;
using WebServiceToken.Models;
using WebServiceToken.Services;

namespace WebServiceToken.Controllers
{
    [ApiController]
    [Route("api/search")]
    public class SearchController : Controller
    {
        private readonly IDataService _dataService;

        public SearchController(IDataService dataService, IConfiguration configuration)
        {
            _dataService = dataService;
        }
        
        /*
         * URI: POST api/search
         * Takes a user object input
         * Returns the full search history of the user
         */
        [HttpPost]
        public ActionResult GetSearch([FromBody]User user)
        {
            var searchHistories = _dataService.GetSearchHistories(user.UserName);
            if (searchHistories == null) return NotFound();

            return Ok(searchHistories);
        }
    }
}