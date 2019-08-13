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
using WebGrease.Css.Extensions;

namespace DomoFino.WebApi.Controllers
{
    public class ParagonController : ApiController
    {
        private ParagonRepository _repo = new ParagonRepository();

        [HttpGet]
        [Route("api/Paragon/GetByUsername")]
        public HttpResponseMessage GetByUsername(string username)
        {
            try
            {
                var m = _repo.GetAllByUsername(username);
                var vm = new List<ParagonVM>();
                m.ForEach(x => vm.Add(new ParagonVM(x)));
                vm = vm.OrderBy(o => o.PurchaseDate).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, vm);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }

        [HttpGet]
        [Route("api/Paragon/GetByUserGroup")]
        public HttpResponseMessage GetByUserGroup(string groupName)
        {
            try
            {
                var m = _repo.GetAllByUserGroup(groupName);
                var vm = new List<ParagonVM>();
                m.ForEach(x => vm.Add(new ParagonVM(x)));
                vm = vm.OrderBy(o => o.PurchaseDate).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, vm);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }

        [HttpGet]
        [Route("api/Paragon/GetByUserForGroup")]
        public HttpResponseMessage GetByUserForGroup(string username)
        {
            try
            {
                var m = _repo.GetByUserForGroup(username);
                var vm = new List<ParagonVM>();
                m.ForEach(x => vm.Add(new ParagonVM(x)));
                vm = vm.OrderBy(o => o.PurchaseDate).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, vm);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPost, HttpOptions]
        [Route("api/Paragon/AddNew")]
        public HttpResponseMessage AddNew()
        {
            if (Request.Method == HttpMethod.Options) return new HttpResponseMessage() { StatusCode = HttpStatusCode.OK };

            if (!ModelState.IsValid) return Request.CreateResponse(HttpStatusCode.BadRequest, "Model Invalid");

            try
            {
                var body = Request.GetQueryNameValuePairs()?.ToList();
                var json = body?.FirstOrDefault(x => x.Key == "data").Value;
                var vm = JsonConvert.DeserializeObject<ParagonVM>(json);
                var m = vm.ToModel();
                var mm = _repo.AddNew(m);
                vm = new ParagonVM(mm);

                //                var m = vm.ToModel();
                //                else if (m.Action_ACT == TWVPDictionary.Action.NPOVRCVD.ToString()) _Reason_TWMPOVCRRepository.CreateNPORCVD(m);
                //                var mlst = _POLine_PODETAL0Repository.GetAllReasonsForPOLine(m.CompanyNumber_COMP, m.DistrictNumber_PODIST, m.PONumber_PONO, m.POLineNumber_POLINE);
                return Request.CreateResponse(HttpStatusCode.OK, vm);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Exception" + e.Message);
                //                logger.Error("Exception from: " + e.Source + "; message: " + e.Message);
                throw;
                //return Request.CreateResponse(HttpStatusCode.BadRequest, e);
            }

        }

        // DELETE api/values/5
        [HttpDelete, HttpOptions]
        [Route("api/Paragon/Delete/{id}")]
        public HttpResponseMessage DeleteById(int id)
        {
            if (Request.Method == HttpMethod.Options) return new HttpResponseMessage() { StatusCode = HttpStatusCode.OK };

            if (!ModelState.IsValid) return Request.CreateResponse(HttpStatusCode.BadRequest, "Model Invalid");

            try
            {
                var body = Request.GetQueryNameValuePairs()?.ToList();
                var json = body?.FirstOrDefault(x => x.Key == "data").Value;
                var vm = JsonConvert.DeserializeObject<ParagonVM>(json);
                var m = vm.ToModel();
                ;
                //                _repo.AddNew(m);



                //                var m = vm.ToModel();

                //                else if (m.Action_ACT == TWVPDictionary.Action.NPOVRCVD.ToString()) _Reason_TWMPOVCRRepository.CreateNPORCVD(m);

                //                var mlst = _POLine_PODETAL0Repository.GetAllReasonsForPOLine(m.CompanyNumber_COMP, m.DistrictNumber_PODIST, m.PONumber_PONO, m.POLineNumber_POLINE);
                return Request.CreateResponse(HttpStatusCode.OK, "ok:paragon saved" + json);
            }
            catch (Exception e)
            {
                //                logger.Error("Exception from: " + e.Source + "; message: " + e.Message);
                throw;
                //return Request.CreateResponse(HttpStatusCode.BadRequest, e);
            }
        }


        // PUT api/values/5
        [HttpPut, HttpOptions]
        [Route("api/Paragon/Update")]
        public HttpResponseMessage Update()
        {
            if (Request.Method == HttpMethod.Options) return new HttpResponseMessage() { StatusCode = HttpStatusCode.OK };

            if (!ModelState.IsValid) return Request.CreateResponse(HttpStatusCode.BadRequest, "Model Invalid");

            try
            {
                var body = Request.GetQueryNameValuePairs()?.ToList();
                var json = body?.FirstOrDefault(x => x.Key == "data").Value;
                var vm = JsonConvert.DeserializeObject<ParagonVM>(json);
                var m = vm.ToModel();
                _repo.Update(m);

                return Request.CreateResponse(HttpStatusCode.OK, "ok:paragon upated" + json);
            }
            catch (Exception e)
            {
                //                logger.Error("Exception from: " + e.Source + "; message: " + e.Message);
                throw;
                //return Request.CreateResponse(HttpStatusCode.BadRequest, e);
            }
        }

        [HttpDelete, HttpOptions]
        [Route("api/Paragon/DeleteFromBin")]
        public HttpResponseMessage DeleteFromBin()
        {
            if (Request.Method == HttpMethod.Options) return new HttpResponseMessage() { StatusCode = HttpStatusCode.OK };

            if (!ModelState.IsValid) return Request.CreateResponse(HttpStatusCode.BadRequest, "Model Invalid");

            try
            {
                var body = Request.GetQueryNameValuePairs()?.ToList();
                var json = body?.FirstOrDefault(x => x.Key == "data").Value;
                var vm = JsonConvert.DeserializeObject<List<int>>(json);
                _repo.DeleteFromBin(vm);

                return Request.CreateResponse(HttpStatusCode.OK, "ok:paragon deleted permannely");
            }
            catch (Exception e)
            {
                //                logger.Error("Exception from: " + e.Source + "; message: " + e.Message);
                throw;
                //return Request.CreateResponse(HttpStatusCode.BadRequest, e);
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

        //        // DELETE api/values/5
        //        public void Delete(int id)
        //        {
        //        }
    }
}
