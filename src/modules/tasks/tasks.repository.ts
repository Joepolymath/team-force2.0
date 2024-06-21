import { User } from '../auth/entities/user.entity';
import {
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
} from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class TasksRepository {
  constructor(private dataSource: DataSource) {}
  private repo = this.dataSource.getRepository(Task);

  private logger = new Logger('TasksRepository');

  async delete(
    criteria:
      | string
      | number
      | Date
      | ObjectId
      | string[]
      | number[]
      | Date[]
      | ObjectId[]
      | FindOptionsWhere<Task>,
  ) {
    return await this.repo.delete(criteria);
  }

  async save(instance: Task) {
    return this.repo.save(instance);
  }

  async findOne(query: FindOneOptions<Task>) {
    return await this.repo.findOne(query);
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.repo.createQueryBuilder('task');
    // query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${
          user.email
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.repo.create({
      title,
      description,
      status: TaskStatus.OPEN,
      // user,
    });
    this.logger.log(`User: ${user.username} Created a Task`);
    await this.repo.save(task);
    return task;
  }
}
