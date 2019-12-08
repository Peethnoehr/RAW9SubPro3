﻿using System.Linq;
using DataAccessLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StackOverFlow;
using WebServiceToken.Models;

namespace WebServiceToken.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostsController : Controller
    { 
        private readonly IDataService _dataService;

        public PostsController(IDataService dataService)
        {
            _dataService = dataService;
        }

        /*
         * URI: POST api/posts
         * Accepts a Question object, though it can be empty.
         * Then it gets one answer with the questions post-id
         * Then it sets the questions post id to the answers' related questions' postid
         * Then it gets all the information relevant to the question of that postid
         * If there are none, returns notfound.
         */
        [HttpPost]
        public ActionResult<Question> GetDetailQuestion([FromBody]Question post)
        {
            var answer = _dataService.getAnswer(post.Id);     //
                                                            //This part makes no sense to me
            if (answer != null)                                //
            {                                               //If we already have a questionId why would we need to go 
                post.Id = answer.QuestionId;                //through the hoops of checking the answer of the question 
            }                                               //for the id of the question???
            
            var question = _dataService.GetDetailQuestion(post.Id);

            if (question == null) return NotFound();

            return Ok(question);
        }
        
        /*
         * URI: POST api/posts/search
         * Accepts a search text
         * calls searchPosts method which should utilize the indexed searching and return the results.
         */
        [HttpPost("search")]
        public ActionResult GetSearch([FromBody]TextForPost searchtext)
        {
            var search = _dataService.searchPosts(searchtext.SearchText);
            // var user = 
            // var addsearchhistory = _dataService.CreateSearchHistory(searchtext,user);
            if (search == null) return NotFound();

            return Ok(search); //Does this actually return anything??
        }
    }
}
