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
        IHttpClientFactory _httpClientFactoryRef;
        IServerConfig _serverConfigRef;

        public BlogController(IGraphQLClient graphQLClient, ILogger<BlogController> logger,
            IHttpClientFactory httpClientFactory, IServerConfig serverConfig)
        {

            _graphQLClientRef = graphQLClient;
            
            _logger = logger;

            _httpClientFactoryRef = httpClientFactory;

            _serverConfigRef = serverConfig;
        }

        [HttpGet("latest")]
        public async Task<IActionResult> LatestArticles()
        {
            try
            {
                GraphQLRequest query = new GraphQLRequest(@"
                    query {
                      articles(limit: 10, sort: ""published_at:desc"") {
                        id
                        title
                        published_at
                        description
                        tags {
                          id
                          name
                        }
                      }
                    }
                ");

                GraphQLResponse<ArticlesType> response = await _graphQLClientRef.SendQueryAsync<ArticlesType>(query);

                return Ok(response.Data.Articles);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> AllArticles()
        {
            try
            {
                GraphQLRequest query = new GraphQLRequest(@"
                    query {
                        articles(sort: ""published_at:desc"") {
                            id
                            title
                            published_at
                            description
                            tags {
                              id
                              name
                            }
                        }
                    }
                ");

                GraphQLResponse<ArticlesType> response = await _graphQLClientRef.SendQueryAsync<ArticlesType>(query);

                return Ok(response.Data.Articles);

            } catch (Exception ex)
            {
                _logger.LogError(ex.ToString());

                return BadRequest();
            }
        }

        [HttpGet("tags")]
        public async Task<IActionResult> Tags()
        {
            try
            {
                GraphQLRequest query = new GraphQLRequest(@"
                    query {
                      tags {
                        id
                        name
                      }
                    }
                ");

                GraphQLResponse<TagsType> response = await _graphQLClientRef.SendQueryAsync<TagsType>(query);

                return Ok(response.Data.Tags);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest();
            }
        }

        [HttpGet("article/{id}")]
        public async Task<IActionResult> FullArticle([FromRoute] int id)
        {
            try
            {
                HttpClient httpClient = _httpClientFactoryRef.CreateClient();

                HttpResponseMessage response = await httpClient.GetAsync($"{_serverConfigRef.StrapiUrl}/articles/{id}");

                return Ok();
            } catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest();
            }
        }

    }
}
