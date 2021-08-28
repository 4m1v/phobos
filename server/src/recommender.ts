import { Session, Slide, Image } from "../../src/api";

let data = [
  {
    sessionId: "haha",
    slides: [
      { imageId: "0", scariness: 3.2, order: 5 },
      { imageId: "1", scariness: 1, order: 12 },
      { imageId: "2", scariness: 5, order: 2 },
    ],
  },
  {
    sessionId: "lmao",
    slides: [
      { imageId: "0", scariness: 1.6, order: 3 },
      { imageId: "1", scariness: 3, order: 5 },
      { imageId: "2", scariness: 2, order: 1 },
    ],
  },
  {
    sessionId: "rofl",
    slides: [
      { imageId: "0", scariness: 4.1, order: 2 },
      { imageId: "1", scariness: 2.2, order: 1 },
      { imageId: "2", scariness: 3.8, order: 3 },
    ],
  },
];

interface CurrentSession extends Session {
  predictedRatings: Slide[];
}

let currentSession: CurrentSession = {
  id: "really",
  fearMin: 3,
  fearMax: 4.5,
  slides: [],
  predictedRatings: [],
};

const recalculatePredictedRatings = (): void => {};

const getNextImage = () => {
  if (currentSession.slides.length < 5) {
    // Give them a random easy image.
    const images: Image[] = getImagesInRange(
      currentSession.fearMin - 0.5,
      currentSession.fearMin + 0.5
    );
    const index = Math.floor(Math.random() * images.length);
    return images[index].id;
  }

  // Pattern match, and recalculate predicted ratings
  recalculatePredictedRatings();

  // Choose top 1
  currentSession.predictedRatings.sort((a, b) => b.scariness - a.scariness);
  const image = currentSession.predictedRatings[0];

  // Return it
  return image.id;
};

const addFeedbackToSystem = (slide: Slide) => {
  currentSession.slides.push(slide);
};
