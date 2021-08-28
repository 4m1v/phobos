import fs from 'fs';
import { createConnection, getCustomRepository } from 'typeorm';
import PhobiaRepository from '../repositories/PhobiaRepository';
import ImageRepository from '../repositories/ImageRepository';
import SlideRepository from '../repositories/SlideRepository';
import SessionRepository from '../repositories/SessionRepository';

// The server runs on sqlite.
// A different DBMS can be used by changing the configuration below.
// This reads data from 'data.json';
createConnection({
  type: 'sqlite',
  database: process.env.DB,
  entities: [__dirname + '../../entities/*.ts'],
}).then(async (connection) => {
  await connection.query('PRAGMA foreign_keys=OFF');
  await connection.synchronize();

  const rawData = fs.readFileSync(__dirname + '/data.json');
  const data = JSON.parse(rawData.toString());

  const phobiaRepository = getCustomRepository(PhobiaRepository);
  await Promise.all(
    data.phobias.map((phobia: { id: string; description: string }) => {
      phobiaRepository.createPhobia(phobia.id, phobia.description);
    }),
  );

  const imageRepository = getCustomRepository(ImageRepository);
  await Promise.all(
    data.images.map((image: { url: string; scariness: number; phobiaId: string }) => {
      imageRepository.createImage(image.url, image.scariness, image.phobiaId);
    }),
  );

  const sessionRepository = getCustomRepository(SessionRepository);
  const slideRepository = getCustomRepository(SlideRepository);
  const session = await sessionRepository.createSession(
    data.session.fearMin,
    data.session.fearMax,
    data.session.phobiaId,
  );
  const allImages = await imageRepository.findByPhobiaId(session.phobiaId);
  const slidePromises = allImages.map((image, order) => {
    slideRepository.createSlide(order, image.scariness, image.id, session.id);
  });
  await Promise.all(slidePromises);
});
