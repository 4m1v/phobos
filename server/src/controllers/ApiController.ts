import { BodyParam, Post, JsonController, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import ImageRepository from '../repositories/ImageRepository';
import PhobiaRepository from '../repositories/PhobiaRepository';
import SessionRepository from '../repositories/SessionRepository';
import SlideRepository from '../repositories/SlideRepository';
import { toImage, toPhobias, toSession } from '../json';
import { initRecommender, getNextImage, addFeedbackToRecommender, recalculatePredictedRatings } from '../recommender';

import type { Image, Phobia, Session } from '../../../src/api';

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
    summary: 'Called at the start of a session to create a session.',
    description: 'Output of `{ sessionId: string }`',
  })
  public async start(
    @BodyParam('fearMin', { required: true }) fearMin: number,
    @BodyParam('fearMax', { required: true }) fearMax: number,
    @BodyParam('phobiaId', { required: true }) phobiaId: string,
  ): Promise<{ sessionId: string }> {
    const session = await this.sessionRepository.createSession(fearMin, fearMax, phobiaId);
    await initRecommender(session, this.imageRepository, this.sessionRepository);
    return {
      sessionId: session.id,
    };
  }

  @Post('/play')
  @OpenAPI({
    summary: 'Called at the start of reviewing an image to get the image.',
    description: 'Output of `Image` defined in api.ts',
  })
  public async play(@BodyParam('sessionId', { required: true }) sessionId: string): Promise<Image> {
    sessionId;
    const imageId = await getNextImage(sessionId);
    const image = await this.imageRepository.getById(imageId);
    return toImage(image);
  }

  @Post('/feedback')
  @OpenAPI({
    summary: 'Called at the end of reviewing an image to record how a user responded.',
    description: 'Output of `{}`',
  })
  public async feedback(
    @BodyParam('imageId', { required: true }) imageId: string,
    @BodyParam('sessionId', { required: true }) sessionId: string,
    @BodyParam('scariness', { required: true }) scariness: number,
  ): Promise<Record<string, never>> {
    const slideLen = await this.sessionRepository.getSlideLenById(sessionId);
    const slide = await this.slideRepository.createSlide(slideLen, scariness, imageId, sessionId);
    await this.sessionRepository.editSlideLenById(sessionId, slideLen + 1);
    addFeedbackToRecommender(sessionId, slide);
    return {};
  }

  @Post('/result')
  @OpenAPI({
    summary: 'Called at the end of a session to review how the user went. ',
    description: 'Output of `Session` defined in api.ts',
  })
  public async result(@BodyParam('sessionId', { required: true }) sessionId: string): Promise<Session> {
    const session = await this.sessionRepository.getByIdWithSlides(sessionId);
    return toSession(session);
  }
}

export default AnnouncementController;
