using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Models;

namespace Repositories
{
   public  class ApplicationContext : DbContext
    {
        public ApplicationContext (DbContextOptions<ApplicationContext> options) : base(options) 
        {
            //this.Database.SetConnectionString("Server=(localdb)\\mssqllocaldb;Database=WEB2DB;Trusted_Connection=True;MultipleActiveResultSets=true");
        }

        //TABELS
        public DbSet<Models.Instruction> InstrukcijeTB { get; set; }
        public DbSet<Models.IstorijaPromenePlanaRada> IstorijeTB { get; set; }
        public DbSet<Models.MultimediaPlanRada> MultimedijeTB { get; set; }
        public DbSet<Models.Notifikacija> NotifikacijeTB { get; set; }
        public DbSet<Models.PlanRada> PlanoviRadaTB { get; set; }
        public DbSet<Models.Potrosac> PotrosaciTB { get; set; }
        public DbSet<Models.Poziv> PoziviTB { get; set; }
        public DbSet<Models.User> UsersTB { get; set; }
        public DbSet<Models.Podesavanja> PodesavanjaTB { get; set; }


    }
}
