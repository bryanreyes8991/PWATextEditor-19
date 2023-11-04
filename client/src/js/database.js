import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
console.log('Sending to DB');
const jateDb = await openDB('jate', 1);
const pass = jateDb.transaction('jate', 'readWrite');
const save = pass.objectStore('jate');
const invoke = save.add({content});
const outcome = await invoke;
console.log('Added to DB', outcome);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  console.log('Getting from DB');
  const jateDb = await openDB('jate', 1);
  const pass = jateDb.transaction('jate', 'readonly');
  const save = pass.objectStore('jate');
  const invoke = save.getAll();
  const outcome = await invoke;
  console.log('result.value', outcome);
  return outcome;
};
initdb();
