using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories;
using Models;

namespace WebApplication.Controllers
{
    public class NotifikacijeController : Controller
    {
        private readonly ApplicationContext _context;
        public NotifikacijeController(ApplicationContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("AddNotification")]
        public async Task<IActionResult> Add(Notifikacija notifikacija)
        {

            _context.NotifikacijeTB.Add(notifikacija);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
