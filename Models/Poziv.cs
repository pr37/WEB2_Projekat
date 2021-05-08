using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
   public  class Poziv
    {
        public Poziv(string pozivID, double latitude, double longitude, string userID, string problem)
        {
            PozivID = pozivID;
            Latitude = latitude;
            Longitude = longitude;
            UserID = userID;
            Problem = problem;
        }

        public string PozivID { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string UserID { get; set; }
        public string Problem { get; set; }

    }
}
