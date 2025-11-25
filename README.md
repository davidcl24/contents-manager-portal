# Contents Manager Portal

This is a backoffice portal to manage the creation and update of contents

## Characteristics

* It allows admins to upload new content and modify existing one with a simple, intuitive GUI.
* It allos for the management of each of the following contents:
    * Actors
    * Directors
    * Genres
    * Movies
    * Shows
    * Episodes

## Configuration

The app makes use of env variables to know the API URL

```
API_GATEWAY_URL=http://localhost:30000
```

## Setup

* Run `npm install` to install dependencies
* Run `npm run build` to build the release
* Start the app with `node /app/.next/standalone/server.js`

Now the app will be runninng at [`localhost:3000`](http://localhost:3000)
