using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories;
using Models;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotifikacijeController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public NotifikacijeController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Add(Notifikacija notifikacija)
        {

            _context.NotifikacijeTB.Add(notifikacija);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Notifikacija>>> Get(string userID)
        //{
        //    return Ok(_context.NotifikacijeTB.Where(x => x.ForUserID.Equals(userID)));
        //}

    }
}
