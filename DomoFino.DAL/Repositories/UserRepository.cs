using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc.Html;
using DomoFino.DAL.Models;
using DomoFino.DAL;

namespace DomoFino.DAL.Repositories
{
    public class UserRepository
    {
        public User GetByUsername(string username)
        {
            using (var db = new DomoFinoContext())
            {
                try
                {
                    var user = db.User.Where(x => x.Username == username).Include(g => g.UserGroup).SingleOrDefault();

                    //                    (from p in db.Paragon
                    //                                    join c in db.Category on p.CategoryId equals c.Id
                    //                                    join user in db.User on p.AddedById equals user.Id
                    //                                    join userGroup in db.UserGroup on user.UserGroupId equals userGroup.Id
                    //                                    where userGroup.Name == userGroupName
                    //                                    select p).ToList();

                    return user;
                }
                catch (NullReferenceException e)
                {
                    Console.WriteLine(e);
                    throw;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }

        public User LoginUser(string username, string password)
        {
            using (var db = new DomoFinoContext())
            {
                try
                {
                    var user = db.User.Where(x => x.Username == username).Include(g => g.UserGroup).SingleOrDefault();
                    return user;
                }
                catch (NullReferenceException e)
                {
                    Console.WriteLine(e);
                    throw;
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