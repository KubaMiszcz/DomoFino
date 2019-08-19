using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DomoFino.DAL.Models;

namespace DomoFino.DAL.Repositories
{
    public class CategoryRepository
    {
        public IList<Category> GetAllCategories()
        {
            using (var db = new DomoFinoContext())
            {
                var lst = db.Category.ToList();
                lst.ForEach(x => x.BackgroundColor = x.BackgroundColor ?? "#ffffff");
                return lst;
            }
        }
        public IList<Category> GetAllCategoriesForGroup(int groupId)
        {
            using (var db = new DomoFinoContext())
            {
                var lst = db.Category.Where(x => x.UserGroupId == groupId).ToList();
                lst.ForEach(x => x.BackgroundColor = x.BackgroundColor ?? "#ffffff");
                return lst;
            }
        }

        public Category GetCategoryById(int id)
        {
            using (var db = new DomoFinoContext())
            {
                return db.Category.SingleOrDefault(x => x.Id == id);
            }
        }
    }
}