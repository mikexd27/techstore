import {getConnection} from "./../database/database"
import {Router} from "express"
import {methods as clienteController} from "./../controllers/cliente";

const router = Router();

router.post("/api/cliente/add", clienteController.addCliente);
router.get("/api/cliente/:id", clienteController.getCliente);
router.put("/api/cliente", clienteController.updateCliente);
router.delete("/api/cliente", clienteController.delCliente);

export default router;

