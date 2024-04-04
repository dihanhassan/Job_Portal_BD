using JobPortal.API.Models.Job;

namespace JobPortal.API.Repositorie.Interface
{
    public interface IEmployeeProfileRepo
    {
        public Task<int> SetProfileInfo(EmployeeProfileModel profile);
        public Task<int> UpdateProfileInfo(EmployeeProfileModel profile);
    }
}
