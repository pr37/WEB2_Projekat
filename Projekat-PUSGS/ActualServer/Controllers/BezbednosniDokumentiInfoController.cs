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
        [Route("add/{type}/{planRada}/{status}/{username}/{ekipa}/{detalji}/{beleske}/{telBroj}/{createdOn}")]
        public async Task<IActionResult> Add(string type, string planRada, string status, string username, string ekipa, string detalji, string beleske, string telBroj, string createdOn)
        {
            int count = _context.BezbednosniDokumentiOsnovniInfoTB.Count() + 1;
            string pid = count.ToString();
            BezbednosniDokumentiOsnovniInfo info = new BezbednosniDokumentiOsnovniInfo(pid, type, planRada, status, username, ekipa, detalji, beleske, telBroj, createdOn);
            _context.BezbednosniDokumentiOsnovniInfoTB.Add(info);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}