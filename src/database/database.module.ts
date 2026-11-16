import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../tasks/models/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: Number(config.get<string>('DATABASE_PORT', '5432')),
        username: config.get<string>('DATABASE_USER', 'postgres'),
        password: config.get<string>('DATABASE_PASSWORD', 'postgres'),
        database: config.get<string>('DATABASE_NAME', 'task_manager'),
        url: config.get<string>('DATABASE_URL') || undefined,
        ssl:
          config.get<string>('DATABASE_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
        entities: [Task],
        autoLoadEntities: true,
        migrations: [__dirname + '/migrations/*{.js,.ts}'],
        migrationsRun: config.get<string>('DATABASE_MIGRATIONS_RUN', 'true') === 'true',
        migrationsTableName: 'typeorm_migrations',
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
