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
}

export default SlideRepository;
