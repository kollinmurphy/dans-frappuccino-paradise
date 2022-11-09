
# Dan's Frappuccino Paradise

This is a web app designed to facilitate multiple aspects of a standard coffee shop experience in a digital environment.

### Related Documentation

- [Project Plan](docs/projectPlan.md)
- [Requirements Definition](docs/requirements.md)
- [Use Case Diagrams](docs/useCases.md)
- [Class Diagrams](docs/classDiagram.md)
- [Prototypes](docs/prototypes.md)


### Prior Documentation

- [Milestone 1 Combined Document](docs/milestone1.pdf)


## Workspace Layout

The web app will be stored in this repository.

## Organization

Team Members:

- John Belnap
- Caden Harris
- Kollin Murphy
- Trenton Peters

## Version-Control Procedures

Team members should clone the repository in Kollin’s account of the project "**[dans-frappuccino-paradise](https://github.com/kollinmurphy/dans-frappuccino-paradise)**". 

Before each meeting, collaborators should submit a pull request so we can monitor progress and discuss issues.
After making any significant change, team members should notify the team for feedback.
During development we will work primarily on feature branches which will merge back into master.

## Tool Stack

This project uses Astro as a Server Side Renderer and SolidJS as a front-end framework. Additionally, we utilize a SQLite database and the Sequelize ORM.

- Pros:
  - Cutting\-edge technology
  - Super duper fast
  - The majority of the site is pure HTML \(with the addition of TailwindCSS and DaisyUI to make it easier\)
  - Easy to learn
  - Can use any UI framework \(Solid, Vue, React, Preact, Svelte, etc\.\)
    - Can also mix\-and\-match even within the project
  - Shows a lot of initiative on a resume
  - The API can be implemented using Astro, which is super intuitive
- Cons:
  - Little experience within the group
    - *Flip-side*: None of us have significant experience with Django or any other framework.
  - Limited documentation & examples
    - *Flip-side*: There is a lot of documentation for the UI framework(s) we decide to use, which is where most of our effort will be spent.

## Setup Procedure

1. Make sure you have `node` installed.
2. Clone the repo, `cd` into it, and run `npm run setup`. This will install dependencies and initialize a SQLite database with the proper schema and seed it with initial data, including the users `dan`, `employee`, and `user`, each with the password `password123`.
3. You can run the site in development mode using `npm run start`, or build it for production using `npm run build`.

## Build Instructions

To create a production build, run `npm run setup` if you haven't already, and then run `npm run build`. It'll spin up a server on port 3000. View the front-end in the browser at `http://localhost:3000`.

## Unit Testing Instructions

For unit tests, we are using the Jest framework. The unit tests address several commonly identified uses including those found in the use case diagrams. The unit tests are located in the `tests` directory. To run the unit tests, run the command `npm test`.

Our unit tests cover the primary business logic of the application. They execute the business logic of the application found in the back-end and verify that the results are as expected. Tests cover various aspects of the application including the following:

- User registration
- User login
- Creating a new order
- Adding items to an order
- Placing an order
- Fulfilling an order
- Inserting hours into payroll
- Paying out employees
- Purchasing inventory

## System Testing Instructions

1.  Make sure you have `node` installed: [node](https://nodejs.org/en/).
2. Clone the repo, `cd` into it, and run `npm run setup`. This will install dependencies and initialize a SQLite database with the proper schema and seed it with initial data, including the users `dan`, `employee`, and `user`, each with the password `password123`.
3. Run `npm start`. This will start up a development server on port 3000. View the front-end in the browser at `http://localhost:3000`.

## Documentation

Our documentation of sprint plans and retrospectives is available in the `docs/sprints` directory.

Our documentation of daily standup reports is available in the `docs/standups` directory.
