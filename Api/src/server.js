import express from "express";
import cors from "cors";
import { check } from 'express-validator';
import { getAllIngresso, createIngresso, updateIngresso, deleteIngresso } from "./controllers/ingressoController.js";
import { getAllUsuario, createUsuario, updateUsuario, deleteUsuario, register, login } from "./controllers/usuarioController.js";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/ingresso', getAllIngresso);
app.post('/ingresso', createIngresso);
app.put('/ingresso/:id', updateIngresso);
app.delete('/ingresso/:id', deleteIngresso);

app.get('/usuario', getAllUsuario);
app.post('/usuario', createUsuario);
app.put('/usuario/:id', updateUsuario);
app.delete('/usuario/:id', deleteUsuario);

// Rotas de autenticação com validação
app.post('/auth/register', [
    check('email_usuario').isEmail().withMessage('Email inválido'),
    check('senha_usuario').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
], register);

app.post('/auth/login', [
    check('email_usuario').isEmail().withMessage('Email inválido'),
    check('senha_usuario').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
], login);

app.listen(PORT, () => {
    console.log(`Servidor Online em LocalHost:${PORT}...`);
}).on('error', (err) => {
    console.error('Erro ao iniciar o servidor: ', err);
});