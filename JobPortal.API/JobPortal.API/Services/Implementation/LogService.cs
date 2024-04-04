using JobPortal.API.Models.Log;
using JobPortal.API.Models.Response;
using JobPortal.API.Repositorie.Interface;
using JobPortal.API.Services.Interface;

namespace JobPortal.API.Services.Implementation
{
    public class LogService :ILogService
    {
        private readonly ILogRepo _logRepo;
        public LogService(ILogRepo logRepo)
        {
           _logRepo = logRepo;  
        }

        public async Task<LogResponseModel> GetAllLogs()
        {
           

            try
            {
                List<CustomLogModel> logs = await _logRepo.GetAllLogs();
                LogResponseModel response = new LogResponseModel();
                if (logs != null)
                {
                    response.StatusMessage = "Logs Fetched Successfully";
                    response.StatusCode = 400;
                    response.GetLogs = logs;

                }
                else
                {
                    response.StatusMessage = "Error to  Fetched Logs";
                    response.StatusCode = 500;
                }
                return response;
            }
            catch (Exception ex) 
            {
                throw new Exception("Error"+ex.Message);
            }
        }
    }
}
