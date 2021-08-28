// This file specifies types used in the project.

export type Image = {
  id: string;
  url: string;
  seen: number;
  scariness: number;
  phobia_id: string;
};

export type Phobia = {
  id: string;
  images: Image[];
};

export type Slide = {
  id: string;
  scariness: number;
  order: number;
  image_id: string;
  session_id: string;
};

export type Session = {
  id: string;
  fearMin: number;
  fearMax: number;
  slides: Slide[];
};

export type 