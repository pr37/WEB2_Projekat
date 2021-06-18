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
    public class PoziviController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public PoziviController(ApplicationContext context)
        {
            _context = context;
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("add/{userid}/{problem}/{adresa}/{longitude}/{latitude}")]
        public async Task<IActionResult> Add(string userid,string problem, string adresa,string longitude,string latitude)
        {
            double lat = double.Parse(latitude);
            double lon = double.Parse(longitude);
            string pid = _context.PoziviTB.Count().ToString();
            Poziv poziv = new Poziv(pid, adresa, 0, lat,lon, userid, problem);
            _context.PoziviTB.Add(poziv);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("get/{userid}")]
        public async Task<ActionResult<IEnumerable<Poziv>>> Get(string userid)
        {
            return Ok(_context.PoziviTB.Where(x => x.UserID.Equals(userid)));
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getall")]
        public async Task<ActionResult<IEnumerable<Poziv>>> GetAll()
        {
            return Ok(_context.PoziviTB);
        }
    }
}
