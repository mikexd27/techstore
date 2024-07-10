import { getConnection } from "../database/database";

const addOrden = async (req, res) => {
    try {
        const { idCliente, producto, cantidad, total, estado} = req.body;

        if (idCliente === undefined || producto === undefined || cantidad === undefined || total === undefined || estado === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." })
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO orden (idCliente, producto, cantidad, total, estado) 
                                                        VALUES ('${idCliente}','${producto}','${cantidad}','${total}','${estado}')`);
        res.json({ "message": "Orden Registrada Correctamente" });

    } catch (error) {
        res.status(500);
        res.send("El cliente no existe");
    }
};

const getOrden = async (req, res) => {

    try {
        //const { username } = req.params;
        const { id } = req.body;

        const connection = await getConnection();
        const result = await connection.query("SELECT * from orden WHERE id = ?", id);
        console.log(result ,"Orden encontrada");
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

const updateOrden = async (req, res) => {
 //pendiente" a "enviado" o "entregado"    
    try {

        const { id, estado } = req.body;
        if (id === undefined || estado === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." })
        }
        const connection = await getConnection(); 
        const result = await connection.query(`UPDATE orden SET estado = '${estado}'                                 
                                                WHERE id = '${id}'`);
        res.status(200).json({ "message": "Orden actualizada" })
        //res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

const delOrden = async (req, res) => {

    try {
        //const { username } = req.params;
        const { id } = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM orden WHERE id = ?", id);
        res.status(200).json({ "message": "Orden eliminada" })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }


};


export const methods = {
    addOrden,
    getOrden,
    updateOrden,
    delOrden
};
