using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DomoFino.DAL.Repositories;

namespace DomoFino.WebApi.Controllers
{
    public class CategoryController : ApiController
    {
        private CategoryRepository _repo = new CategoryRepository();

        // GET api/values
        [HttpGet]
        [Route("api/Category/GetAll")]
        public HttpResponseMessage GetAll()
        {
            var vmlst = _repo.GetAllCategories();
            return Request.CreateResponse(HttpStatusCode.OK, vmlst);

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
