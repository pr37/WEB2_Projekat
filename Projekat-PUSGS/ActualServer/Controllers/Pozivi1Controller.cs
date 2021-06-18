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
    public class Pozivi1Controller : ControllerBase
    {
        private readonly ApplicationContext _context;
        public Pozivi1Controller(ApplicationContext context)
        {
            _context = context;
        }
        
        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("add/{razlog}/{uzrok}/{komentar}/{userId}")]
        public async Task<IActionResult> AddPozivi1(string razlog, string uzrok, string komentar, string userId)
        {
            int count = _context.Pozivi1TB.Count() + 1;
            string pid = count.ToString();
            Poziv1 poziv = new Poziv1(pid, razlog, uzrok, komentar, userId);
            _context.Pozivi1TB.Add(poziv);

            await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getall")]
        public async Task<ActionResult<IEnumerable<Poziv1>>> Get()
        {
            return Ok(_context.Pozivi1TB);
        }
    }
}
