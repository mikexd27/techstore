import { getConnection } from "./../database/database";

const addProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, cantidad, categoria } = req.body;

        if (nombre === undefined || descripcion === undefined || precio === undefined || cantidad === undefined || categoria === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." })
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO producto (nombre, descripcion, precio, cantidad, categoria) 
                                                        VALUES ('${nombre}','${descripcion}','${precio}','${cantidad}','${categoria}')`);
        res.json({ "message": "Producto Registrado Correctamente" });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getProducto = async (req, res) => {

    try {
        //const { username } = req.params;
        const { id } = req.body;

        const connection = await getConnection();
        const result = await connection.query("SELECT * from producto WHERE id = ?", id);
        console.log(result);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }


};

const updateProducto = async (req, res) => {

    try {

        const { id, nombre, descripcion, precio, cantidad, categoria } = req.body;
        if (id === undefined || nombre === undefined || descripcion === undefined || precio === undefined || cantidad === undefined || categoria === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." })
        }
        const connection = await getConnection();
        const result = await connection.query(`UPDATE producto SET nombre = '${nombre}', 
                                                      descripcion = '${descripcion}', 
                                                      precio = '${precio}', 
                                                      cantidad = '${cantidad}',
                                                      categoria = '${categoria}'
                                                WHERE id = '${id}'`);
        res.status(200).json({ "message": "Producto actualizado" })
        //res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

const delProducto = async (req, res) => {

    try {
        //const { username } = req.params;
        const { id } = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM producto WHERE id = ?", id);
        res.status(200).json({ "message": "Producto eliminado" })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }


};

export const methods = {
    addProducto,
    getProducto,
    updateProducto,
    delProducto
};