import { createConnection } from 'typeorm';

require('dotenv').config();

export const connectionProvider = 'DATABASE_CONNECTION'

export const databaseProviders = [
    {
        provide: connectionProvider,
        useFactory: async () => await createConnection({
            type: "postgres",
            host: 'localhost',
            port: 54320,
            username: 'db_user',
            password: 'pwd123',
            database: 'booking',
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: true,
        }),
    },
];