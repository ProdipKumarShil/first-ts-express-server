### Vercel Deploy

1. install vercel globally

```CMD
npm i -g vercel
```

2. build application

```
npm run build
```

3. create vercel.json
   touch vercel.json
   Then using Vercel Platform version 2, specify your index.js file and the NPM module Vercel will use to turn it into a serverless function...

```{
  "version": 2,
  "builds": [
    {
      // Specify file to convert to a serverless function
      "src": "index.js",
      // Specify the NPM module that is used for the build
      "use": "@now/node"
    }
  ]
}
```

...specify which paths will route to the index.js file's built serverless function using regex.

```{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@now/node"
    }
  ],
  "routes": [
    {
      // Specify which paths will route to a destination using a regex
      "src": "/(.*)",
      // Specify the paths' destination
      "dest": "index.js"
    }
  ]
}
```

4. vercel.json
```
  {
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```
