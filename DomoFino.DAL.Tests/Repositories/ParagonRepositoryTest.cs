using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DomoFino.DAL.Models;
using DomoFino.DAL.Repositories;
using Xunit;

namespace DomoFino.DAL.Tests.Repositories
{
    public class ParagonRepositoryTest
    {
        [Fact]
        public void GetAllByUserTest()
        {
            var repo = new UserRepository();
            var user = repo.GetByUsername("kuba");
//            var user = new User() { Id = 1 };

            var parrepo = new ParagonRepository();
            var expectedlist = parrepo.GetAllByUser(user);

            Assert.Equal(expectedlist.Count, 3);
        }

    }
}