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
    public class OpremaController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public OpremaController(ApplicationContext context)
        {
            _context = context;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getnewid")]
        public async Task<ActionResult<string>> GetNewId()
        {
            return Ok((_context.OpremaTB.Count() + 1).ToString());
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getnewname/{type}")]
        public async Task<ActionResult<string>> GetNewName(string type)
        {
            return Ok((_context.OpremaTB.Where(x => x.Type == type).Count() + 1).ToString());
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("add/{id}/{name}/{type}/{adresa}")]
        public async Task<IActionResult> AddOpremu(string id, string name, string type, string adresa)
        {
            Oprema oprema = new Oprema(id, name, type, adresa);
            _context.OpremaTB.Add(oprema);

            await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getall")]
        public async Task<ActionResult<IEnumerable<Oprema>>> Get()
        {
            return Ok(_context.OpremaTB.Where(x => x.Adresa != "obrisan"));
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getbyid/{id}")]
        public async Task<ActionResult<IEnumerable<Oprema>>> GetById(string id)
        {
            return Ok(_context.OpremaTB.Where(x => x.Id == id));
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("edit/{id}/{adresa}")]
        public async Task<IActionResult> edit(string id, string adresa)
        {
            Oprema elementMreze = _context.OpremaTB.Find(id);
            if (elementMreze != null)
            {
                elementMreze.Adresa = adresa;
                _context.Entry(elementMreze).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.Update(elementMreze);

                var upd = await _context.SaveChangesAsync();
                return Ok(id);
            }
            return NotFound(id);
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("delete/{id}")]
        public async Task<IActionResult> delete(string id)
        {
            Oprema elementMreze = _context.OpremaTB.Find(id);
            if (elementMreze != null)
            {
                elementMreze.Adresa = "obrisan";
                _context.Entry(elementMreze).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.Update(elementMreze);

                var upd = await _context.SaveChangesAsync();
                return Ok(id);
            }
            return NotFound(id);
        }
    }
}