# Chat app

## Overview

Real-time chat with rooms, message likes, social media auth, role-based permissions,
file upload, audio messages and real-time notifications.

Stack:

- React
- Firebase (realtime database, FCM, cloud functions)
- Styles with Sass and Rsuite

## Develop and run locally

### Pull and install

1. Clone this repo by running `git clone https://github.com/shelooks16/chat-app.git`
2. Install dependencies for both cloud functions and React frontend by running `npm install && cd functions && npm install`

### Important

Developed using Node v10. However, if you have one of the latest Node
versions, you can easily have dependecy-related errors (when running npm run start),
for example with `node-sass`. Feel free to update conflict packages to versions with no conflicts.

The reason for developing with Node v10 is to deploy cloud functions without any
error. Engine.node is set to 10 inside `functions/package.json`. When deploying
functions with different version other than 10, version conflict will pop-up.

Ideally, you should have `Node Version Manager` installed to easily switch between
different NodeJS versions.

### Run frontend locally

1. Inside `src/misc/firebase.js` replace config with your firebase project config.
2. Get FCM vapid key for real-time notificaitons from `Firebase dashboard > Cog icon > Project Settings > Cloud Messaging > Web push certificates > Key pair`
   and put it as `fcmVapidKey` inside `src/misc/firebase.js`.
3. Run `npm run start` and develop :)

If you have problems with `node-sass`, just update the package to other version.

### Run functions locally

1. Download a service account from `Firebase dashboard > Cog icon > Project Settings > Service accounts > Generate new private key`.
2. Put the file as `functions/service-account.json`
3. Run `npm run start` from `functions`

## Deployment

1. Install firebase-cli by running `npm install -g firebase-tools`
2. Run `firebase deploy`
