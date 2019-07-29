using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DomoFino.DAL.Repositories;
using Xunit;

namespace DomoFino.DAL.Tests.Repositories
{
    public class CategoryRepositoryTest
    {
        [Fact]
        public void GetAllByUserTest()
        {
            var repo = new CategoryRepository();
            var expectedlist = repo.GetAllCategories();

            Assert.NotNull(expectedlist);
            Assert.NotEmpty(expectedlist);
        }
    }
}