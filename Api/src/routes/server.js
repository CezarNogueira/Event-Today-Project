import express from "express";
import cors from "cors";
import { getAllIngresso, createIngresso, updateIngresso, deleteIngresso } from "../controllers/moradorController.js";

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get(`/ingresso`, getAllIngresso);
app.post(`/ingresso`, createIngresso);
app.put(`/ingresso/:id`, updateIngresso);
app.delete(`/ingresso/:id`, deleteIngresso);

app.listen(3000, () => {
    console.log(`Servidor rodando com sucesso 3000`);
});