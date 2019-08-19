using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DomoFino.DAL.Models
{
    [Table("Category")]
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string BackgroundColor { get; set; }
        public int UserGroupId { get; set; }
    }
}
