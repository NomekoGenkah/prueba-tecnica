require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/usuarios', userRoutes);

(async () => {
    try{
        await sequelize.authenticate();
        console.log('conexion exitosa');
        
        await sequelize.sync();
        console.log('tablas sincronizadas');

    }catch(error){
        console.log('error al conectar a db');
    }

})();

app.get('/', (req, res) =>{
    res.send('prueba');
});

app.listen(PORT, () =>{
    console.log('servidor corriendo');
    console.log(`http://localhost:${PORT}/`);
});
