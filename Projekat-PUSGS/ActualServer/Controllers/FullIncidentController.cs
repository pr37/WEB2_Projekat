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
    public class FullIncidentController : ControllerBase
    {

        private readonly ApplicationContext _context;
        public FullIncidentController(ApplicationContext context)
        {
            _context = context;
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("addfullincident/{incidentID}/{affCustomers}/{voltage}/{incidentPriority}/{createdOn}/{eta}/{etr}/{ata}/{sheduled}/{type}/{status}/{calls}/{confirmed}/{toMe}/{devicesNames}/{uzrok}/{poduzrok}/{konstrukcija}/{materijal}")]
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
            string toMe, 
            string devicesNames,
            string uzrok,
            string poduzrok,
            string konstrukcija,
            string materijal)
        {
            Incident incident = new Incident(incidentID, affCustomers, voltage, incidentPriority, createdOn, eta, etr, ata, sheduled, type, status, calls, confirmed, toMe,
                                            devicesNames,
                                            uzrok, poduzrok, konstrukcija, materijal);
            _context.IncidentTB.Add(incident);

            await _context.SaveChangesAsync();
            return Ok();

        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getnewid")]
        public async Task<ActionResult<string>> GetIncidentId()
        {
            return Ok((_context.IncidentTB.Count() + 1).ToString());
        }
    }
}
