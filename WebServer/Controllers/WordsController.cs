﻿using System;
 using System.Collections.Generic;
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
        public ActionResult<SearchWord> GetSearchWords([FromBody]IdForWords[] id)
        {
            List<int> listIds = new List<int>();
            for (int i = 0; i < id.Length; i++)
            {
                listIds.Add(id[i].Id);
            }
            int[] arrayIds = listIds.ToArray();
            var words = _dataService.GetWords(arrayIds);

            if (words == null) return NotFound();

            List<ReturnWord> returnList = new List<ReturnWord>();
            for (int j = 0; j < words.Count; j++)
            {
                ReturnWord tempword = new ReturnWord() {Text = words[j].Word, Weight = words[j].Weight};
                returnList.Add(tempword);
            }
            
            return Ok(returnList.ToArray());
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
