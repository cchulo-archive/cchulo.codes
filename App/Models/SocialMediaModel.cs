using System.Collections.Generic;
using TypeGen.Core.TypeAnnotations;

namespace cchulo.codes.App.Models;

[ExportTsClass]
public class SocialMediaModel
{
    public List<MediaLinkType> Links { get; set; } = new List<MediaLinkType>();
}

public class MediaLinkType
{
    public string Url { get; set; }
    
    public string FaIcon { get; set; }
}
