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
    public class PodesavanjaController : ControllerBase
    
    {
        private readonly ApplicationContext _context;
        public PodesavanjaController(ApplicationContext context)
        {
            _context = context;
        }
        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("user/{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            return Ok(_context.UsersTB.Where(x => x.UserID == id));
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("image/{id}")]
        public async Task<dynamic> GetImage(string id)
        {
            User u = _context.UsersTB.Find(id);
            return u.Image;

            //var stream = new MemoryStream(u.Image);
           // return stream;
           // return new FileContentResult(u.Image, "image/jpg");
            //return System.Convert.ToBase64String(u.Image);
        }

        [EnableCors("MyPolicy")]
        [HttpPost, DisableRequestSizeLimit]
        [Route("edit/{id}/{username}/{email}/{ime}/{prezime}/{datum}/{address}/{role}")]
        public async Task<IActionResult> EditUser(string id,string username,string email,string ime,string prezime,string datum,string address,string role)
        {
            User modified = _context.UsersTB.Find(id);
           
            if (modified.Username != username)
            {
                if (_context.UsersTB.First(x => x.Username == username) == null)
                {
                    modified.Username = username;
                }
                else
                {
                    return Conflict();
                }
            }
            if (modified.Email != email)
            {
                if (_context.UsersTB.First(x => x.Email == email) == null)
                {
                    modified.Email = email;
                }
                else
                {
                    return Conflict();
                }
            } 

            modified.Ime = ime;
            modified.Prezime = prezime;
            modified.DateOfBirth = DateTime.Parse(datum);
            modified.Address = address;
            modified.RequestedRole = role;
            
            var file = Request.Form.Files[0];
            MemoryStream ms = new MemoryStream();
            file.CopyTo(ms);
            modified.Image = ms.ToArray();

            _context.Entry(modified).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.Update(modified);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
