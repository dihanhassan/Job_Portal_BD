using JobPortal.API.Models.Response;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace JobPortal.API.Middleware
{
    public class ExceptionHandle
    {
        private readonly RequestDelegate _next;

        public ExceptionHandle(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var response = new ResponseModel
            {
                StatusCode = StatusCodes.Status500InternalServerError,
                StatusMessage = "Internal Server Error: " + exception.Message
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
        }
    }
}
