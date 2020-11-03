import { Notification as Toast } from 'rsuite';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/functions';
import { isLocalhost } from './helpers';

const config = {
  apiKey: 'AIzaSyAKGRssxY4OW9um6RlSbbQ1Fh_lgdWfoPs',
  authDomain: 'chat-web-app-4ee4c.firebaseapp.com',
  databaseURL: 'https://chat-web-app-4ee4c.firebaseio.com',
  projectId: 'chat-web-app-4ee4c',
  storageBucket: 'chat-web-app-4ee4c.appspot.com',
  messagingSenderId: '167319830934',
  appId: '1:167319830934:web:419e220f9fdcd15ea25db7',
};

export const fcmVapidKey =
  'BLs_I-HQyrAuUJJh8H3U0vtHGhVhXLMqoVoomeNL90GMKm0-o7sSoN9CJYRiBAVz-Yi7ZAni8mKateJfDwodTnw';

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
export const functions = app.functions('europe-west3');

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.onMessage(({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  functions.useEmulator('localhost', 5001);
}
