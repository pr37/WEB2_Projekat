using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Oprema
    {
        public Oprema(string id, string name, string type, string adresa)
        {
            Id = id;
            Name = name;
            Type = type;
            Adresa = adresa;
        }

        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Adresa { get; set; }
    }
}