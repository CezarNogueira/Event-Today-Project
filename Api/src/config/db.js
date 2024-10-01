import { createPool } from "mysql2/promise";

const connection = createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "event_database"
});

async function getUserById(id) {
    const [rows] = await connection.query('SELECT * FROM usuario WHERE idusuario = ?', [id]);
    return rows[0];
}

export { getUserById, connection };