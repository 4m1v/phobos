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

  public async createSession(fearMin: number, fearMax: number, phobiaId: string): Promise<string> {
    const result = this.create({ fearMin, fearMax, phobiaId });
    const { id } = await this.save(result);
    return id;
  }

  public getSlideLenById(id: string): Promise<number> {
    return this.getById(id).then((session) => session.slidesLen);
  }

  public async editSlideLenById(id: string, slidesLen: number): Promise<void> {
    await this.update({ id }, { slidesLen });
  }
}

export default SessionRepository;
