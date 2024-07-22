# angular-github-api-application

## Description
A simple Typescript, Angular app where you can search for GitHub repositories, view some basic repo info including issues and the balance between open and closed.

## Project Setup

### Prerequisites
`Node.js` (v18.x or later)

### Project Setup and Start
1. Clone the repository

2. Navigate to the project - `cd angular-github-api-app`

3. Install dependencies - `npm install`

4. Run the project - `ng serve`

## Docker Setup

### Prerequisites

Ensure you have the following installed on your machine:
- [Docker](https://www.docker.com/get-started)

### Setup and Start

1. Navigate to the project - `cd angular-github-api-app`

2. Run:
```sh
docker build -t [your-dockerhub-username]/angular-github-api-app .
```

3. Run:
```sh
docker run -p 8080:80 [your-dockerhub-username]/angular-github-api-app
```

4. You should now see the app at [http://localhost:8080/](http://localhost:8080/)
