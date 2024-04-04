﻿using Dapper;
using JobPortal.API.Models.Data;
using JobPortal.API.Models.Job;
using JobPortal.API.Repositorie.Interface;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace JobPortal.API.Repositorie.Implementation
{
    public class JobPostRepo : IJobPostRepo
    {
        private readonly DapperDBConnection _dbConnection;
        public JobPostRepo(DapperDBConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<int> AddJobPost(JobPostModel jobPost)
        {
            try
            {
                int RowsEffect = 1;

                using (var connection = _dbConnection.CreateConnection())
                {
                    connection.Open();

                    using (var transaction = connection.BeginTransaction())
                    {
                        try
                        {

                            jobPost.JobPostID =  Guid.NewGuid().ToString();

                            string query = @"
                            INSERT INTO JOB_POSTS_HEADER (UserID,JobPostID, Title, Description, Vacancy, Education, Organization, Location,Compensation, EmployeeStatus, Experience, Created, DeadLine, Field,IsDeleted)
                            VALUES (@UserID,@JobPostID, @Title, @Description, @Vacancy, @Education, @Organization, @Location,@Compensation, @EmployeeStatus, @Experience, @Created, @DeadLine, @Field,0)";
                            
                            RowsEffect = await connection.ExecuteAsync(query, jobPost, transaction);


                            for (int i = 0; i < jobPost.Responsibilities.Length; i++)
                            {

                                string queryNew = @"
                                INSERT INTO JOB_POSTS_RESPONSIBILITY (UserID,Responsibilities,IsDeleted,JobPostID)
                                VALUES (@UserID,@Responsibilities,0,@JobPostID)";

                                RowsEffect &= await connection.ExecuteAsync(queryNew, new { UserID = jobPost.UserID, Responsibilities = jobPost.Responsibilities[i].ToString(), JobPostID = jobPost.JobPostID },  transaction);
                            }

                            for (int i = 0; i < jobPost.Requirements.Length; i++)
                            {

                                string queryNew = @"
                                INSERT INTO JOB_POSTS_REQUIREMENTS (UserID,Requirements,IsDeleted,JobPostID)
                                VALUES (@UserID,@Requirements,0,@JobPostID)";

                                RowsEffect &= await connection.ExecuteAsync(queryNew, new { UserID = jobPost.UserID, Requirements = jobPost.Requirements[i].ToString(), JobPostID = jobPost.JobPostID }, transaction);
                            }
                            RowsEffect = 1;
                            transaction.Commit();
                        }
                        catch (Exception ex)
                        {
                            transaction.Rollback();

                            throw new Exception(ex.Message);


                        }
                    }
                   


                }
                return RowsEffect;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
        public async Task<List<JobPostModel>> GetJobPosts()
        {
           try

            {
                List<JobPostModel> jobs = new List<JobPostModel>();
                
               

                using (var connection = _dbConnection.CreateConnection())
                {



                    string query = @"SELECT * FROM JOB_POSTS_HEADER 
                                    WHERE IsDeleted=@IsDeleted";

                    var GetjobPosts =await connection.QueryAsync<JobPostModel>(query, new {  IsDeleted = 0 });
                    jobs = GetjobPosts.ToList();

                    connection.Open();
                    foreach (var jobPost in jobs)
                    {

                        string queryReq = @"SELECT Requirements 
                                            FROM JOB_POSTS_REQUIREMENTS 
                                            WHERE  JobPostID = @JobPostID 
                                            AND IsDeleted=@IsDeleted";
                        using (var readr = await connection.ExecuteReaderAsync(queryReq, new { JobPostID = jobPost.JobPostID, IsDeleted = 0 }))
                        {
                            List<string> requirement = new List<string>();
                            while (readr.Read())
                            {
                                requirement.Add(readr.GetString(0));
                            }
                            jobPost.Requirements = requirement.ToArray();
                        }

                        string queryRes = @"SELECT Responsibilities 
                                            FROM JOB_POSTS_RESPONSIBILITY
                                            WHERE  JobPostID = @JobPostID
                                            AND IsDeleted=@IsDeleted";
                        using (var readr = await connection.ExecuteReaderAsync(queryRes, new { JobPostID = jobPost.JobPostID, IsDeleted=0 }))
                        {
                            List<string> responsibilities = new List<string>();
                            while (readr.Read())
                            {
                                responsibilities.Add(readr.GetString(0));
                            }
                            jobPost.Responsibilities = responsibilities.ToArray();
                        }
                    }
                    
                }
                return  jobs;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);    
            
            }
            
        }

        public async Task<List<JobPostModel>> GetJobPostsByUserID(string UserID)
        {
            try

            {
                List<JobPostModel> jobs = new List<JobPostModel>();



                using (var connection = _dbConnection.CreateConnection())
                {



                    string query = @"SELECT * FROM JOB_POSTS_HEADER
                                    WHERE UserID=@UserID 
                                    AND IsDeleted=@IsDeleted";

                    var GetjobPosts = await connection.QueryAsync<JobPostModel>(query,new { UserID=UserID, IsDeleted=0});
                    jobs = GetjobPosts.ToList();

                    connection.Open();
                    foreach (var jobPost in jobs)
                    {

                        string queryReq = @"SELECT Requirements 
                                                FROM JOB_POSTS_REQUIREMENTS 
                                                WHERE  JobPostID = @JobPostID 
                                                AND IsDeleted=@IsDeleted";
                        using (var readr = await connection.ExecuteReaderAsync(queryReq, new { JobPostID = jobPost.JobPostID, IsDeleted =0}))
                        {
                            List<string> requirement = new List<string>();
                            while (readr.Read())
                            {
                                requirement.Add(readr.GetString(0));
                            }
                            jobPost.Requirements = requirement.ToArray();
                        }

                        string queryRes = @"SELECT Responsibilities 
                                                FROM JOB_POSTS_RESPONSIBILITY
                                                WHERE  JobPostID = @JobPostID
                                                AND IsDeleted=@IsDeleted";
                        using (var readr = await connection.ExecuteReaderAsync(queryRes, new { JobPostID = jobPost.JobPostID, IsDeleted = 0 }))
                        {
                            List<string> responsibilities = new List<string>();
                            while (readr.Read())
                            {
                                responsibilities.Add(readr.GetString(0));
                            }
                            jobPost.Responsibilities = responsibilities.ToArray();
                        }
                    }

                }
                return jobs;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }

        }


        public async Task<int> DeletePost(string JobPostID)
        {
            try
            {
                int isDeleted = 0;

                using (var connection = _dbConnection.CreateConnection())
                {
                    connection.Open();
                    using (var transaction = connection.BeginTransaction())
                    {
                        try
                        {
                            string query = @"UPDATE JOB_POSTS_HEADER
                                            SET IsDeleted = 1
                                            WHERE JobPostID=@JobPostID";
                                             

                            isDeleted = await connection.ExecuteAsync(query, new { JobPostID = JobPostID }, transaction);

                            string query2 = @"UPDATE JOB_POSTS_RESPONSIBILITY
                                             SET IsDeleted = 1
                                             WHERE JobPostID = @JobPostID";

                            isDeleted &= await connection.ExecuteAsync(query2, new { JobPostID = JobPostID }, transaction);

                            string query3 = @"UPDATE JOB_POSTS_REQUIREMENTS 
                                             SET IsDeleted = 1
                                             WHERE JobPostID = @JobPostID";

                            isDeleted &= await connection.ExecuteAsync(query3, new { JobPostID = JobPostID }, transaction);

                           

                            isDeleted = 1;
                            transaction.Commit();
                        }
                        catch (Exception ex)
                        {
                            transaction.Rollback();
                            throw new Exception(ex.Message);
                        }
                    }



                }
                return isDeleted;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



    }
}
