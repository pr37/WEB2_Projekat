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
    public class PotrosaciController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public PotrosaciController(ApplicationContext context)
        {
            _context = context;
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("add/{ime}/{prezime}/{adresa}/{phoneno}/{tip}")]
        public async Task<IActionResult> Add(string ime,string prezime, string adresa, string phoneno, string tip)
        {
            Potrosac potrosac = new Potrosac("", ime, prezime, adresa,phoneno, tip, false);
            int count = _context.PotrosaciTB.Count() + 1;
            potrosac.PotrosacID = count.ToString();
            _context.Add(potrosac);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            Potrosac potr = _context.PotrosaciTB.Find(id);
            if (potr != null)
            {
                potr.Deleted = true;
                _context.Entry(potr).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.Update(potr);
                var upd = await _context.SaveChangesAsync();
                return Ok(id);

            }

            return NotFound(id);
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("edit/{id}/{ime}/{prezime}/{adresa}/{phoneno}/{tip}")]
        public async Task<IActionResult> Edit(string id,string ime, string prezime, string adresa, string phoneno, string tip)
        {
            Potrosac potr = _context.PotrosaciTB.Find(id);

            //List<Potrosac> arr = _context.PotrosaciTB.Where(x => x.PotrosacID == id).ToList();
           // potr = arr[0];
            potr.Ime = ime;
            potr.Prezime = prezime;
            potr.Adresa = adresa;
            potr.PhoneNo = phoneno;
            potr.TipPotrosaca = tip;
            _context.Entry(potr).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.Update(potr);
            var upd = await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<IEnumerable<Potrosac>>> Get()
        {
            return Ok(_context.PotrosaciTB.Where(x => x.Deleted == false));
        }
    }
}
