import { BodyParam, Post, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { toSession } from '../json';
import { InjectRepository } from 'typeorm-typedi-extensions';
import ImageRepository from '../repositories/ImageRepository';
import PhobiaRepository from '../repositories/PhobiaRepository';
import SessionRepository from '../repositories/SessionRepository';
import SlideRepository from '../repositories/SlideRepository';

import type { Image, Session } from '../../../src/api';

@JsonController('/api')
class AnnouncementController {
  @InjectRepository()
  private readonly imageRepository: ImageRepository;
  @InjectRepository()
  private readonly phobiaRepository: PhobiaRepository;
  @InjectRepository()
  private readonly sessionRepository: SessionRepository;
  @InjectRepository()
  private readonly slideRepository: SlideRepository;

  @Post('/start')
  @OpenAPI({
    summary: '',
    description: 'Output of ``',
  })
  public async start(
    @BodyParam('fearMin', { required: true }) fearMin: number,
    @BodyParam('fearMax', { required: true }) fearMax: number,
    @BodyParam('phobiaId', { required: true }) phobiaId: string,
  ): Promise<{ sessionId: string }> {
    const sessionId = await this.sessionRepository.createSession(fearMin, fearMax, phobiaId);
    return {
      sessionId,
    };
  }

  @Post('/image')
  @OpenAPI({
    summary: '',
    description: 'Output of ``',
  })
  public image(@BodyParam('sessionId', { required: true }) sessionId: number): Promise<Image> {
    sessionId;
    return null;
  }

  @Post('/feedback')
  @OpenAPI({
    summary: '',
    description: 'Output of ``',
  })
  public async feedback(
    @BodyParam('imageId', { required: true }) imageId: string,
    @BodyParam('sessionId', { required: true }) sessionId: string,
    @BodyParam('scariness', { required: true }) scariness: number,
  ): Promise<void> {
    const slideLen = await this.sessionRepository.getSlideLenById(sessionId);
    await this.slideRepository.createSlide(slideLen, scariness, imageId, sessionId);
    await this.sessionRepository.editSlideLenById(sessionId, slideLen + 1);
  }

  @Post('/result')
  @OpenAPI({
    summary: '',
    description: 'Output of ``',
  })
  public async result(@BodyParam('sessionId', { required: true }) sessionId: string): Promise<Session> {
    const session = await this.sessionRepository.getByIdWithSlides(sessionId);
    return toSession(session);
  }
}

export default AnnouncementController;
