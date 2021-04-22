using cchulo.App.PortfolioBlog.Middleware;
using cchulo.App.PortfolioBlog.Models;
using GraphQL.Client.Abstractions;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace cchulo.App.PortfolioBlog
{
    public class Startup
    {
        private IServerConfig _serverConfig;

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            InitServerConfig();
        }

        private void InitServerConfig()
        {
            string port = System.Environment.GetEnvironmentVariable("STRAPI_PORT");

            _serverConfig = new ServerConfig
            {
                StrapiUrl = $"http://localhost:{port}"
            };
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .AddJsonOptions(options => {
                    options.JsonSerializerOptions.IgnoreNullValues = true;
                });

            services.AddSingleton(Configuration);

            services.AddScoped<IGraphQLClient>(_ =>
                new GraphQLHttpClient($"{_serverConfig.StrapiUrl}/graphql", new NewtonsoftJsonSerializer())
            );
            
            services.AddSingleton(_serverConfig);

            services.AddHttpClient();

            services.AddControllers();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseMiddleware<ReverseProxyMiddleware>(_serverConfig);

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
