using System;
using System.Net.Http;
using System.Threading.Tasks;
using cchulo.codes.App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace cchulo.codes.App.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SocialMediaController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IServerConfig _serverConfig;
    private readonly ILogger<SocialMediaController> _logger;

    public SocialMediaController(
        IHttpClientFactory httpClientFactory,
        IServerConfig serverConfig,
        ILogger<SocialMediaController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _serverConfig = serverConfig;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetLinks()
    {
        try
        {
            var httpClient = _httpClientFactory.CreateClient();

            var response = await httpClient.GetAsync($"{_serverConfig.StrapiUrl}/about");

            var jsonStr = await response.Content.ReadAsStringAsync();
            var links = JsonConvert.DeserializeObject<SocialMediaModel>(jsonStr);
            return Ok(links);
        }
        catch (Exception ex)
        {
            _logger.LogError("{exception}", ex);
            return BadRequest();
        }
    }
}
