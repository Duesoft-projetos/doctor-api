import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default registerAs('database', () => {
    const dirname = __dirname.replace('\\config', '\\database');

    return {
        type: process.env.DATABASE_TYPE ?? 'postgres',
        host: process.env.DATABASE_HOST ?? 'localhost',
        port: parseInt(process.env.DATABASE_PORT ?? '5432', 10) || 5432,
        database: process.env.DATABASE_NAME ?? 'docttor-app',
        username: process.env.DATABASE_USER ?? 'postgres',
        password: process.env.DATABASE_PASSWORD ?? 'postgres',
        synchronize: process.env.DATABASE_SYNC === 'true',
        entities: [`${dirname}/core/**/*.entity{.js,.ts}`],
        migrations: [`${dirname}/migration/{.ts,*.js}`],
    } as TypeOrmModuleOptions
});
