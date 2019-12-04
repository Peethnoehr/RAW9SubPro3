﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Livecode8.Controllers
{
    [ApiController]
    [Route("api/names")]
    public class NamesController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(new string[]
            {
                "Peter",
                "John",
                "Sue",
                "Ellen"
            });
        }
    }
}
