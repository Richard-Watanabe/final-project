# Doggo Loggo

A full-stack web application that lets dog-owners track/share their dog's daily activities!

I chose to build this project because I am a dog-owner myself, and wanted a convenient application to track my dog's daily activities, and be able to share them with my family-members and friends. With this application, there's no more need to check with your family/friends if your dog have been walked, fed, brushed, washed, etc., througout the day. 

## Technologies Used

- HTML5
- CSS3
- JavaScript(ES5 and ES6)
- React.js
- React Router
- Bootstrap
- PostgreSQL
- Node.js
- Express.js
- Webpack
- Argon2
- JSON Web Token
- Multer
- Heroku

## Live Demo

Try the application live at [https://doggo-logg0.herokuapp.com](https://doggo-logg0.herokuapp.com)

## Features

- User can create a log.
- User can view the current day’s logs.
- User can add a picture of their dog.
- User can sign up for an account.
- User can sign into their account.
- User can give a name to a dog.

## Preview

![Sep-26-2021 21-42-48](https://user-images.githubusercontent.com/85139853/134846523-3db0d5a4-923c-487c-941d-300df97280b6.gif)

## Features to Come

- User can add a new dog.
- User can share account information with other users.
- User can see past logs.


## Getting Started

1. Clone the repository.

    ```shell
    git clone git@github.com:Richard-Watanabe/doggo-loggo.git
    cd doggo-loggo
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```

3. Create a new database.

    ```shell
    createdb doggoLoggo
    ```

4. Import the example database to PostgreSQL.

    ```shell
    npm run db:import
    ```

5. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```



