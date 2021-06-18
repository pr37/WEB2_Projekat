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
    public class Temp1Controller : ControllerBase
    {
        private readonly ApplicationContext _context;
        public Temp1Controller(ApplicationContext context)
        {
            _context = context;
        }
        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("add/{affCustomers}/{voltage}")]
        public async Task<IActionResult> AddTemp1(string affCustomers, string voltage)
        {
            int count = _context.Temp1TB.Count() + 1;            
            string temp1D = count.ToString();
            Temp1 pl = new Temp1(temp1D, affCustomers, voltage);
            _context.Add(pl);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
