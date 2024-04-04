using JobPortal.API.Models.Job;

namespace JobPortal.API.Repositorie.Interface
{
    public interface IJobApplyRepo
    {
        public Task<int> JobApply (JobApplyModel model);
    }
}
