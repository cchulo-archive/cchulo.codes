﻿using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using cchulo.codes.App.Models;
using Microsoft.AspNetCore.Http;

// ReSharper disable ConvertIfStatementToReturnStatement

namespace cchulo.codes.App.Middleware;

public class ReverseProxyMiddleware
{
    private static readonly HttpClient HttpClient = new ();
    private readonly RequestDelegate _nextMiddleware;
    private readonly IServerConfig _serverConfig;

    public ReverseProxyMiddleware(RequestDelegate nextMiddleware, IServerConfig serverConfig)
    {
        _nextMiddleware = nextMiddleware;
        _serverConfig = serverConfig;
    }

    public async Task Invoke(HttpContext context)
    {
        var targetUri = BuildTargetUri(context.Request);

        if (targetUri != null)
        {
            var targetRequestMessage = CreateTargetMessage(context, targetUri);

            using var responseMessage = await HttpClient.SendAsync(
                targetRequestMessage,
                HttpCompletionOption.ResponseHeadersRead,
                context.RequestAborted);
            
            context.Response.StatusCode = (int) responseMessage.StatusCode;
            CopyFromTargetResponseHeaders(context, responseMessage);
            await responseMessage.Content.CopyToAsync(context.Response.Body);

            return;
        }

        await _nextMiddleware(context);
    }

    private HttpRequestMessage CreateTargetMessage(HttpContext context, Uri targetUri)
    {
        var requestMessage = new HttpRequestMessage();
        CopyFromOriginalRequestContentAndHeaders(context, requestMessage);

        requestMessage.RequestUri = targetUri;
        requestMessage.Headers.Host = targetUri.Host;
        requestMessage.Method = GetMethod(context.Request.Method);

        return requestMessage;
    }

    private void CopyFromOriginalRequestContentAndHeaders(HttpContext context, HttpRequestMessage requestMessage)
    {
        var requestMethod = context.Request.Method;

        if (!HttpMethods.IsGet(requestMethod) &&
            !HttpMethods.IsHead(requestMethod) &&
            !HttpMethods.IsDelete(requestMethod) &&
            !HttpMethods.IsTrace(requestMethod))
        {
            var streamContent = new StreamContent(context.Request.Body);
            requestMessage.Content = streamContent;
        }

        foreach (var header in context.Request.Headers)
        {
            requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
        }
    }

    private void CopyFromTargetResponseHeaders(HttpContext context, HttpResponseMessage responseMessage)
    {
        foreach (var header in responseMessage.Headers)
        {
            context.Response.Headers[header.Key] = header.Value.ToArray();
        }

        foreach (var header in responseMessage.Content.Headers)
        {
            context.Response.Headers[header.Key] = header.Value.ToArray();
        }

        context.Response.Headers.Remove("transfer-encoding");
    }

    private static HttpMethod GetMethod(string method)
    {
        if (HttpMethods.IsDelete(method)) return HttpMethod.Delete;
        if (HttpMethods.IsGet(method)) return HttpMethod.Get;
        if (HttpMethods.IsHead(method)) return HttpMethod.Head;
        if (HttpMethods.IsOptions(method)) return HttpMethod.Options;
        if (HttpMethods.IsPost(method)) return HttpMethod.Post;
        if (HttpMethods.IsPut(method)) return HttpMethod.Put;
        if (HttpMethods.IsTrace(method)) return HttpMethod.Trace;
        return new HttpMethod(method);
    }

    private Uri BuildTargetUri(HttpRequest request)
    {
        Uri targetUri = null;

        if (request.Path.StartsWithSegments("/uploads", out var remainingPath))
        {
            targetUri = new Uri($"{_serverConfig.StrapiUrl}/uploads{remainingPath}");
        }

        return targetUri;
    }
}
