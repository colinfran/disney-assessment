# Disney Assessment

This is a node.js app that streams videos from a remote file server to client

## Prerequisites

Make sure you have Node.js and npm installed on your machine.

- [Node.js](https://nodejs.org/)

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/colinfran/disney-assessment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd disney-assessment
   ```

3. Install dependencies using npm:
   ```bash
   npm i
   ```

4. Create a free Atlas db at [mongodb.com](https://account.mongodb.com/account/login). To do this:
    - Create an Account
    - Create a Project
    - Create a free shared cluster (M0)
    - Create username and password for db access
    - Create database and name the database 'disney-assessment'
    - copy and paste the connection string for your db into the `.env` file at the root of this repo
    - run the following script to insert data into the db:
      ```bash
      npm run setup
      ```
      - This script creates a collection called 'streams' and inserts data into the collection. You only need to run this once.

## Running the app

After following all of the previous steps, your local environment should be set up now.

In the project directory, you can run the following script:

### `npm run dev`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
