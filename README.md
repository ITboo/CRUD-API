# Simple CRUD API
## using Node.js with no framework

### 1. Description
Made as a part of [RS School](https://rs.school/nodejs/) Node.js Course ([task link](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md))

* #### Implemented endpoints: api/users

* GET api/users - to get all users

* GET api/users/${userId} - to get user by id (uuid)

* POST api/users - to create record about new user and store it in database

* PUT api/users/${userId} - to update existing user (all fields required)

* DELETE api/users/${userId} - to delete existing user from database

### 2. How to install
1. clone this repo ` git clone https://github.com/ITboo/CRUD-API.git `
2. go to cloned repo ` cd crud-api `
3. Run ` npm install ` to install all needed dependencies
4. You can run these scripts:

To run in production mode: `npm run start:prod`

To start in dev mode: `npm run start:dev`

To run multi mode with load balancer: `npm run start:multi`

To run tests scenarios for API: `npm run:test`