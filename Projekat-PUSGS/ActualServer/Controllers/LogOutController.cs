using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActualServer.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    [Route("[controller]")]
    public class LogOutController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public LogOutController(ApplicationContext context)
        {
            _context = context;
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("logout/{userid}")]
        public async Task<IActionResult> ConfirmLogout(string userid)
        {

            User us = _context.UsersTB.Find(userid);
            if (us != null)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
