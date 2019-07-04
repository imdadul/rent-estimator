
export interface Config  {
    connectionString:string,
    options:{
        database: string,
        dialect: string,
        //dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'mariadb',
    }
}