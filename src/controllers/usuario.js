import {getConnection} from "./../database/database";
import bcrypt from "bcryptjs";

const addUsuario = async (req, res) =>{
    try {
        const {usuario, correo, password} = req.body;
        
        if(usuario === undefined || correo === undefined || password === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }

        const salt = await bcrypt.genSalt(10);
        const password_encrypt = await bcrypt.hash(password, salt)
        
        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO usuario (usuario, correo, password) 
                                                        VALUES ('${usuario}','${correo}','${password_encrypt}')`);
        res.json({"message":"Usuario Registrado Correctamente"});
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getUsuario = async (req, res)=>{

    try {
        //const { usuario } = req.params;
        const {usuario, password} = req.body;
        
        const connection = await getConnection();
        const result = await connection.query("SELECT * from usuario WHERE usuario = ?", usuario);

        const passwordBD = result[0].password;
        const valid = await bcrypt.compare(password, passwordBD);

        console.log(valid);
        
        if(valid)
            res.status(200).json(result);
        else
            res.json({usuario:"Usuario incorrecto"}); 
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

const updateUsuario = async (req, res)=>{

    try {
        
        const {id, usuario, correo, password} = req.body;
        if(id === undefined || usuario === undefined || correo === undefined || password === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }
        
        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const password_encrypt = await bcrypt.hash(password, salt);

        const connection = await getConnection();
        const result = await connection.query(`UPDATE usuario SET usuario = '${usuario}', 
                                                      correo = '${correo}', 
                                                      password = '${password_encrypt}' 
                                                WHERE id = '${id}'`);
        res.status(200).json({"message":"Update user Ok"})
        //res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
};

const delUsuario = async (req, res)=>{

    try {
        //const { usuario } = req.params;
        const {usuario} = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usuario WHERE usuario = ?", usuario);
        res.status(200).json({"message":"Delete user Ok"})
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
};

export const methods = {
    addUsuario,
    getUsuario,
    updateUsuario,
    delUsuario
};
