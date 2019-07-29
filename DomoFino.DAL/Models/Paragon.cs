using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DomoFino.DAL.Models
{
    [Table("Paragon")]
    public class Paragon
    {
        [Key]
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime AddingDate { get; set; }
        public int CategoryId { get; set; }
        public int AddedById { get; set; }

        public virtual User AddedBy { get; set; }
        public virtual Category Category { get; set; }
    }
}
