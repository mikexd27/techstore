import { getConnection } from "../database/database";

const addCategoria = async (req, res) => {
    try {
        const { nombre, descripcion} = req.body;

        if (nombre === undefined || descripcion === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." })
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO categoria ( nombre, descripcion) VALUES ('${nombre}','${descripcion}')`);
        res.json({ "message": "Categoria Registrada Correctamente" });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getAllCategorias = async (req, res)=>{

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * from categoria");
        console.log("Categorias obtenidas");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

const updateCategoria = async (req, res) => {

    try {

        const { id, nombre, descripcion } = req.body;
        if (id === undefined || nombre === undefined || descripcion === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." })
        }
        const connection = await getConnection();
        const result = await connection.query(`UPDATE categoria SET nombre = '${nombre}', 
                                                      descripcion = '${descripcion}'
                                                WHERE id = '${id}'`);
        res.status(200).json({ "message": "Categoria actualizada" })
        //res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

const delCategoria = async (req, res) => {

    try {
        //const { username } = req.params;
        const { id } = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM categoria WHERE id = ?", id);
        res.status(200).json({ "message": "Categoria eliminado" })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }


};

export const methods = {
    addCategoria,
    getAllCategorias,
    updateCategoria,
    delCategoria
};