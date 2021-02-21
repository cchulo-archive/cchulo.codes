using System.Collections.Generic;
using Newtonsoft.Json;
using TypeGen.Core.SpecGeneration;
using TypeGen.Core.TypeAnnotations;

namespace cchulo.App.PortfolioBlog.Models
{
    [ExportTsClass]
    public class Article
    {
        public int Id { get; set; }

        public string Title { get; set; }

        [JsonProperty(PropertyName = "published_at")]
        public string PublishedAt { get; set; }

        public string Description { get; set; }

        public string Contents { get; set; }

        public string Banner { get; set; }

        public List<string> Resources { get; set; }

        public List<string> Downloadable { get; set; }

        public List<Tag> Tags { get; set; }
    }

    public class ArticlesType
    {
        public List<Article> Articles { get; set; }
    }
}
