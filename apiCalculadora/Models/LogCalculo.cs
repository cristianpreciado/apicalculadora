using System;
using System.ComponentModel.DataAnnotations;

namespace apiCalculadora.Models
{
    public class LogCalculo
    {
        [Key]
        public int id { get; set; }

        public int valorUno { get; set; }

        public int valorDos { get; set; }

        public int resultado { get; set; }
    }
}
