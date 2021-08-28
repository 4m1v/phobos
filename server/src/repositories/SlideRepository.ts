import { EntityRepository, Repository } from 'typeorm';
import SlideEntity from '../entities/SlideEntity';

@EntityRepository(SlideEntity)
class SlideRepository extends Repository<SlideEntity> {
  public getById(id: string): Promise<SlideEntity> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  public findByImageId(imageId: string): Promise<SlideEntity[]> {
    return this.find({
      order: {
        createdAt: 'DESC',
      },
      where: {
        imageId,
      },
    });
  }

  public async createSlide(order: number, scariness: number, imageId: string, sessionId: string): Promise<void> {
    const result = this.create({ order, scariness, imageId, sessionId });
    await this.save(result);
  }
}

export default SlideRepository;
