using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using cchulo.codes.App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace cchulo.codes.App.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LinksController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IServerConfig _serverConfig;
    private readonly ILogger<LinksController> _logger;

    public LinksController(
        IHttpClientFactory httpClientFactory,
        IServerConfig serverConfig,
        ILogger<LinksController> logger)
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

            var response = await httpClient.GetAsync($"{_serverConfig.StrapiUrl}/links");

            var jsonStr = await response.Content.ReadAsStringAsync();
            var links = JsonConvert.DeserializeObject<List<MediaLink>>(jsonStr);
            return Ok(links);
        }
        catch (Exception ex)
        {
            _logger.LogError("{exception}", ex);
            return BadRequest();
        }
    }
}
