using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Resolution
    {
        public Resolution(string id, string uzrok, string poduzrok, string konstrukcija, string materijal)
        {
            Id = id;
            Uzrok = uzrok;
            Poduzrok = poduzrok;
            Konstrukcija = konstrukcija;
            Materijal = materijal;
        }
        [Key]
        public string Id { get; set; }
        public string Uzrok { get; set; }
        public string Poduzrok { get; set; }
        public string Konstrukcija { get; set; }
        public string Materijal { get; set; }
    }
}
