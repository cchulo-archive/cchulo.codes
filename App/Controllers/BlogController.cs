using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using cchulo.codes.App.Models;
using GraphQL;
using GraphQL.Client.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace cchulo.codes.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IGraphQLClient _graphQLClientRef;
        private readonly ILogger<BlogController> _logger;
        private readonly IHttpClientFactory _httpClientFactoryRef;
        private readonly IServerConfig _serverConfigRef;

        public BlogController(IGraphQLClient graphQLClient, ILogger<BlogController> logger,
            IHttpClientFactory httpClientFactory, IServerConfig serverConfig)
        {

            _graphQLClientRef = graphQLClient;
            
            _logger = logger;

            _httpClientFactoryRef = httpClientFactory;

            _serverConfigRef = serverConfig;
        }

        [HttpGet("latest")]
        public async Task<IActionResult> LatestBlogPosts()
        {
            try
            {
                var query = new GraphQLRequest(@"
                    query {
                      blogPosts(limit: 10, sort: ""published_at:desc"") {
                        id
                        title
                        published_at
                        description
                        banner {
                          url
                        }
                        tags {
                          id
                          name
                        }
                      }
                    }
                ");

                var response = await _graphQLClientRef.SendQueryAsync<BlogPostsType>(query);

                return Ok(response.Data.BlogPosts ?? new List<BlogPost>());

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> AllBlogPosts()
        {
            try
            {
                var query = new GraphQLRequest(@"
                    query {
                        blogPosts(sort: ""published_at:desc"") {
                            id
                            title
                            published_at
                            description
                            banner {
                              url
                            }
                            tags {
                              id
                              name
                            }
                        }
                    }
                ");

                var response = await _graphQLClientRef.SendQueryAsync<BlogPostsType>(query);

                return Ok(response.Data.BlogPosts);

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
                var query = new GraphQLRequest(@"
                    query {
                      tags {
                        id
                        name
                      }
                    }
                ");

                var response = await _graphQLClientRef.SendQueryAsync<TagsType>(query);

                return Ok(response.Data.Tags);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest();
            }
        }

        [HttpGet("full-blog-post/{id:int}")]
        public async Task<IActionResult> FullBlogPost([FromRoute] int id)
        {
            try
            {
                var httpClient = _httpClientFactoryRef.CreateClient();

                var response = await httpClient.GetAsync($"{_serverConfigRef.StrapiUrl}/blog-posts/{id}");

                var jsonStr = await response.Content.ReadAsStringAsync();
                var post = JsonConvert.DeserializeObject<BlogPost>(jsonStr);
                return Ok(post);
            } catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest();
            }
        }

    }
}
