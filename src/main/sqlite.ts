import { app } from 'electron'
import * as path from 'path'
import * as sqlite3 from 'sqlite3'
import { deleteParam, insertParam, queryParam, updateParam } from './sqlite.d'

const userDataPath = app.getPath('userData')
const dbPath = path.join(userDataPath, 'sqliteDatabase.db')

console.log('Database path:', dbPath)

class Database {
  private db: sqlite3.Database

  constructor() {
    this.db = new sqlite3.Database(dbPath)
  }

  open(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.db.serialize(() => {
        this.db.run('PRAGMA foreign_keys = ON')
        console.log('Connected to the database.')
        resolve()
      })
    })
  }

  close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err)
        } else {
          console.log('Database closed.')
          resolve()
        }
      })
    })
  }

  query<T>(param: queryParam): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      this.db.all(param.sql, param.params, (err, rows: T[]) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  insert<T>(param: insertParam<T>): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const keys = Object.keys(param.data)
      const values = Object.values(param.data)
      const placeholders = keys.map(() => '?').join(',')
      const sql = `INSERT INTO ${param.table} (${keys.join(',')}) VALUES (${placeholders})`

      this.db.run(sql, values, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(this.lastID)
        }
      })
    })
  }

  update<T>(param: updateParam<T>): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const entries = Object.entries(param.data)
        .map(([key]) => `${key} = ?`)
        .join(',')
      const params = Object.values(param.data)
      const sql = `UPDATE ${param.table} SET ${entries} WHERE ${param.condition}`

      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(this.changes)
        }
      })
    })
  }

  delete(param: deleteParam): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const sql = `DELETE FROM ${param.table} WHERE ${param.condition}`

      this.db.run(sql, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

const db = new Database()

export const initSqlite = async (): Promise<void> => {
  try {
    await db.open()
    await db.query({
      sql: `
      CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER
      )
    `
    })
    console.log('Database initialized.')
  } catch (err) {
    console.error('Error opening database:', err)
  }
}

export const sqlQuery = db.query.bind(db)
export const sqlInsert = db.insert.bind(db)
export const sqlUpdate = db.update.bind(db)
export const sqlDelete = db.delete.bind(db)
