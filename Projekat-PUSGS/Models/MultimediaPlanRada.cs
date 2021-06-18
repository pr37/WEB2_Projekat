using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class MultimediaPlanRada
    {
        public MultimediaPlanRada(string planRadaID, bool deleted, byte[] image, string imageUrl,int multimediaID)
        {
            PlanRadaID = planRadaID;
            Deleted = deleted;
            Image = image;
            ImageUrl = imageUrl;
            MultimediaID = multimediaID;
        }
        [Key]
        public int MultimediaID { get; set; }
        public string PlanRadaID { get; set; }
        public bool Deleted { get; set; }
        public byte[] Image { get; set; }
        public string ImageUrl { get; set; }
    }
}
