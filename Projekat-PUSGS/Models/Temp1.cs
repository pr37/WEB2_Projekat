using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Temp1
    {
        public Temp1(string kljuc, string affCustomers, string voltage)
        {
            Kljuc = kljuc;
            AffCustomers = affCustomers;
            Voltage = voltage;
        }
        [Key]
        public string Kljuc { get; set; }
        public string AffCustomers { get; set; }
        public string Voltage { get; set; }
    }
}
