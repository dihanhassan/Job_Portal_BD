using JobPortal.API.Models.Job;
using JobPortal.API.Models.Response;
using JobPortal.API.Repositorie.Interface;
using JobPortal.API.Services.Interface;

namespace JobPortal.API.Services.Implementation
{
    public class ViewApplicantService : IViewApplicantService
    {
        private readonly IViewApplicantRepo _view;
        public ViewApplicantService(IViewApplicantRepo view)
        {
            _view = view;        
        }

        public async Task<ResponseModel> GetApplicantInfo(string JobPostID)
        {
           ResponseModel response = new ResponseModel();
           
            List<ApplicantInfoModel> applicants =await _view.GetApplicantInfo( JobPostID);
            if(applicants.Count>0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Get Info Successfully!";
                response.Data = applicants;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Apllicant Found!";
            }
            return response;  
        }
    }
}
