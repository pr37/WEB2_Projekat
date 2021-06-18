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
    public class AdresaController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public AdresaController(ApplicationContext context)
        {
            _context = context;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getall")]
        public async Task<ActionResult<IEnumerable<Adresa>>> Get()
        {
            return Ok(_context.AdresaTB);
        }
    }
}
