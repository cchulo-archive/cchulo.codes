using cchulo.App.PortfolioBlog.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace cchulo.App.PortfolioBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IServerConfig _serverConfig;
        private readonly ILogger<AboutController> _logger;

        public AboutController(IHttpClientFactory httpClientFactory,
            IServerConfig serverConfig, ILogger<AboutController> logger)
        {
            _httpClientFactory = httpClientFactory;
            _serverConfig = serverConfig;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAbout()
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient();

                var response = await httpClient.GetAsync($"{_serverConfig.StrapiUrl}/about");

                var jsonStr = await response.Content.ReadAsStringAsync();
                var about = JsonConvert.DeserializeObject<AboutModel>(jsonStr);
                return Ok(about);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest();
            }
        }
    }
}