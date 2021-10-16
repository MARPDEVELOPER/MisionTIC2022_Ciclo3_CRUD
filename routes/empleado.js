import Express from "express";
const router = Express.Router();
import empleado from "../models/empleado";

//Agregar un empleado
router.post('/empleado-nuevo',async(req,res)=>{
    const body=req.body;
    try {
        const empleadoDB = await empleado.create(body);
        res.status(200).json(empleadoDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error en el metodo post',
            error
        })
    }
});

//obterner empleado con ID
router.get('/empleado/:id',async(req,res)=>{
    const _id = req.params.id;
    try {
        const empleadoDB = await empleado.findOne({_id});
        res.json(empleadoDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error en el metodo get con ID',
            error
        })
    }
});

//obterner todos los empleados
router.get('/empleado',async(req,res)=>{
    try {
        const empleadoDB = await empleado.find();
        res.json(empleadoDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error en el metodo get all',
            error
        })
    }
});

//eliminar empleado
router.delete('/empleado/:id',async(req,res)=>{
    const _id = req.params.id;
    try {
        const empleadoDB = await empleado.findByIdAndDelete({_id});
        if(!empleadoDB){
            return res.status(400).json({
                mensaje: 'Empleado no encontrado',
                error})
        }
        
        res.json(empleadoDB);

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error en el metodo delete',
            error
        })
    }
});

//actualizar empleado con ID
router.put('/empleado/:id',async(req,res)=>{
    const _id = req.params.id;
    const body = req.body;
    try {
        const empleadoDB = await empleado.findByIdAndUpdate(_id,body,{new:true});
        res.json(empleadoDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error en el metodo put actualizar',
            error
        })
    }
});

//exportar 
module.exports = router;