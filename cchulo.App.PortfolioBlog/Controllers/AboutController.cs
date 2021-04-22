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
        private IHttpClientFactory _httpClientFactory;
        private IServerConfig _serverConfig;
        private ILogger<AboutController> _logger;

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
                HttpClient httpClient = _httpClientFactory.CreateClient();

                HttpResponseMessage response = await httpClient.GetAsync($"{_serverConfig.StrapiUrl}/about");
                if (response != null)
                {
                    string jsonStr = await response.Content.ReadAsStringAsync();
                    AboutModel about = JsonConvert.DeserializeObject<AboutModel>(jsonStr);
                    return Ok(about);
                } else
                {
                    return NotFound();
                }
            } catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest();
            }
        }
    }
}
