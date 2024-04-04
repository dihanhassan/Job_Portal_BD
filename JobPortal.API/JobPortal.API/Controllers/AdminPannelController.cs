using JobPortal.API.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminPannelController : ControllerBase
    {
        private readonly ILogService _logService;
        public AdminPannelController(ILogService logService)
        {
            _logService = logService;
        }

        [HttpGet]
        [Route("GetAllLogs")]
        public async Task<IActionResult> GetAllLogs()
        {
            return Ok(await _logService.GetAllLogs());
        }

       
    }
}
