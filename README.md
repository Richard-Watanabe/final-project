# Doggo Loggo

A full-stack web application for dog-owners who want to track/share their dog's daily activities!

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
- AWS S3

## Live Demo

Try the application live at [https://doggo-logg0.herokuapp.com](https://doggo-logg0.herokuapp.com)

## Features

- User can create a log.
- User can view the current day’s logs.
- User can add a picture of their dog.
- User can sign up for an account.
- User can sign into their account.
- User can give a name to a dog.
- User can add a new dog.
- User can see a list of their dog.
- User can switch between dogs.

## Preview

![Sep-26-2021 21-42-48](https://user-images.githubusercontent.com/85139853/134846523-3db0d5a4-923c-487c-941d-300df97280b6.gif)

## Features to Come

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

3. Run the command `cp .env.example .env` to create a `.env` file for the application.

    ```shell
    cp .env.example .env
    ```
    
4. In the `.env file`, change the `TOKEN_SECRET` to a suitable value.

 
5. In the `.env` file, change the `DATABASE_URL` at `changeMe` to `doggoLoggo`.


6. Run the command `sudo service postgresql status` to see if postgresql is running.

    ```shell
    sudo service postgreql status
    ```
    
7. If postgresql is not running, run the command `sudo service postgresql start`.

    ```shell
    sudo service postgresql start
    ```

8. Create a new database.

    ```shell
    createdb doggoLoggo
    ```

9. Import the database to PostgreSQL.

    ```shell
    npm run db:import
    ```

10. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```

11. To view the database on `pgweb`, open another terminal and run the command `pgweb --db=<insert DATABASE_URL's  changeMe from .env>`; then, open the browser to http://localhost:8081.

    ```shell
    pgweb --db=<insert DATABASE_URL changeMe from .env>
    ```


