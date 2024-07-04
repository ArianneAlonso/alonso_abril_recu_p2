const express = require("express")
const app = express();

//base de datos
const basedatos = require("./db")

//middleware
app.use(express.json());

//configuracion
app.set("port", process.env.PORT || 4321);

//rutas:

//lista
app.get ("/students", (req, res)=>{
    res.json(basedatos);
})

//estudiante en base de id
app.get("/students/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const estudianteId = basedatos.findIndex(e => e.id === id);
    res.json(estudianteId);
})

//agregar
app.post("/students", (req, res) =>{
    const {fullName, age, curse} = req.body;
    const id = new Date().getTime();

    const nuevoEstudiante = {
        id,
        fullName,
        age,
        curse
    }
    basedatos.push(nuevoEstudiante);
    res.json(basedatos)
})

//actualizar
app.put("/students/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const {fullName,age, curse} = req.body;
    const estudianteId = basedatos.findIndex(e => e.id === id);

    basedatos[estudianteId].fullName = fullName;
    basedatos[estudianteId].age = age;
    basedatos[estudianteId].curse = curse;

    res.json(basedatos);
})

//eliminar 
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const estudianteId = basedatos.findIndex(e => e.id === id);
    basedatos.splice(estudianteId, 1);
    res.json(basedatos)
})


//servidor
app.listen(app.get("port"), () =>{
    console.log(`el servidor esta corriend en el puerto ${app.get("port")}`);
})