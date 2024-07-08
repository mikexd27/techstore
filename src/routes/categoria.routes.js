import {getConnection} from "./../database/database"
import {Router} from "express"
import {methods as categoriaController} from "./../controllers/categoria";

const router = Router();

router.post("/api/categoria/add", categoriaController.addCategoria);
router.get("/api/categorias", categoriaController.getAllCategorias);
router.put("/api/categoria",categoriaController.updateCategoria);
router.delete("/api/categoria", categoriaController.delCategoria);

export default router;