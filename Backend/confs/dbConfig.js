const {initializeApp, cert} = require('firebase-admin/app');
const {getFirestore, Timstamp, FieldValue, Filter, Timestamp} = require('firebase-admin/firestore');

const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_CREDENTIALS, 'base64').toString('utf8'));


initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = {db, Timestamp, FieldValue, Filter};
