import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CostCenterService } from './cost-center.service';
import { CreateCostCenterDto } from './dtos/create-cost-center.dto';
import { UpdateCostCenterDto } from './dtos/update-cost-center.dto';

@Controller()
export class CostCenterController {
  constructor(private readonly costCenterService: CostCenterService) {}

  @MessagePattern('createCostCenter')
  create(@Payload() createCostCenterDto: CreateCostCenterDto) {
    return this.costCenterService.create(createCostCenterDto);
  }

  @MessagePattern('findAllCostCenter')
  findAll() {
    return this.costCenterService.findAll();
  }

  @MessagePattern('findOneCostCenter')
  findOne(@Payload() id: number) {
    return this.costCenterService.findOne(id);
  }

  @MessagePattern('updateCostCenter')
  update(@Payload() updateCostCenterDto: UpdateCostCenterDto) {
    return this.costCenterService.update(
      updateCostCenterDto.id,
      updateCostCenterDto,
    );
  }

  @MessagePattern('removeCostCenter')
  remove(@Payload() id: number) {
    return this.costCenterService.remove(id);
  }
}
