﻿using System;
using System.Collections.Generic;
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
    [Route("api/mark")]
    public class MarkingController : Controller
    {
        private readonly IDataService _dataService;

        public MarkingController(IDataService dataService, IConfiguration configuration)
        {
            _dataService = dataService;
        }

        /*
         * URI: POST api/mark/markings
         * Accepts a User object input
         * Returns all markings if there are any
         */
        [HttpPost("markings")]
        public ActionResult GetMarkings([FromBody]User user)
        {
            var markings = _dataService.GetMarkings(user.UserName);
            
            if (markings == null) return NotFound();

            return Ok(markings);
        }
        
        /*
         * URI: POST api/mark
         * CREATE accepts a Marking object input
         * Creates the given marking
         */
        [HttpPost]
        public ActionResult<Marking> CreateMarking([FromBody] Marking marking)
        {
            var markingCreated = _dataService.CreateMarking(marking.Annotation, marking.Username,marking.PostId,marking.CommentId,DateTime.Now);;

            return Created("Created Marking", markingCreated);
        }

        /*
         * URI: PUT api/mark
         * accepts a marking, updates the given marking.
         * This usually means the annotation
         */
        [HttpPut]
        public ActionResult<Marking> UpdateMarking([FromBody] Marking marking)
        {
            if (!_dataService.UpdateMarking(marking.Id, marking.Annotation))
                return NotFound();
            return Ok(new Marking(){Id = marking.Id, Annotation = marking.Annotation});
        }
        
        /*
         * URI: DELETE api/mark/{markingid}
         * Deletes the given marking if it exists
         */
        [HttpDelete("{markingid}")]
        public ActionResult DeleteMarking(int markingid)
        {
            if (!_dataService.DeleteMarking(markingid))
                return NotFound();
            return Ok();
        }
    }
}