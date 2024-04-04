using JobPortal.API.Models.Log;

namespace JobPortal.API.Models.Response
{
    public class LogResponseModel
    {
        public int StatusCode { get; set; }
        public string StatusMessage { get; set; } = string.Empty;

        public List<CustomLogModel> GetLogs { get; set; } 

        public CustomLogModel GetLog {  get; set; }  
        
    }
}
