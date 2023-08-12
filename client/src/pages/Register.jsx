export const Register = () => {
    return (
        <div>
            <form action=""> 
                <input type="text" placeholder="Nombre" name="username"/>
                <input type="text" placeholder="Apellido" name="lastname"/>
                <input type="email" placeholder="Email" name="email"/>
                <input type="password" placeholder="Contraseña" name="password"/>
            </form>
        </div>
    )
}