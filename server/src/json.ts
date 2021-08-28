import ImageEntity from './entities/ImageEntity';
import PhobiaEntity from './entities/PhobiaEntity';
import SessionEntity from './entities/SessionEntity';
import SlideEntity from './entities/SlideEntity';

import type { Image, Phobia, Session, Slide } from '../../src/api';

/**
 * This contains all functions to convert entity objects to output types in JSON form.
 * The outout types are defined in `../../src/api.ts`.
 */

export const toImage = (entity: ImageEntity): Image => {
  return {
    id: entity.id,
    url: entity.url,
    seen: entity.seen,
    scariness: entity.scariness,
    phobiaId: entity.phobiaId,
  };
};

export const toPhobias = (entities: PhobiaEntity[]): Phobia[] => {
  return entities.map((entity) => {
    return {
      id: entity.id,
      description: entity.description,
    };
  });
};

const toSlide = (entity: SlideEntity): Slide => {
  return {
    id: entity.id,
    order: entity.order,
    scariness: entity.scariness,
    imageId: entity.imageId,
    sessionId: entity.sessionId,
  };
};

export const toSession = (entity: SessionEntity): Session => {
  return {
    id: entity.id,
    fearMin: entity.fearMin,
    fearMax: entity.fearMax,
    phobiaId: entity.phobiaId,
    slidesLen: entity.slidesLen,
    slides: entity.slides.map((slide) => toSlide(slide)),
  };
};
