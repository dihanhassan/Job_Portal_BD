using JobPortal.API.Models.Authentication;
using JobPortal.API.Models.Job;

namespace JobPortal.API.Models.Response
{
    public class ResponseModel
    {
        public int StatusCode { get; set; }
        public string StatusMessage { get; set; } = string.Empty;

        public dynamic? Data { get; set; }
        
       /* public UserLoginModel? UserLogin { get; set; }

        public List<JobPostModel>? GetJobPosts { get; set; }
        public List<ApplicantInfoModel>? GetApplicantInfo { get; set; }*/

     

    }
}
