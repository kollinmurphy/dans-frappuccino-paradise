# Dan's Frappuccino Paradise

## Tool Stack

This project uses Astro as a Server Side Renderer and SolidJS as a front-end framework. Additionally, we
utilize a SQLite database and the Sequelize ORM.

## Setup Procedure

1. Make sure you have `node` installed.
2. Clone the repo, `cd` into it, and run `npm run init`. This will initialize a SQLite database with the proper schema and seed it with some initial data, including the users `dan`, `employee`, and `user`, each with the password `password123`.

## Build Instructions

Just run `npm run build` and everything will work like a charm! It'll spin up a server on port 8080. View the front-end in the browser at `http://localhost:8080`.
