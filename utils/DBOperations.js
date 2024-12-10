import * as SQLite from "expo-sqlite";

// Open the database (or create it if it doesn't exist)
const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("TodoBase.db");
    return db;
  } catch (error) {
    console.error("Error opening database:", error);
  }
};

// Create the Todos table (if it doesn't exist)
export const createTable = async () => {
  const db = await openDatabase();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT NOT NULL,
      status TEXT NOT NULL,
      createdDate TEXT NOT NULL,
      updatedDate TEXT NOT NULL,
      createdTime TEXT NOT NULL,
      updatedTime TEXT NOT NULL
    );
  `);
};

// Insert a new Todo
export const insertTodo = async ({
  title,
  description,
  priority,
  status,
  createdDate,
  updatedDate,
  createdTime,
  updatedTime,
}) => {
  try {
    const db = await openDatabase();
    const result = await db.runAsync(
      `INSERT INTO todos (title, description, priority, status, createdDate, updatedDate, createdTime, updatedTime)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, priority, status, createdDate, updatedDate, createdTime, updatedTime]
    );
  } catch (error) {
    console.error("Error inserting todo:", error);
  }
};

// Fetch all Todos
const fetchTodos = async () => {
  try {
    const db = await openDatabase();
    const result = await db.getAllAsync("SELECT * FROM todos");
    return result;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const getSingleTodo = async (id) => {
  try {
    const db = await openDatabase();
    const result = await db.getFirstAsync("SELECT * FROM todos WHERE id = ?", [id]);

    if (result) {
      return result;
    } else {
      console.log("No todo found with this ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching todo:", error);
    return null;
  }
};

// Update a Todo
export const updateTodo = async (id, { title, description, priority, status, updatedDate, updatedTime }) => {
  try {
    const db = await openDatabase();
    const result = await db.runAsync(
      `UPDATE todos SET title = ?, description = ?, priority = ?, status = ?, updatedDate = ?, updatedTime = ? WHERE id = ?`,
      [title, description, priority, status, updatedDate, updatedTime, id]
    );
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

// Delete a Todo
export const deleteTodo = async (id) => {
  try {
    const db = await openDatabase();
    const result = await db.runAsync(`DELETE FROM todos WHERE id = ?`, [id]);
    return { delete: "success" };
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

export const updateStatus = async (id, status) => {
  try {
    const db = await openDatabase();
    const updatedDate = new Date().toLocaleDateString();
    const updatedTime = new Date().toLocaleTimeString();
    console.log(id, status);
    const result = await db.runAsync(`UPDATE todos SET status = ?, updatedDate = ?, updatedTime = ? WHERE id = ?`, [
      status,
      updatedDate,
      updatedTime,
      id,
    ]);

    console.log("Status updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

export const getAllTodos = async () => {
  const todos = await fetchTodos();
  return todos;
};
