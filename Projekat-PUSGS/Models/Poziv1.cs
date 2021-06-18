using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Poziv1
    {
        public Poziv1(string id, string razlog, string uzrok, string komentar, string userId, string adresaIncidenta)
        {
            Id = id;
            Razlog = razlog;
            Uzrok = uzrok;
            Komentar = komentar;
            UserId = userId;
        }
        [Key]
        public string Id { get; set; }        
        public string Razlog { get; set; }                
        public string Uzrok { get; set; }
        public string Komentar { get; set; }
        public string UserId { get; set; }
        public string AdresaIncidenta { get; set; }
    }
}
