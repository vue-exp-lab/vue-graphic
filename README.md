# maths artist

> Nuxt.js + Vuetify.js project

## Setup Firebase keys
create `env.sh` in root directary, and setup your firebase key 
```
# ./env.sh
echo "set FIREBASE_API_KEY"
export FIREBASE_API_KEY="foo-key"
echo "set FIREBASE_AUTH_DOMAIN"
export FIREBASE_AUTH_DOMAIN="foo.firebaseapp.com"
echo "set FIREBASE_DB_URL"
export FIREBASE_DB_URL="https://foo.firebaseio.com"
echo "set FIREBASE_PROJECT_ID"
export FIREBASE_PROJECT_ID="foo"
echo "set FIREBASE_MESSAGEING_ID"
export FIREBASE_MESSAGEING_ID="foo-id"
```

then run 
```
$ source env.sh
```

then run 
```
$ npm run dev
```


## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```


## Firebase

Read more : [https://firebase.google.com/docs/storage/security/start#sample-rules](https://firebase.google.com/docs/storage/security/start#sample-rules)

Grant Storage permission for user

```
// Grants a user access to a node matching their user ID
service firebase.storage {
  match /b/{bucket}/o {
    // Files look like: "user/<UID>/path/to/file.txt"
    match /user/{userId}/{allPaths=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```


Grant Storage permission for public

```
// Anyone can read or write to the bucket, even non-users of your app.
// Because it is shared with Google App Engine, this will also make
// files uploaded via GAE public.
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```


For detailed explanation on how things work, check out the [Nuxt.js](https://github.com/nuxt/nuxt.js) and [Vuetify.js](https://vuetifyjs.com/) documentation.

## Reference
 - [https://www.davidroyer.me/blog/nuxtjs-firebase-auth/](https://www.davidroyer.me/blog/nuxtjs-firebase-auth/)