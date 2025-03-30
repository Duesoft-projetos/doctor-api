import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default registerAs('database', () => ({
    type: process.env.DATABASE_TYPE ?? 'postgres',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10) || 5432,
    database: process.env.DATABASE_NAME ?? 'docttor-app',
    username: process.env.DATABASE_USER ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'postgres',
    synchronize: process.env.DB_SYNC === 'true',
    autoLoadEntities: true,
} as TypeOrmModuleOptions));
