import mongoose from "mongoose";
const schema = mongoose.Schema;

const empleadoSchema= new schema({
    marcaTemporal:{type:Date, default:Date.now},
    documento:{type:Number, required:[true,'documento obligatorio']},
    nombres:{type:String, required:[true,'nombres obligatorios']},
    apellidos:{type:String, required:[true,'apellidos obligatorios']}
});

//convertir a modelo
const empleado = mongoose.model('empleado',empleadoSchema);
export default empleado;