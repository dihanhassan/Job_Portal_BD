using JobPortal.API.Models.Job;
using JobPortal.API.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

namespace JobPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeProfileService _jobSeekerProfileService;
        private readonly IJobApplyService _jobApplyService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public EmployeeController
        (
          IEmployeeProfileService jobSeekerProfileService,
          IJobApplyService jobApplyService,
          IWebHostEnvironment webHostEnvironment
        )
        {
            _jobSeekerProfileService = jobSeekerProfileService;
            _jobApplyService = jobApplyService;
            _webHostEnvironment = webHostEnvironment;
        }

        [Authorize]
        [HttpGet]
        [Route("getDataByAuth")]
        public string GetDataByAuth()
        {
            return "Data Can be Accessed With Auth";
        }

        
        

       
        [HttpPost]
        [Route("SetSeekerProfile")]
        public async Task<IActionResult> SetSeekerProfile(EmployeeProfileModel profile)
        {

          /*  if (profile.Resume != null)
            {
                string folder = "Resume/";
                folder += Guid.NewGuid().ToString() + "-" + profile.Resume.FileName;
                profile.ResumeUrl = "/" + folder;
                string serverFolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);
                await profile.Resume.CopyToAsync(new FileStream(serverFolder, FileMode.Create));
            }*/

            IActionResult response = Unauthorized();


            return Ok(await _jobSeekerProfileService.SetProfileInfo(profile));

        }
       
        [HttpPost]
        [Route("JobApply")]
        public async Task<IActionResult> JobApply(JobApplyModel jobApply)
        {
            IActionResult response = Unauthorized();


            return Ok(await _jobApplyService.JobApply(jobApply));

        }

        [HttpPut]
        [Route("UpdateSeekerProfile")]
        public async Task<IActionResult> UpdateSeekerProfile ( EmployeeProfileModel profile )
        {
            IActionResult response = Unauthorized();

           /* if (profile.Resume != null)
            {
                string folder = "Resume/";
                folder += Guid.NewGuid().ToString() + "-" + profile.Resume.FileName;
                profile.ResumeUrl = "/" + folder;
                string serverFolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);
                await profile.Resume.CopyToAsync(new FileStream(serverFolder, FileMode.Create));
            }*/

            return Ok(await _jobSeekerProfileService.UpdateProfileInfo(profile));
        }

        [HttpPut("UploadResume")]
        public async Task<IActionResult> UploadResume( IFormFile formFile, string UserID)
        {
           
            try
            {
                string Filepath = GetFilepath(UserID);
                if (!System.IO.Directory.Exists(Filepath))
                {
                    System.IO.Directory.CreateDirectory(Filepath);
                }
                string _resumepath = Filepath + "\\" + UserID + ".pdf";
                if (System.IO.File.Exists(_resumepath))
                {
                    System.IO.File.Delete(_resumepath);
                }

               
                using (FileStream stream = System.IO.File.Create(_resumepath))
                {
                    
                    await formFile.CopyToAsync(stream);
                   
                }
            }
            catch (Exception ex)
            {
               throw new Exception(ex.Message);
            }

            return Ok();
        }
        [NonAction]
        private string GetFilepath(string UserID)
        {
            return this._webHostEnvironment.WebRootPath + "\\Upload\\Resume\\" + UserID;
        }

        [HttpGet("GetResume")]
        public async Task<IActionResult> GetImage(string UserID)
        {
            string ResumeUrl = string.Empty;
            string hosturl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            try
            {
                string Filepath = GetFilepath(UserID);
                string imagepath = Filepath + "\\" + UserID + ".pdf";
                if (System.IO.File.Exists(imagepath))
                {
                    ResumeUrl = hosturl + "/upload/resume/" + UserID + "/" + UserID + ".pdf"; // Added a slash before "Upload"
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                // Handle exception appropriately
            }
            return Ok(ResumeUrl);
        }





    }
}
