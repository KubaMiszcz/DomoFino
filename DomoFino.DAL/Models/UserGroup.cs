using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DomoFino.DAL.Models
{
    [Table("UserGroup")]
    public class UserGroup
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual IList<User> UsersList { get; set; }
    }
}
