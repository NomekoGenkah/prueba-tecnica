const {User} = require('../models');

const userController = {

    async createUser(req, res){
        try{
            const {nombre, email, password, rol} = req.body;
            
            if(await User.findOne({where: {email}})){
                return res.status(400).json({error: 'Email se encuentra registrado'});
            }

            const user = await User.create({nombre, email, password, rol});
            res.status(201).json(user);
        
        }catch(error){
            res.status(500).json({error: 'Error al crear usuario'});
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

}