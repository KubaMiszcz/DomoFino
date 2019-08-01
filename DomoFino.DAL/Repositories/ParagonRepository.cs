using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DomoFino.DAL.Models;

namespace DomoFino.DAL.Repositories
{
    public class ParagonRepository
    {
        public IList<Paragon> GetAllByUser(User user)
        {
            using (var db = new DomoFinoContext())
            {
                var paragonsList = db.Paragon.Where(x => x.AddedById == user.Id).ToList();
                paragonsList = _FillWithCategories(paragonsList).ToList();
                return paragonsList;
            }
        }

        public IList<Paragon> GetAllByUsername(string username)
        {
            using (var db = new DomoFinoContext())
            {
                var user = db.User.SingleOrDefault(x => x.Username == username);
                var paragonsList = db.Paragon.Where(x => x.AddedById == user.Id).ToList();
                paragonsList = _FillWithCategories(paragonsList).ToList();
                return paragonsList;
            }
        }

        public IList<Paragon> GetAllByUserId(int id)
        {
            using (var db = new DomoFinoContext())
            {
                var paragonsList = db.Paragon.Where(x => x.AddedById == id).ToList();
                paragonsList = _FillWithCategories(paragonsList).ToList();
                return paragonsList;
            }
        }

        private IList<Paragon> _FillWithCategories(IList<Paragon> paragonsList)
        {
            using (var db = new DomoFinoContext())
            {
                try
                {
                    var categories = db.Category.ToList();
                    paragonsList.ToList().ForEach(x => x.Category = categories.SingleOrDefault(c => c.Id == x.CategoryId));
                    return paragonsList;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }

        public void AddNew(Paragon paragon)
        {
            using (var db = new DomoFinoContext())
            {
                try
                {
                    db.Paragon.Add(paragon);
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }
    }
}