# Simple CRUD API
## using Node.js with no framework

1. Description
2. How to install
3. How to run
4. Tests
5. Multi mode

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
2. Run ` npm i `


### 3. How to run
1. Install 
2. Create .env file in the root of the project with defined PORT var
3. Run one of following scripts:

prod mode: `npm run start:prod`

dev mode: `npm run start:dev`

### 4. Tests
Run tests scenarios for API
`npm run:test`

### 5. Multy Mode

multi mode: `npm run start:multi`