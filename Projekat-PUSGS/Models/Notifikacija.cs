using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Notifikacija
    {
        public Notifikacija(string notifikacijaID, string forUserID, string text, string color, string icon, DateTime timeStamp, bool tied, string tiedTo, bool read)
        {
            NotifikacijaID = notifikacijaID;
            ForUserID = forUserID;
            Text = text;
            Color = color;
            Icon = icon;
            TimeStamp = timeStamp;
            Tied = tied;
            TiedTo = tiedTo;
            Read = read;
        }
        [Key]
        public string NotifikacijaID { get; set; }
        public string ForUserID { get; set; }
        public string Text { get; set; }
        public string Color { get; set; }
        public string Icon { get; set; }
        public DateTime TimeStamp { get; set; }
        public bool Tied { get; set; }
        public string TiedTo { get; set; }
        public bool Read { get; set; }
    }
}
