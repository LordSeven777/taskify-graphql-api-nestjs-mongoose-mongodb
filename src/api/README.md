# API directory

## Description

The `api` directory is where put all the API resources' modules, be it a REST API or a GraphQL API. This means that if some pieces of code are bound are related to a certain resource of the API, then that code should be encapsulated into the resource's module inside this `api` directory.

## Why using a sperate `api` directory?

The reason we do separate them in this diretory is because:

- We do not want to pollute the root `src` directory to be polluted with too much modules.
- Putting the API resources' modules in an `api` directory also helps us have an good overview of the shape of the API we are dealing with.

## The `index.ts` entry point

The `index.ts` file within this `api` directory **must import all modules** inside this directory and reexport those modules from the `modules` variables. The reason is because some other parts of the codebase have to import all these API modules elsewhere so it is very useful to reference all of these from a single variable from the entry point.

## The Auth module

The `auth` module is special API module because it is not an API resource yet we still include it inside the `api` directory because it is an important foundation for the operations on the API resources.

## Extra schematics

### Schema

When interacting with a database, some ORM solutions such as Mongoose or TypeORM require us to manually define classes that represent the schema of the database tables' models.

Its naming convention is `<filename>.schema.ts`.

### Pipes

Let's talk about the **Pipe** schematic. **Pipes** are code that process a **_controller's query, parameter or body_** or also a **_resolver's argument_** before any of those values get passed to the controller or the resolver. Tasks of **validations** and **parsings** on those values are generally performed within pipes.

API modules's pipes files are named using the `<filename>.pipe.ts` convention. Pipes are stored inside a `pipe` folder and exported using the **_barrel export pattern_**.

### Guard

Guards are classes that are logic responsible for handling the authentication and authorizations of the users that perform the operations. Guards are passed to the NestJS's UseGuard decorator as an argument and are placed at controllers or resolvers level.

These are generally grouped inside a `guard` folder and exported using the **_barrel export pattern_**. Its naming convention is `<filename>.guard.ts`.

### Policies

Another schematic that we have not discussed yet is the **Policy** schematic. A policy is some code that define **the abilities or permissions** of the authenticated user from requests on the kind of operations they want to perform on the API resources. In other words, policies deal with **authorizations**.

Policy files are named using the `<filename>.policy.ts` convention.

Policies are usually meant to be used with **_NestJS guards_** in order to handle authorizations at the **controller** or **resolver** level.

### Dataloaders (only for GraphQL)

We also have not talked about the **Dataloader** schematic yet. A **dataloader** is a special object designed **to batch multiple read operations from multiple keys into one single query**. Dataloaders are usually used in GraphQL's read operations as way to work around the **_n+1 problem_** that cause serius performance issues.

Each API module can have a dedicated dataloader class that holds the actual implementations of the **batch functions** associated with the read operations on the API resource that use a dataloader.

API modules's dataloader files are named using the `<filename>.loader.ts` convention.
