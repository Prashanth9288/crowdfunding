const fs = require('fs');
const content = `VITE_FIREBASE_API_KEY=AIzaSyATKbUTxDTyMy6gZQacMPqZQWuC-2AjlXU
VITE_FIREBASE_AUTH_DOMAIN=fundflow-f3d85.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fundflow-f3d85
VITE_FIREBASE_STORAGE_BUCKET=fundflow-f3d85.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=287568072818
VITE_FIREBASE_APP_ID=1:287568072818:web:eea84ba8bd73c28b70f2eb`;
fs.writeFileSync('client/.env', content);
console.log('Fixed .env file');
