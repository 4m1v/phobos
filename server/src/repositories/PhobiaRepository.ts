import { EntityRepository, Repository } from 'typeorm';
import PhobiaEntity from '../entities/PhobiaEntity';

@EntityRepository(PhobiaEntity)
class PhobiaRepository extends Repository<PhobiaEntity> {
  public async createPhobia(id: string): Promise<void> {
    const result = this.create({ id });
    await this.save(result);
  }
}

export default PhobiaRepository;
