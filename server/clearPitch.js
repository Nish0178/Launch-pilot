const Database = require('better-sqlite3');
const db = new Database('./dev.db');
db.prepare('UPDATE ValidationReport SET pitchDeck = NULL').run();
console.log('Cleared!');
