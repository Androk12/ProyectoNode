import sql from "mssql";

const config = {
  server: 'DESKTOP-V16ON8S\\SQLEXPRESS',
  database: 'Tienda',
  options: {
      trustedConnection: true, // Autenticación de Windows
  },
};

export async function getConection() {
  try {
    const pool = await sql.connect(dbsethings);
    return pool;
  } catch (error) {
    console.error(error)
  }
}

export {sql};