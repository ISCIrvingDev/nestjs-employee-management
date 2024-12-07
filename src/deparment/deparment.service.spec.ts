import { Test, TestingModule } from '@nestjs/testing';
import { DeparmentService } from './deparment.service';

describe('DeparmentService', () => {
  let service: DeparmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeparmentService],
    }).compile();

    service = module.get<DeparmentService>(DeparmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
