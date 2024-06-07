import express from "express";
import cors from "cors";
import ingresso_route from "./routes/ingresso_route.js";
import usuario_route from "./routes/usuario_route.js";

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

ingresso_route();
usuario_route();

app.listen(3000, () => {
    console.log(`Servidor rodando com sucesso 3000`);
});