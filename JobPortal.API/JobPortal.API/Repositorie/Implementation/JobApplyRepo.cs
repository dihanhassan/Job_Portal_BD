using Dapper;
using JobPortal.API.Models.Data;
using JobPortal.API.Models.Job;
using JobPortal.API.Repositorie.Interface;

namespace JobPortal.API.Repositorie.Implementation
{
    public class JobApplyRepo : IJobApplyRepo
    {
        private readonly DapperDBConnection _dBConnection;
        public JobApplyRepo(DapperDBConnection dBConnection)
        {
            _dBConnection = dBConnection;
        }

        public async Task<int> JobApply(JobApplyModel jobApply)
        {
            try
            {
                int RowEffect = 0;
                using (var connection = _dBConnection.CreateConnection())
                {
                    string query = @"INSERT INTO JOB_APPLY (JobPostID,RecruiterID,EmployeeID)
                                 VALUES (@JobPostID,@RecruiterID,@EmployeeID)";
                    RowEffect = await connection.ExecuteAsync(query, jobApply);
                }
                return RowEffect;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
