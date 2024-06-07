import { createConnection } from "mysql2";

const connection = createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "event_database"
});

connection.connect((err) => {
    if (err) {
        console.error("Erro ao realizar conexão com o DB:", err);
        throw err;
    }
    console.log("Conexão com o BD estabelecida com sucesso!");
});

export default connection;