using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using DomoFino.DAL.Models;

namespace DomoFino.WebApi.ViewModels
{
    public class CategoryVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BackgroundColor { get; set; }
        public string IconName { get; set; }

        public int UserGroupId { get; set; }


        public CategoryVM() { }

        public CategoryVM(Category m)
        {
            Id = m.Id;
            Name = m.Name;
            BackgroundColor = m.BackgroundColor;
            IconName = m.IconName;
            UserGroupId = m.UserGroupId;
        }

        public Category ToModel()
        {
            var m = new Category();
            m.Id = Id;
            m.Name = Name;
            m.BackgroundColor = BackgroundColor;
            m.IconName = IconName;
            m.UserGroupId = UserGroupId;
            return m;
        }
    }
}
