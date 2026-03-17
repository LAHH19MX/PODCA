import sql from "mssql";

const config: sql.config = {
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  port: parseInt(process.env.DB_PORT!),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
  if (pool) return pool;
  pool = await sql.connect(config);
  return pool;
}
