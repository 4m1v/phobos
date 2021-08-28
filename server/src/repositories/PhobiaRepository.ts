import { EntityRepository, Repository } from 'typeorm';
import PhobiaEntity from '../entities/PhobiaEntity';

@EntityRepository(PhobiaEntity)
class PhobiaRepository extends Repository<PhobiaEntity> {}

export default PhobiaRepository;
