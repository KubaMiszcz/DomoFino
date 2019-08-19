using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DomoFino.DAL.Models;
using DomoFino.DAL.Repositories;
using DomoFino.WebApi.ViewModels;

namespace DomoFino.WebApi.Controllers
{
    public class CategoryController : ApiController
    {
        private CategoryRepository _repoCategory = new CategoryRepository();
        private UserRepository _repoUser = new UserRepository();

        // GET api/values
        [HttpGet]
        [Route("api/Category/GetAll")]
        public HttpResponseMessage GetAll()
        {
            try
            {
                var mlst = _repoCategory.GetAllCategories();
                var vmlst = new List<CategoryVM>();
                mlst.ToList().ForEach(x => vmlst.Add(new CategoryVM(x)));
                return Request.CreateResponse(HttpStatusCode.OK, vmlst);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("api/Category/GetAllForUser")]
        public HttpResponseMessage GetAllForUser(string username)
        {
            try
            {
                var u = _repoUser.GetByUsername(username);
                var mlst = _repoCategory.GetAllCategoriesForGroup(u.UserGroupId);
                var vmlst = new List<CategoryVM>();
                mlst.ToList().ForEach(x => vmlst.Add(new CategoryVM(x)));
                return Request.CreateResponse(HttpStatusCode.OK, vmlst);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.BadRequest, e);
            }
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
