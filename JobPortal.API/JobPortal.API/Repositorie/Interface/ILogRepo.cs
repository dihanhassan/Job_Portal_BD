using JobPortal.API.Models.Log;
using JobPortal.API.Models.Response;

namespace JobPortal.API.Repositorie.Interface
{
    public interface ILogRepo
    {
        public Task<int> CreateLog(CustomLogModel log);
        public Task<List<CustomLogModel>> GetAllLogs();
    }
}
