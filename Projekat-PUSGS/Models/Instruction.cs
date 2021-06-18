using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Instruction
    {
        public Instruction(string instructionID, string planRadaID, string text, string equipment, bool validated, bool executed, bool deleted)
        {
            InstructionID = instructionID;
            PlanRadaID = planRadaID;
            Text = text;
            Equipment = equipment;
            Validated = validated;
            Executed = executed;
            Deleted = deleted;
        }

        [Key]
        public string InstructionID { get; set; }
        public string PlanRadaID { get; set; }
        public string Text { get; set; }
        public string Equipment { get; set; }
        public bool Validated { get; set; }
        public bool Executed { get; set; }
        public bool Deleted { get; set; }

    }
}
