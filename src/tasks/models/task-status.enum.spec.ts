import { TaskStatus } from './task-status.enum';

describe('TaskStatus', () => {
  it('exposes the supported workflow states', () => {
    expect(Object.values(TaskStatus)).toEqual(['pending', 'in_progress', 'done']);
  });
});
