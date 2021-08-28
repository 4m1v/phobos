import { Between, EntityRepository, Repository } from 'typeorm';
import ImageEntity from '../entities/ImageEntity';

@EntityRepository(ImageEntity)
class ImageRepository extends Repository<ImageEntity> {
  // TODO delete when recommendation system is complete
  public getId(): Promise<string> {
    return this.findOne({}).then((image) => image.id);
  }

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

  public findInScarinessRangeAndPhobiaId(min: number, max: number, phobiaId?: string): Promise<ImageEntity[]> {
    return this.find({
      order: {
        createdAt: 'DESC',
      },
      where: {
        scariness: Between(min, max),
        phobiaId,
      },
    });
  }

  public async createImage(url: string, scariness: number, phobiaId: string): Promise<void> {
    const result = this.create({ url, scariness, phobiaId });
    await this.save(result);
  }
}

export default ImageRepository;
