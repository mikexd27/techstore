import {getConnection} from "./../database/database"
import {Router} from "express"
import {methods as ordenController} from "./../controllers/orden";

const router = Router();

router.post("/api/orden/add", ordenController.addOrden);
router.get("/api/orden/:id", ordenController.getOrden);
router.put("/api/orden",ordenController.updateOrden);
router.delete("/api/orden", ordenController.delOrden);


export default router;
