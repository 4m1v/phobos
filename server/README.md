# Backend

### Run

`yarn start`

Runs the backend.

`yarn wstart`

Same as above but for Windows. 

`yarn dev`

Runs the backend with automatic reload if there are changes.

`yarn wdev`

Same as above but for Windows.

`yarn lint`

Please lint your code before you commit anything.

`yarn dbclear`

Clears and synchronises the database.

`yarn wdbclear`

Same as above but for Windows.

`yarn dbinit`

Loads the database with some sample data.

`yarn wdbinit`

Same as above but for Windows.

`yarn dbinit2`

Loads the database with a lot of data scraped from Steam.

`yarn wdbinit2`

Same as above but for Windows.


## Database

The database used for development purposes is called `dev.sqlite`. If there are changes in any files in the `src/entities/` directory, please run `yarn dbclear` or `yarn wdbclear` if you encounter any problems - it is very likely that the existing schema does not match the changed schema.


## API

The API is described using swagger and can be accessed via http://localhost:4000/docs when the backend is running on localhost.

*If you add more API endpoints, please document them using `@OpenAPI`.*

**If you add more controllers, please import them into the `spec` object in `server.ts` along with the other controllers. If you do not, they will not appear in swagger.**


## Structure

The backend is structured around four layers:

- `entities` (database)
- `repositories` (database manipulation)
- `services` (business logic)
- `controllers` (API)


### Entities

The `entities` represent an entity in the relational database corrresponding to a table. Thus, if you need to add another table in the database, create another `*Entity.ts` file in the `src/entities/` directory.

If you need help, please look at the `typeorm` [documentation](https://github.com/typeorm/typeorm/tree/master/docs) or ask Michael Gribben for help in `#backend` on Discord.


### Repositories

For each entity, there **must** be a corresponding repository in the `src/repositories` directory. These contain the methods used to interact with the database via the entity.

If you need help, please look at the `typeorm` [documentation](https://github.com/typeorm/typeorm/tree/master/docs) or ask Michael Gribben for help in `#backend` on Discord.


### Services

The `services` represent a service on the backend. This is where the main business logic lies. Thus, if you need to add another service, create another `*Service.ts` file in the `src/services/` directory.

Note that services that interact with the database will need at *least one* repository. Thus, there is not a one-to-one relationship between `repositories` and `services`.

If you need help, please look at the `typedi` [documentation](https://github.com/typestack/typedi/tree/develop/docs/typescript) or ask Michael Gribben for help in `#backend` on Discord.


### Controllers

For each service, there **must** be a corresponding controller in the `src/controllers` directory. These contain the methods to expose the service to the API. Please document endpoints using `@OpenAPI`.

If you need help, please look at the `routing-controllers` [documentation](https://github.com/typestack/routing-controllers) or ask Michael Gribben for help in `#backend` on Discord.


### Middlewares

The `middlewares` can be run before or after any routes and add additional functionality. Currently, the only middleware used is `src/middlewares/ErrorHandler.ts`, which catches any errors and returns an appropriate error message in JSON form.

If you need help, please look at the `routing-controllers` [documentation](https://github.com/typestack/routing-controllers) or ask Michael Gribben for help in `#backend` on Discord.


## Other files

The other files are:

- `src/json.ts`
  - This contains all functions to convert entity objects to output types.
  - You will need to modify this file to add a new function that converts a new (or existing) entity objects to new (or existing) output types.
- `../../frontend/src/api.ts`
  - This is located in the frontend of the project.
  - This describes all of the output types from the API.
  - You will need to modify this file to add new output types.
- `src/server.ts`
  - This runs the backend.
  - You will only need to modify this file if you add a new controller. If so, please import them into the `spec` object in `server.ts` along with the other controllers.
