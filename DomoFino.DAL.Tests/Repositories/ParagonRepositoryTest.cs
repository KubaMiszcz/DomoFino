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
            var parrepo = new ParagonRepository();
            var userName = "ula";
            var expectedNum = 3;
            var user = repo.GetByUsername(userName);


            var actuallist = parrepo.GetAllByUser(user);


            Assert.NotNull(actuallist);
            Assert.Equal(expectedNum, actuallist.Count);
        }

        [Fact]
        public void GetAllByUserGroupTest()
        {
            var repo = new ParagonRepository();
            var userGroupName = "ula i kuba";
            var expectedNum = 3;


            var actual = repo.GetAllByUserGroup(userGroupName);


            Assert.NotNull(actual);
            Assert.Equal(expectedNum, actual.Count);
        }


    }
}