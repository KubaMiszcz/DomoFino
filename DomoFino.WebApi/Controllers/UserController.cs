using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DomoFino.DAL.Models;
using DomoFino.DAL.Repositories;
using DomoFino.WebApi.ViewModels;
using Newtonsoft.Json;

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

        [HttpPost, HttpOptions]
        [Route("api/user/Login")]
        public HttpResponseMessage Login()
        {
            if (Request.Method == HttpMethod.Options) return new HttpResponseMessage() { StatusCode = HttpStatusCode.OK };

            if (!ModelState.IsValid) return Request.CreateResponse(HttpStatusCode.BadRequest, "Model Invalid");

            try
            {
                var body = Request.GetQueryNameValuePairs()?.ToList();
                var json = body?.FirstOrDefault(x => x.Key == "data").Value;
                var userpass = JsonConvert.DeserializeObject<string[]>(json);
                var m = _repo.LoginUser(userpass[0], userpass[1]);
                var vm = new UserVM(m);

                return Request.CreateResponse(HttpStatusCode.OK, vm);
            }
            catch (NullReferenceException e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.Unauthorized, e);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.NotFound, e);
                //                logger.Error("Exception from: " + e.Source + "; message: " + e.Message);
            }

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
