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
    public class BezbednosniDokumentiInfoController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public BezbednosniDokumentiInfoController(ApplicationContext context)
        {
            _context = context;
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("add/{type}/{planRada}/{status}/{username}/{ekipa}/{detalji}/{beleske}/{telBroj}/{createdOn}/{devicesNames}/{check1}/{check2}/{check3}/{check4}")]
        public async Task<IActionResult> Add(string type, string planRada, string status, string username, string ekipa, string detalji, string beleske, string telBroj, string createdOn, string devicesNames, string check1, string check2, string check3, string check4, string evaluating, string approved, string discard)
        {
            int count = _context.BezbednosniDokumentiOsnovniInfoTB.Count() + 1;
            string pid = count.ToString();
            BezbednosniDokumentiOsnovniInfo info = new BezbednosniDokumentiOsnovniInfo(pid, type, planRada, status, username, ekipa, detalji, beleske, telBroj, createdOn, devicesNames, check1, check2, check3, check4, "temp", "temp", "temp");
            _context.BezbednosniDokumentiOsnovniInfoTB.Add(info);

            await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getall")]
        public async Task<ActionResult<IEnumerable<BezbednosniDokumentiOsnovniInfo>>> Get()
        {
            return Ok(_context.BezbednosniDokumentiOsnovniInfoTB);
        }
    }
}