

using TypeGen.Core.TypeAnnotations;

namespace cchulo.codes.App.Models
{
    [ExportTsClass]
    public class AboutModel
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string TechStack { get; set; }
    }
}
