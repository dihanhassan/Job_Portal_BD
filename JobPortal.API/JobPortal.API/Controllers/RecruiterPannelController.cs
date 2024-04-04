using JobPortal.API.Models;
using JobPortal.API.Repositorie.Interface;
using JobPortal.API.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruiterPannelController : ControllerBase
    {
        private readonly IJobPostService _jobPostService;
        private readonly IViewApplicantService _viewApplicantService;
        public RecruiterPannelController
        (
            IJobPostService jobPostService,
            IViewApplicantService viewApplicantService
        )
        {
            _jobPostService = jobPostService;    
            _viewApplicantService = viewApplicantService;   

        }

        [Authorize]
        [HttpGet]
        [Route("GetCreatedPost")]
        public async Task<IActionResult> GetCreatedPost(string UserID)
        {
            IActionResult response = Unauthorized();

            return Ok(await _jobPostService.GetJobPostsByUserID(UserID));
        }

        [HttpPut]
        [Route("DeletePost")]
        public async Task<IActionResult> DeletePost(string JobPostID, string UserID)
        {
            IActionResult response = Unauthorized();
            return Ok(await _jobPostService.DeletePost(JobPostID, UserID));

        }
        [HttpGet]
        [Route("GetApplicantInfo")]
        public async Task<IActionResult> GetApplicantInfo( string JobPostID)
        {
            IActionResult response = Unauthorized();

            return Ok(await _viewApplicantService.GetApplicantInfo( JobPostID));
           
        }

    }
}
