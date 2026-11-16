import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../tasks/models/task.entity';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'postgres' as const,
      host: config.get('DATABASE_HOST', 'localhost'),
      port: Number(config.get('DATABASE_PORT', 5432)),
      username: config.get('DATABASE_USER', 'postgres'),
      password: config.get('DATABASE_PASSWORD', 'postgres'),
      database: config.get('DATABASE_NAME', 'task_manager'),
      url: config.get<string>('DATABASE_URL') || undefined,
      ssl: config.get('DATABASE_SSL') === 'true' ? { rejectUnauthorized: false } : false,
      entities: [Task],
      autoLoadEntities: true,
      synchronize: false,
    }),
  })],
})
export class DatabaseModule {}
