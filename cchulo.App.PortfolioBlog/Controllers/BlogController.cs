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
using GraphQL.Client.Abstractions;

namespace cchulo.App.PortfolioBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {

        IGraphQLClient _graphQLClientRef;
        ILogger<BlogController> _logger;

        public BlogController(IGraphQLClient graphQLClient, ILogger<BlogController> logger)
        {

            _graphQLClientRef = graphQLClient;
            
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> QueryBlogs()
        {
            try
            {
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

                var response = await _graphQLClientRef.SendQueryAsync<ArticlesType>(query);

                return Ok();

            } catch (Exception ex)
            {
                _logger.LogError(ex.ToString());

                return BadRequest();
            }
        }

    }
}
