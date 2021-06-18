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

        }
        
        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("set/{error}/{warning}/{info}/{success}/{hide}")]
        public async Task<IActionResult> SetPodesavanja(string error,string warning,string info,string success,string hide)
        {
            bool er = false;
            bool w = false;
            bool i = false;
            bool s = false;
            bool h = false;
            if (error == "true") { er = true; }
            if (warning == "true") { w = true; }
            if (info == "true") { i = true; }
            if (success == "true") { s = true; }
            if (hide == "true") { h = true; }
            int id = _context.PodesavanjaTB.Count() + 1;
            Podesavanja pod = new Podesavanja(0,er,w,i,s,h);
            _context.PodesavanjaTB.Add(pod);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getPodesavanja")]
        public async Task<ActionResult<Podesavanja>> GetPOdesavanja()
        {
            return Ok(_context.PodesavanjaTB.Find(_context.PodesavanjaTB.Count()));
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getStreets")]
        public async Task<ActionResult<List<string>>> GetAdrese()
        {
            List<string> rv = new List<string>();
            foreach (var s in _context.PoziviTB)
            {
                rv.Add(s.Ulica);
            }
            return Ok(rv);
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getRequestedRole")]
        public async Task<ActionResult<List<string>>> GetRequestedRole()
        {
            List<string> rv = new List<string>();
            foreach(var us in _context.UsersTB)
            {
                if (us.RequestedRole != us.Role && (us.RequestedRole != "" && us.RequestedRole != null))
                {
                    rv.Add("User with id ~" + us.UserID + "~ has role ~" + us.Role + "~ and has requested role ~" + us.RequestedRole + "~");
                }
            }
            return Ok(rv);
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("approveRole/{id}/{requested}")]
        public async Task<IActionResult> Approve(string id, string requested)
        {
            var user = _context.UsersTB.Find(id);
            user.Role = requested;
            _context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.Update(user);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("setPassword/{id}/{password}")]
        public async Task<IActionResult> SetPassword(string id, string password)
        {
            var user = _context.UsersTB.Find(id);
            user.Password = password;
            _context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.Update(user);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("setPrioritet/{street}/{prioritet}")]
        public async Task<IActionResult> SetPrioritet(string street,string prioritet)
        {
            int prio = 0;
            try
            {
                prio = Int32.Parse(prioritet); 
            } catch
            {
                prio = 0;
                return NoContent();
            }
            Poziv poz = null;
            foreach(var p in _context.PoziviTB)
            {
                if (p.Ulica == street)
                {
                    poz = p;
                    break;

                    p.Prioritet = prio;
                    _context.Entry(p).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    _context.Update(p);
                     _context.SaveChanges();
                   // return Ok();
                }
            }
            if (poz != null)
            {
                poz.Prioritet = prio;
                _context.Entry(poz).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.Update(poz);
                var upd = await _context.SaveChangesAsync();
               // return Ok();
            }
            return Ok();
        }


        [EnableCors("MyPolicy")]
        [HttpPost, DisableRequestSizeLimit]
        [Route("edit/{id}/{username}/{email}/{ime}/{prezime}/{datum}/{address}/{role}")]
        public async Task<IActionResult> EditUser(string id,string username,string email,string ime,string prezime,string datum,string address,string role)
        {
            User modified = _context.UsersTB.Find(id);
            /*
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
             } */
            try
            {
                modified.Username = username;
                modified.Email = email;

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
            } catch (Exception e)
            {
                return Conflict();
            }
        }
    }
}
