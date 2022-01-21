
namespace cchulo.App.PortfolioBlog.Models
{

    public interface IServerConfig
    {
        public string StrapiUrl { get; }
    }

    public class ServerConfig : IServerConfig
    {
        public string StrapiUrl { get; init; }
    }
}
