using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActualServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
           
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(@"Server=.\SQLExpress;Database=WEB2DB;Trusted_Connection=True;MultipleActiveResultSets=true"));
    
            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy",
                    builder => builder.WithOrigins("http://localhost:4200/")
                .AllowAnyHeader()
                .AllowAnyMethod());
            });
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            

          //  app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(options => options.AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true));

           // app.UseHttpsRedirection();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {

                endpoints.MapGet("/echo",
                    context => context.Response.WriteAsync("echo"))
                    .RequireCors("MyPolicy");

                endpoints.MapControllers()
                         .RequireCors("MyPolicy");

                
               // endpoints.MapControllers();
            });
        }
    }
}
