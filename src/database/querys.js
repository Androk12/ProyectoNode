

export const queries = {
    getProducts:"SELECT * FROM prueba",
    create:"INSERT INTO Clientes (nombre,correo) VALUES(@name,@correo)",
    getById:"SELECT * FROM Clientes WHERE id = @id "

}