using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class MultimediaPlanRada
    {
        public MultimediaPlanRada(string planRadaID, bool deleted, byte[] image, string imageUrl)
        {
            PlanRadaID = planRadaID;
            Deleted = deleted;
            Image = image;
            ImageUrl = imageUrl;
        }

        public string PlanRadaID { get; set; }
        public bool Deleted { get; set; }
        public byte[] Image { get; set; }
        public string ImageUrl { get; set; }
    }
}
