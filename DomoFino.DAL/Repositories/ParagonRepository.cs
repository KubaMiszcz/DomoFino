using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using System.Web.Mvc.Html;
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
                paragonsList = _FillCategories(paragonsList).ToList();

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

                paragonsList = _FillCategories(paragonsList).ToList();
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
                var paragonsList = db.Paragon.Where(x => x.AddedById == id).ToList();
                paragonsList = _FillCategories(paragonsList).ToList();
                return paragonsList;
            }
        }

        private IList<Paragon> _FillCategories(IList<Paragon> paragonsList)
        {
            paragonsList.ToList().ForEach(x => _FillCategory(x));
            return paragonsList;
        }

        private Paragon _FillCategory(Paragon paragon)
        {
            using (var db = new DomoFinoContext())
            {
                try
                {
                    paragon.Category = db.Category.Find(paragon.CategoryId);
                    return paragon;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }

        public Paragon AddNew(Paragon paragon)
        {
            using (var db = new DomoFinoContext())
            {
                try
                {
                    db.Paragon.Add(paragon);
                    db.Category.Attach(paragon.Category);
                    db.SaveChanges();
                    return paragon;
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

        public IList<Paragon> GetByUserForGroup(string username)
        {
            using (var db = new DomoFinoContext())
            {
                try
                {
                    var user = db.User.SingleOrDefault(x => x.Username == username);
                    var group = db.UserGroup.SingleOrDefault(_ => _.Id == user.UserGroupId);
                    var paragonsList = GetAllByUserGroup(group.Name);
                    return paragonsList;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }

        public void DeleteFromBin(List<int> idList)
        {
            using (var db = new DomoFinoContext())
            {
                try
                {
                    idList.ForEach(id =>
                    {
                        Paragon paragon = new Paragon() { Id = id };
                        db.Paragon.Attach(paragon);
                        db.Paragon.Remove(paragon);
                    });
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