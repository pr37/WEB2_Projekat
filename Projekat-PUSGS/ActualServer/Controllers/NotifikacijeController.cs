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
    public class NotifikacijeController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public NotifikacijeController(ApplicationContext context)
        {
            _context = context;
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        public async Task<IActionResult> Add(Notifikacija notifikacija)
        {

            _context.NotifikacijeTB.Add(notifikacija);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("{userID}")]
        public async Task<ActionResult<IEnumerable<Notifikacija>>> Get(string userID)
        {
            return Ok(_context.NotifikacijeTB.Where(x => x.ForUserID.Equals(userID)));
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("unread/{userID}")]
        public async Task<ActionResult<IEnumerable<Notifikacija>>> GetUnread(string userID)
        {
            return Ok(_context.NotifikacijeTB.Where(x => x.ForUserID.Equals(userID) && x.Read == false));
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("read/{id}")]
        public async Task<IActionResult> Update(string id)
        {
            
            Notifikacija notif = _context.NotifikacijeTB.Find(id);
            if (notif != null)
            {
                notif.Read = true;
                _context.Entry(notif).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.Update(notif);
                var upd = await _context.SaveChangesAsync();
                return Ok();

            }

            return Ok(id);
        }


    }
}
