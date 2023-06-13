# Dataloader module

This **dataloader module** is a dedicated module for registering all the dataloaders that `the GraphQL API resolvers` will use in order to work around the **_n+1 performance problem_** that comes with GraphQL.

The dataloader solution that we're using is the `dataloader` npm package.

This dataloader module will import all the GraphQL API modules that uses a dataloader for their read operations.
