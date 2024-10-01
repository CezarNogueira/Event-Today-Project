import { getUserById, connection } from '../src/config/db.js';

// Executado antes dos Testes
beforeAll(async () => {

    //await connection.query("INSERT INTO users (name, email) VALUES ('Cezar Nogueira', 'cezar@mail.com')");
});

// Executado após os Testes
afterAll(async () => {
    // await connection.query("TRUNCATE TABLE users") // Limpa os Dados da Tabela no BD
    //await connection.query('DROP TABLE users'); // Deleta a Tabela
    await connection.end(); // Encerra a Conexão com o BD
});

describe('Testes para getUserById', () => {
    
    test('deve retornar o usuário correto pelo ID', async () => {
        const usuario = await getUserById(8);
        expect(usuario).toHaveProperty('nome_usuario', 'Cezar Nogueira');
        expect(usuario).toHaveProperty('cpf_usuario', '090.958.495-89');
        expect(usuario).toHaveProperty('idade_usuario', 20);
        expect(usuario).toHaveProperty('email_usuario', 'cezar.junior@gmail.com');
    });

    test('Vai retornar undefined se o usuario não existir', async () => {
        const user = await getUserById(999);
        expect(user).toBeUndefined();
    });
});