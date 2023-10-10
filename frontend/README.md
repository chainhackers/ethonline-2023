## Install dependencies
> yarn install

## Start local server
> yarn run dev

## Build the production ready code to the /dist folder
> yarn run build

## Build Automatically
All environment variables must be registered as a secret on GitHub ```ENV_VARIABLES``` for correct automatic building of the project.

## Build Locally
1. Create file ```.env``` in the root of the project and set all environment variables in it.
2. The ```yarn run build``` command will build the project into the ```dist``` folder.
4. The ```yarn run dev``` command will run the project on the local server in development mode.

## ESlint check
> yarn lint

## ESlint fix
> yarn lint:fix

## Formatting check
> yarn format

## Formatting fix
> yarn format:fix