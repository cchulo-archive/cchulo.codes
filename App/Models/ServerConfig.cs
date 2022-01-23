namespace cchulo.codes.App.Models;

public interface IServerConfig
{
    public string StrapiUrl { get; }
}

public class ServerConfig : IServerConfig
{
    public string StrapiUrl { get; init; }
}