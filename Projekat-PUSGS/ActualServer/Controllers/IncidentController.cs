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
    public class IncidentController : ControllerBase
    {

        private readonly ApplicationContext _context;
        public IncidentController(ApplicationContext context)
        {
            _context = context;
        }
        
        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("addOsnovniInfo/{incidentID}/{affCustomers}/{voltage}/{incidentPriority}/{createdOn}/{eta}/{etr}/{ata}/{sheduled}/{type}/{status}/{calls}/{confirmed}/{toMe}")]       
        public async Task<IActionResult> addIncidentOsnovniInfo(string incidentID,
            string affCustomers,
            string voltage,
            string incidentPriority,
            string createdOn,
            string eta,
            string etr,
            string ata,
            string sheduled,
            string type,
            string status,
            string calls,
            string confirmed,
            string toMe)
        {            
            IncidentOsnovInfo ioi = new IncidentOsnovInfo(incidentID, affCustomers, voltage, incidentPriority, createdOn, eta, etr, ata, sheduled, type, status, calls, confirmed, toMe);
            _context.IncidentOsnovInfoTB.Add(ioi);
            
            await _context.SaveChangesAsync();
            return Ok();
            
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getnewid")]
        public async Task<ActionResult<string>> GetIncidentId()
        {            
            return Ok((_context.IncidentOsnovInfoTB.Count() + 1).ToString());
        }
    }
}
