using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Adresa
    {
        public Adresa(string ulica, string prioritet)
        {
            Ulica = ulica;
            Prioritet = prioritet;
        }
        [Key]
        public string Ulica { get; set; }
        public string Prioritet { get; set; }
    }
}
