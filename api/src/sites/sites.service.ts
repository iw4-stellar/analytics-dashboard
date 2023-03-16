import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Site) private sitesRepository: Repository<Site>,
  ) {}

  async create(createSiteDto: CreateSiteDto) {
    const user = await this.usersRepository.findOneBy({
      id: createSiteDto.user,
    });

    const data = {
      ...createSiteDto,
      user,
    };

    const site = this.sitesRepository.create(data);

    return await this.sitesRepository.save(site);
  }

  findAll() {
    return this.sitesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} site`;
  }

  update(id: number, updateSiteDto: UpdateSiteDto) {
    return `This action updates a #${id} site`;
  }

  remove(id: number) {
    return `This action removes a #${id} site`;
  }
}
