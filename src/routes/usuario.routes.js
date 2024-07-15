import {getConnection} from "./../database/database"
import {Router} from "express"
import {methods as usuarioController} from "./../controllers/usuario";

const router = Router();

router.post("/api/usuario/add", usuarioController.addUsuario);
router.get("/api/usuario/:id", usuarioController.getUsuario);
router.put("/api/usuario",usuarioController.updateUsuario);
router.delete("/api/usuario", usuarioController.delUsuario);

export default router;
