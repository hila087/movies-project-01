# The Movie Project - Hila Pinhas

## Key Features - Server

* The server is built using the [node.js express](https://expressjs.com/) library.
* The server connects to a mongodb database via a `MONGODB_URL`, located at the `.env` file and stores the user data.
* The authentication mechanism is implemented using the [jsonwebtoken](https://jwt.io/) library, a stateless and efficient token-based authentication system.
* The server codebase implements:
  * A Route-Middleware-Controller architecture, handling incoming requests via designated routes.
  * Connections, Models and Validations for the database.
  * Utilities such as signing jwt-tokens with predefined structure and classes for communicating with TMDB.

## Key Featuers - Client

* Component Hirarchy - All pages are located at the `src/pages` folder, while the components are stored in `src/components`.
* Data management - The project makes use of the react-context api to create managable states and share them among the entire application. The context mechanisms are located at the `src/context`.
* Authentication - A token stored in the browser's cookies. The auth context is responsible for making the innitial call with the token to get the user data. If the user is authenticated, protected pages (e.g favorites) will be accessible, while an unauthenticated user will always be redirected to the login page.