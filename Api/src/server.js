import express from "express";
import cors from "cors";
import { getAllIngresso, createIngresso, updateIngresso, deleteIngresso } from "./controllers/ingressoController.js";
import { getAllUsuario, createUsuario, updateUsuario, deleteUsuario } from "./controllers/usuarioController.js";

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get(`/ingresso`, getAllIngresso);
app.post(`/ingresso`, createIngresso);
app.put(`/ingresso/:id`, updateIngresso);
app.delete(`/ingresso/:id`, deleteIngresso);

app.get(`/usuario`, getAllUsuario);
app.post(`/usuario`, createUsuario);
app.put(`/usuario/:id`, updateUsuario);
app.delete(`/usuario/:id`, deleteUsuario);

app.listen(3000, () => {
    console.log(`Servidor rodando com sucesso 3000`);
});