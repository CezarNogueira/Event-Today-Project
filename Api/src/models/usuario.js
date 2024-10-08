import connection from "../config/db.js";

    //Metodo responsavel por realizar a leitura (se ativo = 1)
    export function read(callback) {
        connection.query("SELECT * FROM usuario WHERE ativo_usuario = 1", callback);
    }
    //Metodo responsavel por realizar a inserção
    export function create(novoUsuario, callback) {
        connection.query("INSERT INTO usuario SET ?", [novoUsuario], callback);
    }
    //Metodo responsavel por realizar a atualização
    export function update(id, novosDados, callback) {
        connection.query("UPDATE usuario SET ? WHERE idusuario = ?", [ novosDados, id ], callback);
    }
    //Metodo responsavel por realizar o delete
    export function deleteU(id, callback) {
        //setar como inativo
        connection.query("UPDATE usuario SET ativo_usuario = 0 WHERE idusuario = ?", [ id ], callback);
    }

    // Método responsável por encontrar um usuário pelo email
    export function findByEmail(email_usuario, callback) {
        const query = "SELECT * FROM usuario WHERE email_usuario = ?";
        connection.query(query, [email_usuario], callback);
    }