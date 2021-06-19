using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ActualServer.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    [Route("[controller]")]
    public class ResolutionController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public ResolutionController(ApplicationContext context)
        {
            _context = context;
        }
        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("add/{id}/{uzrok}/{poduzrok}/{konstrukcija}/{materijal}")]
        public async Task<IActionResult> Add(string id, string uzrok, string poduzrok, string konstrukcija, string materijal)
        {
            Resolution resolution = new Resolution(id, uzrok, poduzrok, konstrukcija, materijal);            
            _context.ResolutionTB.Add(resolution);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
