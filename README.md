# Face recognition app api

This is the server side code for face-bot, a facial recognition app.<br/>
Backend code is deployed on Heroku
The front end is deployed [here](https://face-bot.netlify.app/)
The front end code can be seen [here](https://github.com/ChrisCooney05/face_recognition_frontend)<br/>
Backend code was built in Javascript using Express, a postgresql database and Knex.js to handle queries.

## Using the code locally

If you would like to look at the codebase on your local machine you can<br/>
Firstly clone or fork then clone this repo to your computer.<br/>
Once clones, run the following commands
```
cd face_recognition_backend
npm install
```
Once this has been completed, you will need to edit one of the scripts in the ```package.json```, the script to be changed is the ```start``` script. As you will have access to nodemon, this will save rebooting the server on change.<br/>
From:
```json
"scripts": {
    "start": "node server.js"
  },
```
To:
```json
"scripts": {
    "start": "nodemon server.js"
  },
```
By running ```npm start``` you can now make changes and the server will reboot for you. <br/>

## Database setup

The server is set up to use a postgresql database, you can find the commands you need to use withing the ```db/migrations``` directory, once you have set up a database, you can copy and run the commands.

## Knex.js

Full documentation for Knex can be found [here](http://knexjs.org/)<br/>
Knex will handle all querying and communication with the database<br/>
You will need to make some changes to get Knex working with your local database. In server.js on line 11 you will see the following code<br/>
```js
const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL
});
```
You will need to edit it to the following adding your user/database/password as necessary
```js
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});
```