import { create, read, update, deleteU } from "../models/usuario.js";

// Realizar INSERT (CREATE)
export async function createUsuario(req, res) {
    //nome_usuario, cpf_usuario, idade_usuario
    const dados = req.body;

    // Insersão de Dados
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
//Realizar Consulta(READ)
export async function getAllUsuario(req, res) {
    read((err, usuario) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(usuario);
    });
}
//Realizando Atualização (UPDATE)
export async function updateUsuario(req, res) {
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
//Realizando Desativação (DELETE)
export async function deleteUsuario(req, res) {
    const { id } = req.params;
    deleteU(id, (err, result) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.send("Usuario eliminado com Sucesso");
    });
}