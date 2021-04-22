

using TypeGen.Core.TypeAnnotations;

namespace cchulo.App.PortfolioBlog.Models
{
    [ExportTsClass]
    public class AboutModel
    {
        public int Id { get; set; }

        public string Content { get; set; }
    }
}
