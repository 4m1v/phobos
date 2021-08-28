import { EntityRepository, Repository } from 'typeorm';
import SessionEntity from '../entities/SessionEntity';

@EntityRepository(SessionEntity)
class SessionRepository extends Repository<SessionEntity> {
  public getById(id: string): Promise<SessionEntity> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  public findByPhobiaId(phobiaId: string): Promise<SessionEntity[]> {
    return this.find({
      order: {
        createdAt: 'DESC',
      },
      where: {
        phobiaId,
      },
    });
  }

  public async createSession(fearMin: number, fearMax: number, phobiaId: string): Promise<SessionEntity> {
    const result = this.create({ fearMin, fearMax, phobiaId });
    const output = await this.save(result);
    return output;
  }
}

export default SessionRepository;
