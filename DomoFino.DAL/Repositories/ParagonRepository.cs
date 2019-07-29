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

                return paragonsList;
            }
        }

    }
}