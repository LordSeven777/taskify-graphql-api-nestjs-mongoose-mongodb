import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './api/user/user.module';
import { GqlConfigService } from './graphql/gql-config.service';
import { DataloaderModule } from './dataloader/dataloader.module';
import { AuthModule } from './api/auth/auth.module';
import { LabelModule } from './api/label/label.module';
import { TaskModule } from './api/task/task.module';

@Module({
  controllers: [AppController],
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      useClass: GqlConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    UserModule,
    DataloaderModule,
    AuthModule,
    LabelModule,
    TaskModule,
  ],
})
export class AppModule {}
