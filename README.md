# WEATHER APP

We've built A Note Manager With Node.js.

## Prerequisites
This project requires running Node.js, we recommend using the latest LTS version (even-numbered). You may run into issues otherwise. Check [nodejs.org](https://nodejs.org/) for the latest release. Run `node -v` to determine the version of Node.js you are currently using.

If you don't have Node.js installed, please download it and follow the instructions relevant to your platform here: Check (https://nodejs.org/)

If it's properly installed, you should be able to run this without error in your terminal:

`node -v`



## Prerequisites

This project requires running a database locally and uses MongoDB to make that as easy as possible. Therefore, you need to have MongoDB installed and running on your computer.

If you don't have MongoDB installed, please download it and follow the instructions relevant to your platform here: https://www.mongodb.com/dowload-center/community



When it comes to Node.js, we recommend using the latest LTS version (even-numbered). You may run into issues otherwise. Check [nodejs.org](https://nodejs.org/) for the latest release. Run `node -v` to determine the version of Node.js you are currently using.

## Setup

Please follow these instructions to get this repo ready to run on your local machine:

1. Clone this repo

  `git clone https://github.com/SalesVista/backend-exercise-kabasele243.git`

2. Install app dependencies from package-lock.json

  `npm ci`

3. Start the database containers (using Docker)

  `npm run db-up`

4. Initialize the database with MongoDB

    Start with the path where you downloaded mongodb mongodb/bin/mongod.exe and then create a mondodb-data folder

    Example
  `/Users/14042/mongodb/bin/mongod.exe --dbpath=/Users/14042/mongodb-data`



When you are done working and want to shut down the database containers, run `npm run db-down`. If you want to start them up again, just run `npm run db-up`.

## Running the application

To run the application _without_ hot-reloading (code changes not picked up automatically), run:

`npm start`

To run the application _with_ hot-reloading (code changes picked up automatically), run:

`npm run dev`

To lint the code and run automated tests, use:

`npm test` or `npm t`

To check out the other "run" scripts available in this project, try:

`npm run`


## Notes

This project uses (and enforces) [Standard JS](https://standardjs.com/) coding style.


