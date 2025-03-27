import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>,
        @InjectRepository(Manager)
        private managerRepository: Repository<Manager>,
    ) {}

    create(createLocationDto: CreateLocationDto) {
        return this.locationRepository.save(createLocationDto);
    }

    findAll() {
        return this.locationRepository.find();
    }

    findOne(id: number) {
        const location = this.locationRepository.findOneBy({
            locationId: id,
        });
        if (!location) throw new NotFoundException('Location not found');
        return location;
    }

    async update(id: number, updateLocationDto: UpdateLocationDto) {
        // Set manager's location to null
        if(updateLocationDto.managerId){
            await this.managerRepository
                .createQueryBuilder()
                .update()
                .set({ location: null }) 
                .where('managerId = :id', { id: updateLocationDto.managerId })
                .execute();
        }

        const locationToUpdate = await this.locationRepository.preload({
            locationId: id,
            ...updateLocationDto,
        });
        if (!locationToUpdate) throw new NotFoundException('Location not found');
        const savedLocation = await this.locationRepository.save(locationToUpdate);

        if(updateLocationDto.managerId){
            const updated = await this.managerRepository.preload({
                managerId: updateLocationDto.managerId,
                location: locationToUpdate,
            });
            if (!updated) throw new NotFoundException('Manager not found');
            await this.managerRepository.save(updated);
        }

        return savedLocation;
    }

    remove(id: number) {
        return this.locationRepository.delete({ locationId: id });
    }
}