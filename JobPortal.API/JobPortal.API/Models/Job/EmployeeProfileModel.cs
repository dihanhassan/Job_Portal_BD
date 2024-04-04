using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using JobPortal.API.Models.Authentication;

namespace JobPortal.API.Models.Job
{
    public class EmployeeProfileModel
    {
       
        public int? ProfileId { get; set; }

       
        [MaxLength(250)]
        public string? UserID { get; set; }

       
        [MaxLength(50)]
        public string ? FirstName { get; set; }

      
        [MaxLength(50)]
        public string? LastName { get; set; }

        [MaxLength(50)]
        public string? Gender { get; set; }

        [MaxLength(15)]
        public string? MobileNumber { get; set; }

        [MaxLength(100)]
        public string? Skill { get; set; }

        [MaxLength(100)]
        public string? Institution { get; set; }

        // Navigation property for the foreign key relationship
        [Display(Name = "Upload your resume.pdf")]
       /* public IFormFile? Resume { get; set; }*/

        public string? ResumeUrl { get; set; }
       

    }
}
