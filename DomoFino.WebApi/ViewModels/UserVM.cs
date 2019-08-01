using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using DomoFino.DAL.Models;

namespace DomoFino.WebApi.ViewModels
{
    public class UserVM
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Fullname { get; set; }

        public virtual IList<ParagonVM> ParagonsList { get; set; }

        public UserVM(){}

        public UserVM(User m)
        {
            Id = m.Id;
            Username = m.Username;
            Fullname = m.Fullname;

        }
    }
}
