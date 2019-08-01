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
                return db.Category.ToList();
            }
        }

        public Category GetCategoryById(int id)
        {
            using (var db = new DomoFinoContext())
            {
                return db.Category.SingleOrDefault(x=>x.Id==id);
            }
        }
    }
}