import { createConnection } from "mysql2";

const connection = createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "event_database"
});



export default connection;