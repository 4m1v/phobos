import { EntityRepository, Repository } from 'typeorm';
import PhobiaEntity from '../entities/PhobiaEntity';

@EntityRepository(PhobiaEntity)
class PhobiaRepository extends Repository<PhobiaEntity> {
  public getById(id: string): Promise<PhobiaEntity> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}

export default PhobiaRepository;
