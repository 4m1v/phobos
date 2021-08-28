import { Between, EntityRepository, Repository } from 'typeorm';
import ImageEntity from '../entities/ImageEntity';

@EntityRepository(ImageEntity)
class ImageRepository extends Repository<ImageEntity> {
  public getById(id: string): Promise<ImageEntity> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  public findByPhobiaId(phobiaId: string): Promise<ImageEntity[]> {
    return this.find({
      order: {
        createdAt: 'DESC',
      },
      where: {
        phobiaId,
      },
    });
  }

  public findInScarinessRange(min: number, max: number): Promise<ImageEntity[]> {
    return this.find({
      order: {
        createdAt: 'DESC',
      },
      where: {
        scariness: Between(min, max),
      },
    });
  }
}

export default ImageRepository;
