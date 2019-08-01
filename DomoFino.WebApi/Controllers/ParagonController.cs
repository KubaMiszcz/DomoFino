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
            var m = _repo.GetAllByUsername(username);
            var vm = new List<ParagonVM>();
            m.ForEach(x => vm.Add(new ParagonVM(x)));
            vm = vm.OrderBy(o => o.PurchaseDate).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, vm);
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
                var vm= JsonConvert.DeserializeObject<ParagonVM>(json);
                var m = vm.ToModel();
                ;
                _repo.AddNew(m);



                //                var m = vm.ToModel();

                //                else if (m.Action_ACT == TWVPDictionary.Action.NPOVRCVD.ToString()) _Reason_TWMPOVCRRepository.CreateNPORCVD(m);

                //                var mlst = _POLine_PODETAL0Repository.GetAllReasonsForPOLine(m.CompanyNumber_COMP, m.DistrictNumber_PODIST, m.PONumber_PONO, m.POLineNumber_POLINE);
                return Request.CreateResponse(HttpStatusCode.OK, "ok:paragon saved"+json);
            }
            catch (Exception e)
            {
                //                logger.Error("Exception from: " + e.Source + "; message: " + e.Message);
                throw;
                //return Request.CreateResponse(HttpStatusCode.BadRequest, e);
            }

        }



        [HttpPost, HttpOptions]
        [Route("api/Paragon/AddNew3")]
        public HttpResponseMessage AddNew3([FromBody] string vm)
        {
            if (Request.Method == HttpMethod.Options) return new HttpResponseMessage() { StatusCode = HttpStatusCode.OK };

            if (!ModelState.IsValid) return Request.CreateResponse(HttpStatusCode.BadRequest, "Model Invalid");

            try
            {


                //                var m = vm.ToModel();

                //                else if (m.Action_ACT == TWVPDictionary.Action.NPOVRCVD.ToString()) _Reason_TWMPOVCRRepository.CreateNPORCVD(m);

                //                var mlst = _POLine_PODETAL0Repository.GetAllReasonsForPOLine(m.CompanyNumber_COMP, m.DistrictNumber_PODIST, m.PONumber_PONO, m.POLineNumber_POLINE);
                return Request.CreateResponse(HttpStatusCode.OK, "ok:paragon saved");
            }
            catch (Exception e)
            {
                //                logger.Error("Exception from: " + e.Source + "; message: " + e.Message);
                throw;
                //return Request.CreateResponse(HttpStatusCode.BadRequest, e);
            }

        }



        [HttpPost, HttpOptions]
        [Route("api/Paragon/AddNew2")]
        public HttpResponseMessage AddNew2()
        {
            if (Request.Method == HttpMethod.Options) return new HttpResponseMessage() { StatusCode = HttpStatusCode.OK };

            if (!ModelState.IsValid) return Request.CreateResponse(HttpStatusCode.BadRequest, "Model Invalid");

            try
            {
                var body = Request.GetQueryNameValuePairs()?.ToList();
                //                var itemDistrict = Int32.Parse(body?.FirstOrDefault(x => x.Key == "itemDistrict").Value);

                //                var m = vm.ToModel();

                //                else if (m.Action_ACT == TWVPDictionary.Action.NPOVRCVD.ToString()) _Reason_TWMPOVCRRepository.CreateNPORCVD(m);

                //                var mlst = _POLine_PODETAL0Repository.GetAllReasonsForPOLine(m.CompanyNumber_COMP, m.DistrictNumber_PODIST, m.PONumber_PONO, m.POLineNumber_POLINE);
                return Request.CreateResponse(HttpStatusCode.OK, "ok:paragon saved");
            }
            catch (Exception e)
            {
                //                logger.Error("Exception from: " + e.Source + "; message: " + e.Message);
                throw;
                //return Request.CreateResponse(HttpStatusCode.BadRequest, e);
            }

        }

        [HttpPost, HttpOptions]
        [Route("api/Paragon/AddNew4")]
        public HttpResponseMessage AddNew4([FromBody] ParagonVM vm)
        {
            if (Request.Method == HttpMethod.Options) return new HttpResponseMessage() { StatusCode = HttpStatusCode.OK };

            if (!ModelState.IsValid) return Request.CreateResponse(HttpStatusCode.BadRequest, "Model Invalid");

            try
            {
                //                var m = vm.ToModel();

                //                else if (m.Action_ACT == TWVPDictionary.Action.NPOVRCVD.ToString()) _Reason_TWMPOVCRRepository.CreateNPORCVD(m);

                //                var mlst = _POLine_PODETAL0Repository.GetAllReasonsForPOLine(m.CompanyNumber_COMP, m.DistrictNumber_PODIST, m.PONumber_PONO, m.POLineNumber_POLINE);
                return Request.CreateResponse(HttpStatusCode.OK, "ok:paragon saved");
            }
            catch (Exception e)
            {
                //                logger.Error("Exception from: " + e.Source + "; message: " + e.Message);
                throw;
                //return Request.CreateResponse(HttpStatusCode.BadRequest, e);
            }

        }


        [HttpPost, HttpOptions]
        [Route("api/Paragon/AddNew5")]
        public HttpResponseMessage AddNew5(ParagonVM vm)
        {
            if (Request.Method == HttpMethod.Options) return new HttpResponseMessage() { StatusCode = HttpStatusCode.OK };

            if (!ModelState.IsValid) return Request.CreateResponse(HttpStatusCode.BadRequest, "Model Invalid");

            try
            {
                //                var m = vm.ToModel();

                //                else if (m.Action_ACT == TWVPDictionary.Action.NPOVRCVD.ToString()) _Reason_TWMPOVCRRepository.CreateNPORCVD(m);

                //                var mlst = _POLine_PODETAL0Repository.GetAllReasonsForPOLine(m.CompanyNumber_COMP, m.DistrictNumber_PODIST, m.PONumber_PONO, m.POLineNumber_POLINE);
                return Request.CreateResponse(HttpStatusCode.OK, "ok:paragon saved");
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

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
