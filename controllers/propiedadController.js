import { validationResult } from "express-validator";
import { Precio, Categoria } from "../models/index.js";

const admin = (req, res) => {
    res.render("propiedades/admin", {
        pagina: "Mis Propiedades"
    })
}


//Formulario para crear una nueva propiedad
const crear = async (req, res) => {
    //Consultar modelo de precios y categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ]);


    res.render("propiedades/crear", {
        pagina: "Crear Propiedad",
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {}
    })
}

const guardar = async(req, res) => {

    //Validacion 
    let resultado = validationResult(req);

    if (!resultado.isEmpty()){
        //Consultar modelo de precios y categorias
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ]);

        return res.render("propiedades/crear", {
            pagina: "Crear Propiedad",
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            datos: req.body
        });
    }

    //Crear un Registro
    
    const { titulo, descripcion, habitaciones, estacionamientos, wc, calle, lat, lng, precio, categoria } = req.body

    const {id : usuarioId} = req.usuario; 

    try {
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamientos,
            wc,
            calle,
            lat,
            lng,
            precioId: precio,
            categoriaId: categoria,
            usuarioId,
            imagen: ""
        })

        const {id} = propiedadGuardada;
        res.redirect(`/propiedades/agregar-imagen/${id}`)

    } catch (error) {
        console.log(error);
    }

}

const agregarImagen = async(req, res) => {
    res.render("/propiedades/agregar-imagen",{
        pagina: "Agregar Imagen"
    })
}

export {
    admin,
    crear,
    guardar,
    agregarImagen
}
