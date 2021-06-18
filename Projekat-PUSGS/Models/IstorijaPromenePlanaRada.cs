using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class IstorijaPromenePlanaRada
    {
        public IstorijaPromenePlanaRada(string userID, string planRadaID, DateTime changedDate, int istorijaID)
        {
            UserID = userID;
            PlanRadaID = planRadaID;
            ChangedDate = changedDate;
            IstorijaID = istorijaID; 
        }
        [Key]
        public int IstorijaID { get; set; }
        public string UserID { get; set; }
        public string PlanRadaID { get; set; }
        public DateTime ChangedDate { get; set; }

    }
}
