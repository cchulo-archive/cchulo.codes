<p align="center">
  <img src="App/ClientApp/src/assets/svg-icons/logo-styled-gradient.svg" width="100"  alt="icon"/>
</p>

<center>
 <h1>CChulo's Portfolio/Blog App</h1>
</center>

---
## Description

This is a .NET Core 3.1 based Web App with Angular 11 frontend. The blog is powered by headless CMS, [strapi](https://strapi.io).

---

## Requirements

To compile you will need at minimum:

- .NET Core SDK 3.1 +
- NodeJS 14+ LTS
- Angular CLI 11+

## Instructions to compile and run

1. Run `npm install` in the following directories:

- `App/ClientApp`
- `StrapiCMS`

2. You will then need to launch both .NET Core app (which is set up to compile and run the Client App)

`dotnet run --project PortfolioBlog` from the root of the project

3. Open a terminal in `PortfolioBlog/ClientApp` context and run `npm start`, leave it running

4. Open a terminal in `StrapiCMS` context and run `npm run develop`, leave it running

5. navigate to https://localhost:44301 to visit the page

6. To create blog posts/tags and fill out other content, go to strapi admin panel: http://localhost:1337/admin,
you will need to create an account, this account will only be local to your computer


    - Create articles using the "Blog" collection type.

    - Create tags in "Tags" collection type to associate with articles.

    - Fill out "About" page by filling out information in the "About" single collection type
    
    NOTE: you may need to use a browser that does not redirect http to visit strapi admin panel, currently chrome automatically redirects http localhost to https if you previously visited https://localhost:anything

---

## Recommended for development

- Visual Studio 2019
- Visual Code
