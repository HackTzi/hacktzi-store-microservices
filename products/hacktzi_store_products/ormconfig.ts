export default {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": parseInt(process.env.DB_PORT),
  "username": "platzi-store-products-user-db",
  "password": "platzi-store-products-user-pw",
  "database": "platzi-store-products-db",
  "entities": ["src/**/*.entity.ts"],
  "synchronize": false,
  "migrationsTableName": "migrations",
  "migrations": ["src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}