import { Module } from '@nestjs/common';
import { DeparmentController } from './deparment.controller';
import { DeparmentService } from './deparment.service';

@Module({
  controllers: [DeparmentController],
  providers: [DeparmentService],
})
export class DeparmentModule {}
