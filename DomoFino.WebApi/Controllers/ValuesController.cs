using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DomoFino.WebApi.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        [HttpGet]
        [Route("api/getBuildInfo")]
        public string Get()
        {
            return "2019-08-05, b.0.00.017";
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
