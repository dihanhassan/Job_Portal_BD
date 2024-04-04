namespace JobPortal.API.Models.Job
{
    public class JobApplyModel
    {
     
        public string JobPostID { get; set; } = string.Empty;
        public string RecruiterID { get; set; }
        public string EmployeeID { get; set; }
        public DateTime AppliedDate { get; set; } = DateTime.Now;
    }
}
