import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task.entity';
import { serializeTask } from '../serializers/task.serializer';

@Injectable()
export class TaskResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((value: unknown) => {
      if (value instanceof Task) return serializeTask(value);
      if (Array.isArray(value) && value.every((item) => item instanceof Task)) {
        return value.map(serializeTask);
      }
      if (value && typeof value === 'object' && 'items' in value && Array.isArray((value as any).items)) {
        const page = value as { items: unknown[] };
        return { ...page, items: page.items.map((item) => item instanceof Task ? serializeTask(item) : item) };
      }
      return value;
    }));
  }
}
