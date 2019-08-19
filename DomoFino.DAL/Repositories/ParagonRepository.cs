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
        public IList<Paragon> GetByUserForGroup(int groupId)
        {
            using (var db = new DomoFinoContext())
            {
                try
                {
                    var userList = db.User.Where(u => u.UserGroupId == groupId).ToList();
                    var paragonList = new List<Paragon>();
                    foreach (var user in userList)
                    {
                        var lst = db.Paragon.Where(p => p.AddedById == user.Id).Include(p => p.Category).ToList();
                        paragonList.AddRange(lst);
                    }
                    return paragonList;
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