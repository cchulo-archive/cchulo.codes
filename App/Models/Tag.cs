using System.Collections.Generic;

namespace cchulo.codes.App.Models;

public class Tag
{
    public int Id { get; set; }

    public string Name { get; set; }

    public List<BlogPost> BlogPosts { get; set; }
}

public class TagsType
{
    public List<Tag> Tags { get; set; }
}
