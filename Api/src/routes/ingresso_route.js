import { getAllIngresso, createIngresso, updateIngresso, deleteIngresso } from "./controllers/ingressoController.js";

function ingresso_route() {
    app.get(`/ingresso`, getAllIngresso);
    app.post(`/ingresso`, createIngresso);
    app.put(`/ingresso/:id`, updateIngresso);
    app.delete(`/ingresso/:id`, deleteIngresso);
}

export default ingresso_route;