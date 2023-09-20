// const express = require("express"); CommonJS, manera antigua de import
import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/db.js";

//Crear la app
const app = express();

//Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}) )

//Habilitar Cookie Parser
app.use(cookieParser());
let csrfProtection = csrf({ cookie: true });

//Habilitar CSRF
app.use(csrf({cookie: true}))

//Conexión a la base de datos
try {
    await db.authenticate();
    db.sync(); //la orm sincroniza la db
    console.log("Conexión Correcta a la Base de datos")
} catch (error) {
    console.log(error)
}

//Habilitar Pug
app.set("view engine", "pug");
app.set("views", "./views");

//Carpeta Publica
app.use(express.static("public"))

//Routing
app.use("/auth", csrfProtection, usuarioRoutes);


//Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listen on port: ${port}`)
})