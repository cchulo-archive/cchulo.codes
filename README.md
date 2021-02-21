<p align="center">
  <img src="cchulo.App.PortfolioBlog/ClientApp/src/assets/svg-icons/logo-styled-gradient.svg" width="100" />
</p>

<center>
 <h1>CChulo's Portfolio/Blog App</h1>
</center>

---
## Description

This is a .NET Core 3.1 based Web App with Angular 11 frontend. The blog is powered by headless CMS, [strapi](https://strapi.io).


---

## Instructions to run

To compile you will need at minimum:

- .NET Core SDK 3.1 +
- NodeJS 14+ LTS

Run npm install in the following directories:

- cchulo.App.PortfolioBlog/ClientApp
- cchulo.App.StrapiCMS

You will then need to launch both .NET Core app (which is set up to compile and run the Client App)

`dotnet run --project cchulo.App.PortfolioBlog` from the root of the project

navigate to https://localhost:44301 to visit the page

You will also need to run strapi server:

`npm start` from within the cchulo.App.StrapiCMS folder

### About Strapi

Login to strapi at http://localhost:1337/admin, create an account. It will be local to your project only.

Create articles using the "Articles" collection type.

Create tags in "Tags" collection type to associate with articles.

You will need to refresh 

---

## Recommended for development

- Visual Studio 2019
- Visual Code
- Angular CLI
