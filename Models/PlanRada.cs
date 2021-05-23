using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class PlanRada
    {
        public PlanRada(string planRadaID, string userID, string createdBy, DateTime dateCreatedOn, string company, string tipNaCemu, DateTime startDate, DateTime endDate, string tipRada, string phoneNo, string workRequestID, string incidentID, string fieldCrew, string address, string svrha, string detalji, string beleske)
        {
            PlanRadaID = planRadaID;
            UserID = userID;
            CreatedBy = createdBy;
            DateCreatedOn = dateCreatedOn;
            Company = company;
            TipNaCemu = tipNaCemu;
            StartDate = startDate;
            EndDate = endDate;
            TipRada = tipRada;
            PhoneNo = phoneNo;
            WorkRequestID = workRequestID;
            IncidentID = incidentID;
            FieldCrew = fieldCrew;
            Address = address;
            Svrha = svrha;
            Detalji = detalji;
            Beleske = beleske;
        }
        [Key]
        public string PlanRadaID { get; set; }
        public string Status { get; set; }
        public string UserID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedOn { get; set; }
        public string Company { get; set; }
        public string TipNaCemu { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string TipRada { get; set; }
        public string PhoneNo { get; set; }
        public string WorkRequestID { get; set; }
        public string IncidentID { get; set; }
        public string FieldCrew { get; set; }
        public string Address { get; set; }
        public string Svrha { get; set; }
        public string Detalji { get; set; }
        public string Beleske { get; set; }

    }
}
