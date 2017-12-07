# react-spring-webpack-isomorphic-boilerplate

This boilerplate is based on https://github.com/pugnascotia/spring-react-boilerplate, but it's simplified.

## Main features:
  - Spring Boot application
  - React on the server-side for rendering views
  - SPA on the client-side
  - [react-router](https://github.com/ReactTraining/react-router) for page routing, on client and server
  - [react-helmet](https://github.com/nfl/react-helmet) for managing `<head>`
  - custom Webpack config with hot reloading

## Prerequisites

- [Java](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) (minimum version 1.8.0_65)
- node ([NVM](https://github.com/creationix/nvm) is recommended)
- [yarn](https://yarnpkg.com/en/docs/install)

## Install & run in development mode

- `./gradlew bootRun` installs all dependencies and runs development server
- `yarn start` runs webpack development server

For the best development experience just run `./gradlew bootRun` and `yarn start` in separate terminals.
