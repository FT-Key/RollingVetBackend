import mongoose from 'mongoose';

mongoose.connect(
  'mongodb+srv://fr4nc0t2:Vrsj1E3buUBrrRcB@template.uf450.mongodb.net/DB_Template'
)
.then(() => console.log('Se conectó la base de datos'))
.catch((error) => console.log('Error al conectar base de datos: ', error))