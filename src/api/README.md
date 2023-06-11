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

## Policies

Another schematic that we have not discussed yet is the **Policy** schematic. A policy is some code that define **the abilities or permissions** of the authenticated user from requests on the kind of operations they want to perform on the API resources. In other words, policies deal with **authorizations**.

Policy files are named using the `<filename>.policy.ts` convention.

Policies are usually meant to be used with **_NestJS guards_** in order to handle authorizations at the **controller** or **resolver** level.
