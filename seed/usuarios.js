import bcrypt from "bcrypt";

const usuarios = [
    {
        nombre: "Juan",
        email: "juan@gmail.com",
        cofnrimado: 1,
        pasword: bcrypt.hashSync("password", 10)
    }
]

export default usuarios;