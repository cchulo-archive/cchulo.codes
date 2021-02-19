using cchulo.App.PortfolioBlog.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Threading.Tasks;

namespace cchulo.App.PortfolioBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {

        IConfiguration _serverConfigRef;
        IHttpClientFactory _httpClientFactoryRef;

        private int port = 0;

        public BlogController(IConfiguration serverConfig, IHttpClientFactory clientFactory)
        {
            _serverConfigRef = serverConfig;
            _httpClientFactoryRef = clientFactory;

            port = _serverConfigRef.GetValue<int>("StrapiPort");
        }


    }
}
