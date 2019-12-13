﻿using System;
 using System.Linq;
using DataAccessLayer;
 using Livecode11.Models;
 using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StackOverFlow;
using WebServiceToken.Models;

namespace WebServiceToken.Controllers
{
    [ApiController]
    [Route("api/words")]
    public class WordsController : Controller
    { 
        private readonly IDataService _dataService;

        public WordsController(IDataService dataService)
        {
            _dataService = dataService;
        }
        
        [HttpPost]
        public ActionResult<SearchWord> GetSearchWords([FromBody]IdForWords id)
        {
            var words = _dataService.GetWords(id.Id);

            if (words == null) return NotFound();

            return Ok(words);
        }
        
        [HttpPost("stop")]
        
        public ActionResult GetStopWords()
        {
            var stopwords = _dataService.GetStopWords();

            if (stopwords == null) return NotFound();
            
            return Ok(stopwords); 
        }
    }
}
