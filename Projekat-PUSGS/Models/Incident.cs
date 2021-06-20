using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Incident
    {
        public Incident(string incidentID,
            string affCustomers,
            string voltage,
            string incidentPriority,
            string createdOn,
            string eTA,
            string eTR,
            string aTA,
            string sheduled,
            string type,
            string status,
            string calls,
            string confirmed,
            string toMe,
            string devicesNames,
            string uzrok,
            string poduzrok,
            string konstrukcija,
            string materijal
            )
        {
            IncidentID = incidentID;
            AffCustomers = affCustomers;
            Voltage = voltage;
            IncidentPriority = incidentPriority;
            CreatedOn = createdOn;
            ETA = eTA;
            ETR = eTR;
            ATA = aTA;
            Sheduled = sheduled;
            Type = type;
            Status = status;
            Calls = calls;
            Confirmed = confirmed;
            ToMe = toMe;
            DevicesNames = devicesNames;
            Uzrok = uzrok;
            Poduzrok = poduzrok;
            Konstrukcija = konstrukcija;
            Materijal = materijal;
        }

        [Key]
        public string IncidentID { get; set; }
        public string AffCustomers { get; set; }
        public string Voltage { get; set; }
        public string IncidentPriority { get; set; }
        public string CreatedOn { get; set; }
        public string ETA { get; set; }
        public string ETR { get; set; }
        public string ATA { get; set; }
        public string Sheduled { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Calls { get; set; }
        public string Confirmed { get; set; }
        public string ToMe { get; set; }
        public string DevicesNames { get; set; }
        public string Uzrok { get; set; }
        public string Poduzrok { get; set; }
        public string Konstrukcija { get; set; }
        public string Materijal { get; set; }
    }
}