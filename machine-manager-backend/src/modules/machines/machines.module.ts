import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachinesService } from './services/machines.service';
import { MachinesController } from './controllers/machines.controller';
import { Machine } from './entities/machine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Machine])],
  controllers: [MachinesController],
  providers: [MachinesService],
})
export class MachinesModule { }
