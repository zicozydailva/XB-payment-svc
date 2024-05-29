import { Injectable } from '@nestjs/common';
import { CreateAirtimeDto } from './dto/create-airtime.dto';
import { UpdateAirtimeDto } from './dto/update-airtime.dto';

@Injectable()
export class AirtimeService {
  create(createAirtimeDto: CreateAirtimeDto) {
    return 'This action adds a new airtime';
  }

  findAll() {
    return `This action returns all airtime`;
  }

  findOne(id: number) {
    return `This action returns a #${id} airtime`;
  }

  update(id: number, updateAirtimeDto: UpdateAirtimeDto) {
    return `This action updates a #${id} airtime`;
  }

  remove(id: number) {
    return `This action removes a #${id} airtime`;
  }
}
