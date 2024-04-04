using JobPortal.API.Models.Response;

namespace JobPortal.API.Services.Interface
{
    public interface ILogService
    {
      public Task<LogResponseModel> GetAllLogs();
    }
}
