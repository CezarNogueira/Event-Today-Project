import { create, read, update, deleteU } from "../models/usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from 'express-validator';
import { findByEmail } from '../models/usuario.js';

// Realizar INSERT (CREATE)
export async function createUsuario(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const dados = req.body;
    const hashedPassword = await bcrypt.hash(dados.senha_usuario, 10);
    dados.senha_usuario = hashedPassword;

    // Inserção de Dados
    create(dados, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dado no banco de dados:', err);
            res.status(500).send('Erro ao inserir dado no banco de dados');
            return;
        }
        console.log('Dado inserido com sucesso:', result);
        res.status(200).send(dados);
    }); 
}

// Realizar Consulta (READ)
export async function getAllUsuario(req, res) {
    read((err, usuario) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(usuario);
    });
}

// Realizar Atualização (UPDATE)
export async function updateUsuario(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const novosDados = req.body;
    update(id, novosDados, (err, result) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.send("Usuario atualizado com Sucesso");
    });
}

// Realizar Desativação (DELETE)
export async function deleteUsuario(req, res) {
    const { id } = req.params;
    deleteU(id, (err) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.send("Usuario eliminado com Sucesso");
    });
}

// Registrar usuário
export async function register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome_usuario, cpf_usuario, idade_usuario, email_usuario, senha_usuario } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(senha_usuario, 10);
        const dados = { nome_usuario, cpf_usuario, idade_usuario,email_usuario, senha_usuario: hashedPassword };

        create(dados, (err, result) => {
            if (err) {
                console.error('Erro ao registrar usuário no banco de dados:', err);
                res.status(500).send('Erro ao registrar usuário no banco de dados');
                return;
            }
            console.log('Usuário registrado com sucesso:', result);
            res.status(201).send('Usuário registrado com sucesso');
        });
    } catch (err) {
        res.status(500).send('Erro ao registrar usuário');
    }
}

// Login do usuário
export async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Extrair email e senha do corpo da requisição
    const { email_usuario, senha_usuario } = req.body;

    try {
        // Buscar usuário no banco de dados pelo email
        findByEmail(email_usuario, async (err, rows) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao buscar usuário' });
                return;
            }
            // Se não encontrar nenhum usuário com o email fornecido, retornar erro de credenciais inválidas
            if (rows.length === 0) {
                return res.status(400).json({ error: 'Credenciais inválidas' });
            }
            // Extrair a senha criptografada do usuário encontrado
            const user = rows[0];
            const isMatch = await bcrypt.compare(senha_usuario, user.senha_usuario);

            // Se as senhas não corresponderem, retornar erro de credenciais inválidas
            if (!isMatch) {
                return res.status(400).json({ error: 'Credenciais inválidas' });
            }

            console.log(`Login bem-sucedido para o usuário com email ${email_usuario}`);

            // Se as senhas corresponderem, gerar token de autenticação e retornar para o cliente
            const token = jwt.sign({ id: user.idusuario }, 'your_jwt_secret', { expiresIn: '1h' });
            res.status(200).json({ token, nome_usuario: user.nome_usuario });
        });
    } catch (err) {
        console.error('Erro ao realizar login:', err);
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
}