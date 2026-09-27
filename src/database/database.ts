
import * as SQLite from 'expo-sqlite';

export const initDatabase = async (
    db: SQLite.SQLiteDatabase
) => {

    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS routines (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            muscleGroup TEXT NOT NULL,
            duration REAL NOT NULL,
            createdAt TEXT NOT NULL,
            featured INTEGER NOT NULL DEFAULT 0
        );
    `);

    console.log('Base de datos GymPro lista');
};
