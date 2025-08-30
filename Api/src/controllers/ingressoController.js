import { create, read, update, deleteI } from "../models/ingresso.js";

// Realizar INSERT (CREATE)
export async function createIngresso(req, res) {
    const incomingData = req.body;

    // Mapeia os dados do frontend para os nomes das colunas do banco de dados
    const mappedData = {
        nome_ingresso: incomingData.event_name,
        data_ingresso: incomingData.event_date,
        local_ingresso: incomingData.event_location,
        desc_ingresso: incomingData.event_description,
        tipo_ingresso: incomingData.tipo_ingresso || 'Padrão',
        preco_ingresso: incomingData.preco_ingresso || 0,
        qtd_ingresso: incomingData.qtd_ingresso || 0,
        ativo_ingresso: incomingData.ativo_ingresso || 1 
    };

    // Inserir de Dados
    create(mappedData, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dado no banco de dados:', err);
            res.status(500).send('Erro ao inserir dado no banco de dados');
            return;
        }
        console.log('Dado inserido com sucesso:', result);
        res.status(200).send(mappedData);
    }); 
}

// Realizar Consulta (READ)
export async function getAllIngresso(req, res) {
    read((err, ingresso) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(ingresso);
    });
}

//Realizando Atualização (UPDATE)
export async function updateIngresso(req, res) {
    const { id } = req.params;
    const novosDados = req.body;
    update(id, novosDados, (err, result) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.send("Ingresso atualizado com Sucesso");
    });
}

//Realizando Desativação (DELETE)
export async function deleteIngresso(req, res) {
    const { id } = req.params;
    deleteI(id, (err, result) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.send("Ingresso eliminado com Sucesso");
    });
}
