using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class BezbednosniDokumentiOsnovniInfo
    {
        public BezbednosniDokumentiOsnovniInfo(string id, string type, string planRada, string status, string username, string ekipa, string detalji, string beleske, string telBroj, string createdOn)
        {
            Id = id;
            Type = type;
            PlanRada = planRada;
            Status = status;
            Username = username;
            Ekipa = ekipa;
            Detalji = detalji;
            Beleske = beleske;
            TelBroj = telBroj;
            CreatedOn = createdOn;
        }
        [Key]
        public string Id { get; set; }
        public string Type { get; set; }
        public string PlanRada { get; set; }
        public string Status { get; set; }
        public string Username { get; set; }
        public string Ekipa { get; set; }
        public string Detalji { get; set; }
        public string Beleske { get; set; }
        public string TelBroj { get; set; }
        public string CreatedOn { get; set; }
    }
}
