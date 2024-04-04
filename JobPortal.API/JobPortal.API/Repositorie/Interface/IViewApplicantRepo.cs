using JobPortal.API.Models.Job;
namespace JobPortal.API.Repositorie.Interface
{
    public interface IViewApplicantRepo
    {
        public Task<List<ApplicantInfoModel>> GetApplicantInfo( string JobPostID);
    }
}
