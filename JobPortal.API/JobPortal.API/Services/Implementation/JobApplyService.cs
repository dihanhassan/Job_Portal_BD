using JobPortal.API.Models.Log;
using JobPortal.API.Models.Response;
using JobPortal.API.Repositorie.Interface;
using JobPortal.API.Services.Interface;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Text.Json;
using JobPortal.API.Models.Job;

namespace JobPortal.API.Services.Implementation
{
    public class JobApplyService : IJobApplyService
    {
        private readonly IJobApplyRepo _applyRepo;
        private readonly ILogRepo _logRepo;
        public JobApplyService(IJobApplyRepo applyRepo , ILogRepo logRepo)
        {
            _applyRepo = applyRepo;
            _logRepo = logRepo;
        }
        public async Task<ResponseModel> JobApply(JobApplyModel jobApply)
        {
           ResponseModel response = new ResponseModel();
            int RowEffect =await _applyRepo.JobApply(jobApply);
            if (RowEffect > 0)
            {

                response.StatusMessage = "Apply Successfully";
                response.StatusCode = 200;

                CustomLogModel log = new CustomLogModel
                {
                    UserID = jobApply.EmployeeID.ToString(),
                    ActionTime = DateTime.UtcNow,
                    ActionType = "Update",
                    ActionField = "Apply Job",
                    jsonPayload = JsonSerializer.Serialize(jobApply)
                };

                await _logRepo.CreateLog(log);

            }
            else
            {
                response.StatusMessage = "Apply Failed!!";
                response.StatusCode = 100;
            }
            return response;    
        }
    }
}
