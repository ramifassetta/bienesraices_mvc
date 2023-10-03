import { exit } from "node:process"; //Asi se importa exit, es para terminar la ejecucion del codigo
import categorias from "./categorias.js";
import precios from "./precios.js";
import usuarios from "./usuarios.js";
import db from "../config/db.js";
import { Categoria, Precio, } from "../models/index.js"; //importa las relaciones, es mejor importart esto q solo el modelo

const importarDatos = async () => {
    try {
        //Autenticar
        await db.authenticate();

        //Generar las columnas
        await db.sync();

        //Insertamos los datos
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios),
        ]);
        console.log("Datos importados correctamente");
        exit(); //El exit sin numero o con 0 significa que termina la ejecucion del codigo correctamente

    } catch (error) {
        console.log(error);
        exit(1); //El exit con un 1 significa que termina la ejecucion con error
        // process.exit(1); //tambien se puede escribir de esta manera sin tener que importar exit
    }
}

const eliminarDatos = async () => {
    try {
        // await Promise.all([
        //     Categoria.destroy({where: {}, truncate: true}),
        //     Precio.destroy({where: {}, truncate: true})
        // ]);

        await db.sync({force: true});
        console.log("Datos eliminados correctamente");
        exit();
    } catch (error) {
        console.log(error);
        exit(1);
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}

if(process.argv[2] === "-e"){
    eliminarDatos();
}