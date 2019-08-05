using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
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

                //                var paragonsList = (from p in db.Paragon
                //                                    join c in db.Category
                //                                        on p.CategoryId equals c.Id
                //                                    where p.AddedById == user.Id
                //                                    select p).ToList();

                return paragonsList;
            }
        }

        public IList<Paragon> GetAllByUserGroup(string userGroupName)
        {
            using (var db = new DomoFinoContext())
            {
                //                var paragonsList = (from p in db.Paragon
                //                                    join c in db.Category on p.CategoryId equals c.Id
                //                                    join user in db.User on p.AddedById equals user.Id
                //                                    join userGroup in db.UserGroup on user.UserGroupId equals userGroup.Id
                //                                    where userGroup.Name == userGroupName
                //                                    select p).ToList();

                var group = db.UserGroup.SingleOrDefault(_ => _.Name == userGroupName);
                var users = db.User.Where(x => x.UserGroupId == group.Id).ToList();

                var paragonsList = new List<Paragon>();
                foreach (var user in users)
                {
                    paragonsList.AddRange(GetAllByUserId(user.Id));
                }

                paragonsList = _FillWithCategories(paragonsList).ToList();
                return paragonsList;
            }
        }

        public IList<Paragon> GetAllByUsername(string username)
        {
            using (var db = new DomoFinoContext())
            {
                var user = db.User.SingleOrDefault(x => x.Username == username);
                var paragonsList = GetAllByUserId(user.Id);
                return paragonsList;
            }
        }

        public IList<Paragon> GetAllByUserId(int id)
        {
            using (var db = new DomoFinoContext())
            {
                var paragonsList = db.Paragon.Where(x => x.AddedById == id && x.IsDeletePending == false).ToList();
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

        public void Update(Paragon paragon)
        {
            using (var db = new DomoFinoContext())
            {
                try
                {
                    db.Paragon.AddOrUpdate(paragon); //requires using System.Data.Entity.Migrations;
                    db.SaveChanges();
                    //                    var entity = db.Paragon.Find(paragon);
                    //                    if (entity == null)
                    //                    {
                    //                        return;
                    //                    }
                    //
                    //                    db.Entry(entity).CurrentValues.SetValues(paragon);

                    //                    db.SaveChanges();
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