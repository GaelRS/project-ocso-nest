import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>) {}
  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto);
  }

  findAll() {
    return this.managerRepository.find({relations:{
      location: true,
    }});
  }

  findOne(id: string) {
    const manager = this.managerRepository.findOne({
      where: { managerId: id },
      relations:{
        location: true,
      }
    });
    if(!manager) throw new NotFoundException('Manager not found');
    return manager;
  }gi

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto,
    })
    if(!managerToUpdate) throw new NotFoundException('Manager not found');
    return this.managerRepository.save(managerToUpdate);
  }

  remove(id: string) {
    return this.managerRepository.delete({
      managerId: id,
    });
    
  }
}
