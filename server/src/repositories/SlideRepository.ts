import { EntityRepository, Repository } from 'typeorm';
import SlideEntity from '../entities/SlideEntity';

@EntityRepository(SlideEntity)
class SlideRepository extends Repository<SlideEntity> {
  public findByImageId(imageId: string): Promise<SlideEntity[]> {
    return this.find({
      take: 100,
      order: {
        createdAt: 'DESC',
      },
      where: {
        imageId,
      },
    });
  }

  public async createSlide(order: number, scariness: number, imageId: string, sessionId: string): Promise<SlideEntity> {
    const result = this.create({ order, scariness, imageId, sessionId });
    return this.save(result);
  }
}

export default SlideRepository;
