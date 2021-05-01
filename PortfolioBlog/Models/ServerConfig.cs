using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cchulo.App.PortfolioBlog.Models
{

    public interface IServerConfig
    {
        public string StrapiUrl { get; }
    }

    public class ServerConfig : IServerConfig
    {
        public string StrapiUrl { get; set; }
    }
}
