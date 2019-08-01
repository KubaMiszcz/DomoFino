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
    public class UserController : ApiController
    {
        private UserRepository _repo = new UserRepository();

        // GET api/values
        [HttpGet]
        [Route("api/user/GetByUsername")]

        public HttpResponseMessage GetByUsername(string username)
        {
            var m = _repo.GetByUsername(username);
            var vm = new UserVM(m);
            return Request.CreateResponse(HttpStatusCode.OK, vm);
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
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
