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
    }
}