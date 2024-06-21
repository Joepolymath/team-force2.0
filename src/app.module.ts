import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { BrandModule } from './modules/brand/brand.module';
import { NotificationModule } from './modules/notification/notification.module';
import { MorganMiddleware } from './common/middlewares/morgan.middleware';
import { NoteModule } from './modules/note/note.module';
import { ReminderModule } from './modules/reminder/reminder.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChatModule } from './modules/chat/chat.module';
import { ChatGateway } from './modules/chat/gateways/chat.gateway';
import { User } from './modules/auth/entities/user.entity';
import { UserStatus } from './modules/auth/entities/user-status.entity';
import { Brand } from './modules/brand/entities/brand.entity';
import { BusinessUnit } from './modules/brand/entities/business-unit.entity';
import { Note } from './modules/note/entities/note.entity';
import { Reminder } from './modules/reminder/entities/reminder.entity';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [User, UserStatus, Brand, BusinessUnit, Note, Reminder],
        };
      },
    }),
    AuthModule,
    BrandModule,
    NotificationModule,
    NoteModule,
    ReminderModule,
    EventEmitterModule.forRoot(),
    ChatModule,
  ],
  providers: [ChatGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
