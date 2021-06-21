using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class BezbednosniDokumentiOsnovniInfo
    {
        public BezbednosniDokumentiOsnovniInfo(string id, string type, string planRada, string status, string username, string ekipa, string detalji, string beleske, string telBroj, string createdOn,
            string devicesNames, string check1, string check2, string check3, string check4, string evaluating, string approved, string discard)
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
            DevicesNames = devicesNames;
            Check1 = check1;
            Check2 = check2;
            Check3 = check3;
            Check4 = check4;
            Evaluating = evaluating;
            Approved = approved;
            Discard = discard;
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
        public string DevicesNames { get; set; }
        public string Check1 { get; set; }
        public string Check2 { get; set; }
        public string Check3 { get; set; }
        public string Check4 { get; set; }
        public string Evaluating { get; set; }
        public string Approved { get; set; }
        public string Discard { get; set; }
    }
}
