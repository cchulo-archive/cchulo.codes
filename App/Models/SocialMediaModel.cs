using System.Collections.Generic;

namespace cchulo.codes.App.Models;

public class SocialMediaModel
{
    public List<MediaLinkType> Links { get; set; } = new List<MediaLinkType>();
}

public class MediaLinkType
{
    public string Url { get; set; }
    
    public string FaIcon { get; set; }
}
