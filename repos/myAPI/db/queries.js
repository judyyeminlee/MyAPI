const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "my_api_db",
});

async function getAllCharacters() {
  const [rows] = await pool.query("SELECT * FROM characters");
  return rows;
}

async function addCharacter(character) {
  const { name, description } = character;
  const [result] = await pool.query(
    "INSERT INTO characters (name, description) VALUES (?,?)",
    [name, description]
  );
  return { id: result.insertId, name, description };
}

async function updateCharacter(id, character) {
  const { name, description } = character;
  await pool.query(
    "UPDATE characters SET name = ?, description = ? WHERE id = ?",
    [name, description, id]
  );
  return { id, name, description };
}

async function deleteCharacter(id) {
  await pool.query("DELETE FROM characters WHERE id = ?", [id]);
}

async function logRequest(method, endpoint) {
  await pool.query("INSERT INTO requests (method, endpoint) VALUES (?,?)", [
    method,
    endpoint,
  ]);
}

async function getRequest() {
  const [rows] = await pool.query("SELECT * FROM request");
  return rows;
}

module.exports = {
  getAllCharacters,
  addCharacter,
  updateCharacter,
  deleteCharacter,
  getRequest,
  logRequest,
};
