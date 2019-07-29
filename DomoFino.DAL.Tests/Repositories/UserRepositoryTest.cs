using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DomoFino.DAL.Models;
using DomoFino.DAL.Repositories;
using Xunit;

namespace DomoFino.DAL.Tests.Repositories
{
    public class UserRepositoryTest
    {
        [Fact]
        public void GetByUsernameTest()
        {
            var username = "kuba";
            var repo = new UserRepository();

            var user = repo.GetByUsername(username);
            var expected = user;

            Assert.NotNull(expected);
            Assert.Equal(expected.Username, username);
        }

    }
}