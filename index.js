import * as firebase from 'firebase';
import 'firebase/firestore';
import fs from 'fs';

firebase.initializeApp(require('./firebase.config.json'));
const auth = firebase.auth();
const db = firebase.firestore();

let query = db.collection('operations');
query.get().then(function(snap) {
    let data = snap.docs.map(x => JSON.stringify(x.data()) );
    fs.writeFile('./backup.operations.json', data.join('\n'), (err) => {
        if (err) console.error(err);
        else console.log(data.length + ' records written.')
    });
});
