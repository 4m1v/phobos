import { EntityRepository, Repository } from "typeorm";
import SessionEntity from "../entities/SessionEntity";

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
      relations: ["slides"],
      where: {
        id,
      },
    });
  }

  public findByPhobiaIdWithSlides(phobiaId: string): Promise<SessionEntity[]> {
    return this.find({
      order: {
        createdAt: "DESC",
      },
      relations: ["slides"],
      where: {
        phobiaId,
      },
    });
  }

  public createSession(fearMin: number, fearMax: number, phobiaId: string): Promise<SessionEntity> {
    const result = this.create({ fearMin, fearMax, phobiaId });
    return this.save(result);
  }

  public getSlideLenById(id: string): Promise<number> {
    return this.getById(id).then((session) => session.slidesLen);
  }

  public async editSlideLenById(id: string, slidesLen: number): Promise<void> {
    await this.update({ id }, { slidesLen });
  }
}

export default SessionRepository;
