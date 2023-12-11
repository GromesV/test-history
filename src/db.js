import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
    states: '++id, project, name, state', // Primary key and indexed props
});
