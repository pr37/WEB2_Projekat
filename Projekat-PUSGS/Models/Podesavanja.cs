using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models
{
    public class Podesavanja
    {
        [Key]
        public int Id { get; set; }
        public bool ErrorVisible { get; set; }
        public bool WarningVisible { get; set; }
        public bool InfoVisible { get; set; }
        public bool SuccessVisible { get; set; }
        public bool HideRequiredFields { get; set; }

        public Podesavanja(int id, bool errorVisible, bool warningVisible, bool infoVisible, bool successVisible, bool hideRequiredFields)
        {
            Id = id;
            ErrorVisible = errorVisible;
            WarningVisible = warningVisible;
            InfoVisible = infoVisible;
            SuccessVisible = successVisible;
            HideRequiredFields = hideRequiredFields;
        }
    }
}
