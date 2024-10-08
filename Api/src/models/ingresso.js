import connection from "../config/db.js";

    //Metodo responsavel por realizar a leitura (se ativo = 1)
    export function read(callback) {
        connection.query("SELECT * FROM ingresso WHERE ativo_ingresso = 1", callback);
    }
    //Metodo responsavel por realizar a inserção
    export function create(novoIngresso, callback) {
        connection.query("INSERT INTO ingresso SET ?", [ novoIngresso ], callback);
    }
    //Metodo responsavel por realizar a atualização
    export function update(id, novosDados, callback) {
        connection.query("UPDATE ingresso SET ? WHERE idingresso = ?", [ novosDados, id ], callback);
    }
    //Metodo responsavel por realizar o delete
    export function deleteI(id, callback) {
        //setar como inativo
        connection.query("UPDATE ingresso SET ativo_ingresso = 0 WHERE idingresso = ?", [ id ], callback);
    }