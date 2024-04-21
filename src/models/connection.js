import sql from 'mssql'
import config from '../config'

const stringConection ={
    user : config.user,
    password : config.password,
    server : config.server,
    database : config.database,
    options : {
        trustServerCertificate : true
    }
}

export async function getConnection(){
    try {
        const conn = await sql.connect(stringConection)
        return conn

    } catch (error) {
       console.log(error);
    }
}