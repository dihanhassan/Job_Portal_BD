using JobPortal.API.Models.Job;
using JobPortal.API.Models.Response;

namespace JobPortal.API.Services.Interface
{
    public interface IJobApplyService
    {
        public Task<ResponseModel> JobApply(JobApplyModel jobApply);
    }
}
