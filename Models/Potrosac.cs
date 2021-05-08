using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Potrosac
    {
        public Potrosac(string potrosacID, string ime, string prezime, string adresa, string phoneNo, string tipPotrosaca, bool deleted)
        {
            PotrosacID = potrosacID;
            Ime = ime;
            Prezime = prezime;
            Adresa = adresa;
            PhoneNo = phoneNo;
            TipPotrosaca = tipPotrosaca;
            Deleted = deleted;
        }
        [Key]
        public string PotrosacID { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Adresa { get; set; }
        public string PhoneNo { get; set; }
        public string TipPotrosaca { get; set; }
        public bool Deleted { get; set; }

    }
}
