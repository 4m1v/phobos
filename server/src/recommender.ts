import { createConnection, getCustomRepository } from "typeorm";
import ImageEntity from "./entities/ImageEntity";
import SessionEntity from "./entities/SessionEntity";
import SlideEntity from "./entities/SlideEntity";
import ImageRepository from "./repositories/ImageRepository";
import SessionRepository from "./repositories/SessionRepository";

const data: {
  sessionId: string;
  similarity: { similarity: number; features: number };
  slides: { imageId: string; scariness: number; order: number; adjustedScariness: number }[];
}[] = [
  // {
  //   sessionId: "haha",
  //   similarity: { similarity: 0, features: 0 },
  //   slides: [
  //     { imageId: "0", scariness: 3.2, order: 5, adjustedScariness: 3.2 },
  //     { imageId: "1", scariness: 1, order: 12, adjustedScariness: 1 },
  //     { imageId: "2", scariness: 5, order: 2, adjustedScariness: 5 },
  //   ],
  // },
  // {
  //   sessionId: "lmao",
  //   similarity: { similarity: 0, features: 0 },
  //   slides: [
  //     { imageId: "0", scariness: 1.6, order: 3, adjustedScariness: 1.6 },
  //     { imageId: "1", scariness: 3, order: 5, adjustedScariness: 3 },
  //     { imageId: "2", scariness: 2, order: 1, adjustedScariness: 2 },
  //   ],
  // },
  // {
  //   sessionId: "rofl",
  //   similarity: { similarity: 0, features: 0 },
  //   slides: [
  //     { imageId: "0", scariness: 4.1, order: 2, adjustedScariness: 4.1 },
  //     { imageId: "1", scariness: 2.2, order: 1, adjustedScariness: 2.2 },
  //     { imageId: "2", scariness: 3.8, order: 3, adjustedScariness: 3.8 },
  //   ],
  // },
];

interface CurrentSession {
  id: string;
  fearMin: number;
  fearMax: number;
  phobiaId: string;
  slides: { imageId: string; scariness: number; order: number; adjustedScariness: number }[];
  predictedRatings: { imageId: string; scariness: number }[];
}

let currentSession: CurrentSession = {
  id: "really",
  fearMin: 3,
  fearMax: 4.5,
  phobiaId: "hi",
  slides: [
    { imageId: "0", scariness: 3.2, order: 5, adjustedScariness: 3.2 },
    { imageId: "1", scariness: 2.2, order: 1, adjustedScariness: 2.2 },
  ],
  predictedRatings: [],
};

const imageList: string[] = [
  // "0", "1", "2"
  ];

export const initRecommender = async (session: SessionEntity): Promise<void> => {
  currentSession = {
    id: session.id,
    fearMin: session.fearMin,
    fearMax: session.fearMax,
    phobiaId: session.phobiaId,
    slides: [],
    predictedRatings: [],
  };

  const connection = await createConnection({
    type: "sqlite",
    database: process.env.DB,
    entities: [__dirname + "../../entities/*.ts"],
  });
  await connection.synchronize();

  const imageRepository = getCustomRepository(ImageRepository);
  const sessionRepository = getCustomRepository(SessionRepository);

  for (const img of await imageRepository.findByPhobiaId(session.phobiaId)) {
    imageList.push(img.id);
  }

  const sessions = await sessionRepository.findByPhobiaId(session.phobiaId);
  sessions.forEach((element) => {
    const result: { imageId: string; scariness: number; order: number; adjustedScariness: number }[] = [];
    element.slides.forEach((slide) => {
      result.push({
        imageId: slide.imageId,
        scariness: slide.scariness,
        order: slide.order,
        adjustedScariness: slide.scariness,
      });
    });

    data.push({ sessionId: element.id, similarity: { similarity: 0, features: 0 }, slides: result });
  });
};

export const recalculatePredictedRatings = (): any => {
  const viewed: { [x: string]: number } = {};
  let currentSeshMod = 0;

  // Get what images the current session has viewed, represented in a different way.
  currentSession.slides.forEach((slide: any) => {
    viewed[slide.imageId] = slide.scariness;
    currentSeshMod += slide.scariness * slide.scariness;
  });
  currentSeshMod = Math.sqrt(currentSeshMod);

  // Calculate similarity between users
  data.forEach((session) => {
    let similarity = 0;
    let features = 0;
    let sessionMod = 0;

    session.slides.forEach((slide) => {
      if (viewed[slide.imageId] !== undefined) {
        similarity += slide.scariness * viewed[slide.imageId];
        sessionMod += slide.scariness * slide.scariness;
        features++;
      }
      console.log({ scariness: slide.scariness, imageId: viewed[slide.imageId] });
    });

    sessionMod = Math.sqrt(sessionMod);
    if (sessionMod * currentSeshMod !== 0) {
      similarity /= sessionMod * currentSeshMod;
    } else {
      similarity = 0;
    }

    session.similarity = { similarity: similarity, features: features };
  });

  // Just some intialisation
  const predictions: { [imageId: string]: { predictionSum: number; totalSimilarity: number } } = {};
  imageList.forEach((element) => {
    predictions[element] = { predictionSum: 0, totalSimilarity: 0 };
  });

  // Calculating predicted ratings for all images
  data.forEach((session) => {
    session.slides.forEach((slide) => {
      if (viewed[slide.imageId] === undefined) {
        predictions[slide.imageId].predictionSum += slide.scariness * session.similarity.similarity;
        predictions[slide.imageId].totalSimilarity += session.similarity.similarity;
      }
    });
  });

  // Storing calculated predictions into the currentSession
  for (const key in predictions) {
    if (predictions[key].totalSimilarity !== 0) {
      currentSession.predictedRatings.push({
        imageId: key,
        scariness: predictions[key].predictionSum / predictions[key].totalSimilarity,
      });
    }
  }

  return currentSession.predictedRatings;
};

export const getNextImage = async (sessionId: string): Promise<string> => {
  const imageRepository = await createConnection({
    type: "sqlite",
    database: process.env.DB,
    entities: [__dirname + "../../entities/*.ts"],
  }).then(async (connection) => {
    await connection.synchronize();

    return getCustomRepository(ImageRepository);
  });

  if (currentSession.slides.length < Number.POSITIVE_INFINITY) {
    // Give them a random easy image.
    const images: ImageEntity[] = await imageRepository.findInScarinessRangeAndPhobiaId(
      currentSession.fearMin - 0.5,
      currentSession.fearMin + 0.5,
      currentSession.phobiaId
    );
    const index = Math.floor(Math.random() * images.length);
    return images[index].id;
  }

  // Pattern match, and recalculate predicted ratings
  // recalculatePredictedRatings();

  // Choose top 1
  currentSession.predictedRatings.sort((a: any, b: any) => b.scariness - a.scariness);
  const image = currentSession.predictedRatings[0];

  // Return it
  return image.imageId;
};

export const addFeedbackToRecommender = (sessionId: string, slide: SlideEntity): void => {
  currentSession.slides.push({
    imageId: slide.imageId,
    scariness: slide.scariness,
    order: slide.order,
    adjustedScariness: slide.scariness,
  });
};
