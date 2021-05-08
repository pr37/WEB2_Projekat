using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class IstorijaPromenePlanaRada
    {
        public IstorijaPromenePlanaRada(string userID, string planRadaID, DateTime changedDate)
        {
            UserID = userID;
            PlanRadaID = planRadaID;
            ChangedDate = changedDate;
        }

        public string UserID { get; set; }
        public string PlanRadaID { get; set; }
        public DateTime ChangedDate { get; set; }

    }
}
