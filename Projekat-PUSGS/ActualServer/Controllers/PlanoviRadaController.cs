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
    public class PlanoviRadaController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public PlanoviRadaController(ApplicationContext context)
        {
            _context = context;
        }
        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("add/{userid}/{createdby}/{status}/{datecreated}/{company}/{tipnacemu}/{startdate}/{enddate}/{adresa}/{svrha}/{beleske}/{detalji}/{tiprada}/{phoneno}")]
        public async Task<IActionResult> AddPlanRada(string userid,string createdby,string status,string datecreated, string company, string tipnacemu, string startdate, string enddate, string adresa, string svrha, string beleske, string detalji, string tiprada, string phoneno)
        {
            int count = _context.PlanoviRadaTB.Count() + 1;
            string plID = count.ToString();
            PlanRada pl = new PlanRada(plID, userid, createdby, DateTime.Parse(datecreated), company,tipnacemu, DateTime.Parse(startdate), DateTime.Parse(enddate), tiprada, phoneno, "", "", "", adresa, svrha, detalji, beleske);
            pl.Status = status;
            pl.UserID = userid;
            _context.Add(pl);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("editPlanrada/{planid}/{createdby}/{status}/{company}/{tipnacemu}/{startdate}/{enddate}/{adresa}/{svrha}/{beleske}/{detalji}/{tiprada}/{phoneno}")]
        public async Task<IActionResult> EditPlanRada(string planid,string createdby, string status, string company, string tipnacemu, string startdate, string enddate, string adresa, string svrha, string beleske, string detalji, string tiprada, string phoneno)
        {

            //PlanRada pl = new PlanRada(plID, createdby, createdby, DateTime.Parse(datecreated), company, tipnacemu, DateTime.Parse(startdate), DateTime.Parse(enddate), tiprada, phoneno, "", "", "", adresa, svrha, detalji, beleske);
            PlanRada pl = _context.PlanoviRadaTB.Find(planid);
            pl.Company = company;
            pl.TipNaCemu = tipnacemu;
            pl.StartDate = DateTime.Parse(startdate);
            pl.EndDate = DateTime.Parse(enddate);
            pl.TipRada = tiprada;
            pl.PhoneNo = phoneno;
            pl.Svrha = svrha;
            pl.Detalji = detalji;
            pl.Beleske = beleske;
            pl.Status = status;
            _context.Entry(pl).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.Update(pl);
            var upd = await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("getone/{docid}/{state}")]
        public async Task<IActionResult> ChangeDocumentState(string docid,string state)
        {
            PlanRada pl = _context.PlanoviRadaTB.Find(docid);
            pl.Status = state;
            _context.Entry(pl).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.Update(pl);
            var upd = await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("gethistory/{id}")]
        public async Task<ActionResult<PlanRada>> GetHistory(string id)
        {
            return Ok(_context.IstorijeTB.Where(x => x.PlanRadaID == id));
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("getone/{docid}/{equipmentid}")]
        public async Task<IActionResult> SetEquipment(string docid,string equipmentid)
        {
            PlanRada pl = _context.PlanoviRadaTB.Find(docid);
            //TODO
            //pl.
            //_context.Entry(pl).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            //_context.Update(pl);
            //var upd = await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("addinstruction/{docid}/{text}/{equipment}")]
        public async Task<IActionResult> AddInstruction(string docid, string text,string equipment)
        {
            //id: "2a", text: result[0].text, executed: "UNEXECUTED", equipment: result[0].eqp, validated: "NOT VALIDATED"
            int count = _context.InstrukcijeTB.Count() + 1;
            string plID = count.ToString();
            Instruction inst = new Instruction(plID, docid, text, equipment, false, false, false);
            _context.Add(inst);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getallinstructions/{planid}")]
        public async Task<ActionResult<IEnumerable<Instruction>>> GetInstrukcije(string planid)
        {
            return Ok(_context.InstrukcijeTB.Where(x => x.PlanRadaID.Equals(planid)));
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("executeinstruction/{instid}")]
        public async Task<IActionResult> Execute(string instid)
        {
            Instruction inst = _context.InstrukcijeTB.Find(instid);
            inst.Executed = true;
            _context.Entry(inst).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.Update(inst);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("deleteinstruction/{instid}")]
        public async Task<IActionResult> DeleteInstruction(string instid)
        {
            Instruction inst = _context.InstrukcijeTB.Find(instid);
            inst.Deleted = true;
            _context.Entry(inst).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.Update(inst);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("deleteimage/{imageid}")]
        public async Task<IActionResult> DeleteImage(string imageid)
        {
            MultimediaPlanRada mpl = _context.MultimedijeTB.Find(imageid);
            mpl.Deleted = true;
            _context.Entry(mpl).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.Update(mpl);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("copyimage/{imageid}/{planradaid}")]
        public async Task<IActionResult> CopyImage(string imageid,string planradaid)
        {
            MultimediaPlanRada mpl = _context.MultimedijeTB.Find(imageid);
            int count = _context.MultimedijeTB.Count() + 1;
            byte[] ImgCopy = (byte[])mpl.Image.Clone();
            MultimediaPlanRada mpl2 = new MultimediaPlanRada(planradaid, false,ImgCopy, mpl.ImageUrl,count);
            _context.Add(mpl2);
            await _context.SaveChangesAsync();
            return Ok();
        }

        //[EnableCors("MyPolicy")]
        //[HttpPut]
        //[Route("copyimage/{planradaid}/{imageurl}")]
        //public async Task<IActionResult> CopyImage2(string planradaid,string imageurl)
        //{
            
        //        int count = _context.MultimedijeTB.Count() + 1;
        //    MultimediaPlanRada mpl = new MultimediaPlanRada(planradaid,false,null,imageurl,count);
        //    foreach (var file in Request.Form.Files)
        //    {
        //        MemoryStream ms = new MemoryStream();
        //        file.CopyTo(ms);
        //        mpl.Image = ms.ToArray();

        //    }
        //    _context.Add(mpl);
        //    await _context.SaveChangesAsync();
        //    return Ok();
        //}

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("addimage/{planradaid}/{imgurl}")]
        public async Task<IActionResult> AddImage(string planradaid,string imgurl)
        {

            int count = _context.MultimedijeTB.Count() + 1;
            MultimediaPlanRada mpl = new MultimediaPlanRada(planradaid, false, null, imgurl, 0);
            var file = Request.Form.Files[0];
            MemoryStream ms = new MemoryStream();
            file.CopyTo(ms);
            mpl.Image = ms.ToArray();
            _context.MultimedijeTB.Add(mpl);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getimages/{planradaid}")]
        public async Task<ActionResult<List<string>>> GetImages(string planradaid)
        {
            List<string> rv = new List<string>();
            foreach(var m in _context.MultimedijeTB)
            {
                if (m.Deleted != true && m.PlanRadaID.Equals(planradaid))
                {
                    
                    string temp = Convert.ToBase64String(m.Image, 0, m.Image.Length);
                    string tmp2 = "data:image/jpeg;base64," + temp;
                    rv.Add(tmp2);
                }
            }
            return Ok(rv);
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("validateinstructions/{docid}")]
        public async Task<IActionResult> ValidateInstructions(string docid)
        {
            foreach (Instruction inst in _context.InstrukcijeTB)
            {

                if (inst.PlanRadaID.Equals(docid))
                {
                    PlanRada pl = _context.PlanoviRadaTB.Find(docid);
                    //find equipmentTb(inst.equipment)
                    //TODO if pl.Adresa == equipment.Adresa => validated
                    inst.Validated = true;
                    _context.Entry(inst).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    _context.Update(inst);
                    await _context.SaveChangesAsync();
                }
            }
            return Ok();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getinstructions/{docid}")]
        public async Task<ActionResult<PlanRada>> GetInstructions(string docid)
        {
            return Ok(_context.InstrukcijeTB.Where(x => x.PlanRadaID == docid));
        }

       [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getone/{id}")]

        public async Task<ActionResult<PlanRada>> GetPlanRada(string id)
        {
            return Ok(_context.PlanoviRadaTB.Find(id));
        }
        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getall")]
        public async Task<ActionResult<IEnumerable<PlanRada>>> Get()
        {
            return Ok(_context.PlanoviRadaTB);
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("getmy/{id}")]
        public async Task<ActionResult<IEnumerable<PlanRada>>> GetMy(string id)
        {
            return Ok(_context.PlanoviRadaTB.Where(x => x.UserID == id));
        }
    }
}
