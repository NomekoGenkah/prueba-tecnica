const sequelize = require('../config/db.js');
const User = require('../model/user.js')(sequelize);
const bcrypt = require('bcryptjs');


const userController = {

    async createUser(req, res){
        try{
            const {nombre, email, password, rol} = req.body;
            
            if(await User.findOne({where: {email}})){
                return res.status(400).json({error: 'Email se encuentra registrado'});
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const user = await User.create({nombre, email, password:passwordHash, rol});
            res.status(201).json(user);

            //debug
            //console.log('usuario creado');
        
        }catch(error){
            res.status(500).json({error: 'Error al crear usuario'});
            
            //debug
            //console.log(`usuario no creado: ${error}`);
        }
    },

    async getAllUsers(req, res){
        try{
            const users = await User.findAll();
            res.status(200).json(users);

        }catch(error){
            res.status(500).json({error: 'Error obteniendo usuarios'});
        }
    },

    async getUser(req, res){
        try{
            const {id} = req.params;
            const user =  await User.findByPk(id);

            //debug
            //console.log(user);
            //console.log(id);

            if(user){
                return res.status(200).json(user);
            }
            res.status(404).json({error: 'Usuario no encontrado'});
            
        }catch(error){
            res.status(500).json({error: `Error buscando usuario: ${error}`});
        }
    },

    async updateUser(req, res){
        try{
            const {id} = req.params;
            const {nombre, rol} = req.body;

            const user = await User.findByPk(id);

            if(!user){
                return res.status(404).json({error: 'Usuario no encontrado'});
            }

            user.nombre = nombre || user.nombre;
            user.rol = rol || user.rol;
            await user.save();

            res.status(200).json(user);
        }catch(error){
            res.status(500).json({error: `Error actualizando usuario: ${error}`});
        }
    },

    async deleteUser(req, res){
        try{
            const {id} = req.params;

            const user = await User.findByPk(id);

            //debug
            //console.log(user);
            //console.log(id);

            if(!user){
                return res.status(404).json({error: 'Usuario no encontrado'});
            }

            await User.destroy({
                where:{
                    id: id
                }
            });

            res.status(200).json({message: 'Usuario eliminado'});
        }catch(error){
            res.status(500).json({error: `Error al eliminar usuario: ${error}`});
        }
    },
};

module.exports = userController;