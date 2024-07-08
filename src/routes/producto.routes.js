import {getConnection} from "./../database/database"
import {Router} from "express"
import {methods as productoController} from "./../controllers/producto";

const router = Router();

router.post("/api/producto/add", productoController.addProducto);
router.get("/api/producto/:id", productoController.getProducto);
router.put("/api/producto",productoController.updateProducto);
router.delete("/api/producto", productoController.delProducto);

export default router;