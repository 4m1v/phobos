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

  public getByIdWithSlides(id: string): Promise<SessionEntity> {
    return this.findOne({
      relations: ['slides'],
      where: {
        id,
      },
    });
  }

  public findByPhobiaIdWithSlides(phobiaId: string): Promise<SessionEntity[]> {
    return this.find({
      take: 100,
      order: {
        createdAt: 'DESC',
      },
      relations: ['slides'],
      where: {
        phobiaId,
      },
    });
  }

  public createSession(fearMin: number, fearMax: number, phobiaId: string): Promise<SessionEntity> {
    const result = this.create({ fearMin, fearMax, phobiaId });
    return this.save(result);
  }
}

export default SessionRepository;
