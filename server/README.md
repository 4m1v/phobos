# Backend

## Available Scripts

In the project directory, you can run:

### `yarn lint`

Lints the project.

### `yarn start`

Runs the backend.

`yarn wstart` for Windows. 

### `yarn dev`

Runs the backend with automatic reload if there are changes.

`yarn wdev` for Windows.

### `yarn dbclear`

Clears and synchronises the database.

`yarn wdbclear` for Windows.

### `yarn dbinit`

Loads the database with some sample data.

`yarn wdbinit` for Windows.

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
- `controllers` (API)
