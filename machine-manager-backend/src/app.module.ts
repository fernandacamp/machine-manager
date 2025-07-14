import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MachinesModule } from './modules/machines/machines.module';

@Module({
  imports: [
    DatabaseModule,
    MachinesModule,
  ],
})
export class AppModule {}
