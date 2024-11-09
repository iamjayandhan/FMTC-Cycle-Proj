const admin = require('firebase-admin');
const {initializeApp, cert} = require('firebase-admin/app');
const {getFirestore, Timstamp, FieldValue, Filter, Timestamp} = require('firebase-admin/firestore');

const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_CREDENTIALS, 'base64').toString('utf8'));


initializeApp({
    credential: cert(serviceAccount),
    databaseURL: 'https://fmtc-cycle-proj-be-default-rtdb.firebaseio.com/'
});

const db = getFirestore();
const realTimeDb = admin.database();

module.exports = {db, realTimeDb, Timestamp, FieldValue, Filter};
