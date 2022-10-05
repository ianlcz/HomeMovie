# HomeMovie

The aim of this project is to develop a web application that allows film collectors to manage their movies.

It is based on data from the [The Movie Database (TMDB)](https://www.themoviedb.org/) REST API.

This project was built using [React.js](https://reactjs.org/) framework, which allows building user interfaces of web applications.

## Development Team

- **Bordeaux Ynov Campus IT department :**
  - [Yann LE COZ](https://github.com/ianlcz) - Master2 Expert in Web Development

## Built with

- [Express](https://expressjs.com/) - A [Node.js](https://nodejs.org/en/) library to develop applications backend.
- [Mongoose](https://mongoosejs.com/) - An ORM for [MongoDB](https://www.mongodb.com/) object modeling for [Node.js](https://nodejs.org/en/).
- [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - A CSS framework to build rapidly modern websites.
- [Vercel](https://vercel.com/) - A hosting service to deploy easily any frontend app.
- [Visual Studio Code](https://code.visualstudio.com/) - Code editor.

## Installation

You can install the project by cloning this repository:

```sh
git clone https://github.com/ianlcz/HomeMovie.git
```

### Install dependencies

First of all, if you have just cloned the repository you have to install the project dependencies with the command `npm install` in **root** and **api/** folder.

## Usage

### Generate your JWT_SECRET

On Linux and Mac, type this command `openssl rand -hex 32` or go to https://generate-secret.now.sh/32.

### Write the .env files

You must copy the `.env.example` file in the root folder of the application and replace `<YOUR_MONGO_URI>`, `<YOUR_JWT_SECRET>` and `<YOUR_TMDB_API_KEY>` with your own :

```
REACT_APP_API_KEY=<YOUR_TMDB_API_KEY>
MONGO_URI=<YOUR_MONGO_URI>
JWT_SECRET=<YOUR_JWT_SECRET>
```

Next, you will need to type the command `npm run start` to launch the project and your browser will open the HomeMovie application at http://localhost:3000.

#### Docker

You can launch the HomeMovie application with Docker by following the [Docker commands](./docs/docker.md) documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
