using cchulo.App.PortfolioBlog.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using GraphQL;

namespace cchulo.App.PortfolioBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {

        IConfiguration _serverConfigRef;
        IHttpClientFactory _httpClientFactoryRef;
        ILogger<BlogController> _logger;

        private int port = 0;

        public BlogController(IConfiguration serverConfig, IHttpClientFactory clientFactory, ILogger<BlogController> logger)
        {
            _serverConfigRef = serverConfig;
            _httpClientFactoryRef = clientFactory;
            _logger = logger;

            port = _serverConfigRef.GetValue<int>("StrapiPort");
        }

        [HttpGet]
        public async Task<IActionResult> QueryBlogs()
        {
            try
            {
                // HttpClient client = _httpClientFactoryRef.CreateClient();
                GraphQLHttpClient client = new GraphQLHttpClient($"http://localhost:{port}/graphql", new NewtonsoftJsonSerializer());

                GraphQLRequest query = new GraphQLRequest(@"
                    query {
                        articles {
                            id
                            tags {
                                id
                                name
                            }
                        }
                    }
                ");

                var response = await client.SendQueryAsync<ArticlesType>(query);

                return Ok();

            } catch (Exception ex)
            {
                _logger.LogError(ex.ToString());

                return BadRequest();
            }
        }

    }
}
