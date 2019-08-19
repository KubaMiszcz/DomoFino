using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
                    var user = db.User.SingleOrDefault(x => x.Username == username);
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
                    var user = db.User.SingleOrDefault(x => x.Username == username && x.Password==password);
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