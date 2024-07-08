import { getConnection } from "./../database/database";

const addCliente = async (req, res) => {
    try {
        const { nombre, correo, telefono, direccion } = req.body;

        if (nombre === undefined || correo === undefined || telefono === undefined || direccion === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." })
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO cliente (nombre, correo, telefono, direccion) 
                                                        VALUES ('${nombre}','${correo}','${telefono}','${direccion}')`);
        res.json({ "message": "Cliente Registrado Correctamente" });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getCliente = async (req, res) => {

    try {
        //const { username } = req.params;
        const { id } = req.body;

        const connection = await getConnection();
        const result = await connection.query("SELECT * from cliente WHERE id = ?", id);
        console.log(result ,"Cliente encontrado");
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }


};

const updateCliente = async (req, res) => {

    try {

        const { id, nombre, correo, telefono, direccion } = req.body;
        if (id === undefined || nombre === undefined || correo === undefined || telefono === undefined || direccion === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." })
        }
        const connection = await getConnection();
        const result = await connection.query(`UPDATE cliente SET nombre = '${nombre}', 
                                                      correo = '${correo}', 
                                                      telefono = '${telefono}', 
                                                      direccion = '${direccion}'
                                                WHERE id = '${id}'`);
        res.status(200).json({ "message": "Cliente actualizado" })
        //res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

const delCliente = async (req, res) => {

    try {
        //const { username } = req.params;
        const { id } = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM cliente WHERE id = ?", id);
        res.status(200).json({ "message": "Cliente eliminado" })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }


};



export const methods = {
    addCliente,
    getCliente,
    updateCliente,
    delCliente
};