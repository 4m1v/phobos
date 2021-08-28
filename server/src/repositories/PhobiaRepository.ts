import { EntityRepository, Repository } from 'typeorm';
import PhobiaEntity from '../entities/PhobiaEntity';

@EntityRepository(PhobiaEntity)
class PhobiaRepository extends Repository<PhobiaEntity> {
  public async createPhobia(id: string, description: string): Promise<void> {
    const result = this.create({ id, description });
    await this.save(result);
  }
}

export default PhobiaRepository;
