// This file specifies types used in the project.

export type Image = {
  id: string;
  url: string;
  seen: number;
  scariness: number;
  phobiaId: string;
};

export type Phobia = {
  id: string;
  description: string;
};

export type Session = {
  id: string;
  fearMin: number;
  fearMax: number;
  phobiaId: string;
  slidesLen: number;
  slides: Slide[];
};

export type Slide = {
  id: string;
  scariness: number;
  order: number;
  imageId: string;
  sessionId: string;
};