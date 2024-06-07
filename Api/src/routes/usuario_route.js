import { getAllUsuario, createUsuario, updateUsuario, deleteUsuario } from "./controllers/usuarioController.js";

function usuario_route() {
    app.get(`/usuario`, getAllUsuario);
    app.post(`/usuario`, createUsuario);
    app.put(`/usuario/:id`, updateUsuario);
    app.delete(`/usuario/:id`, deleteUsuario);
}

export default usuario_route;