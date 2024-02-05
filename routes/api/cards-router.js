import express from 'express';

import { cardsPath } from '../../const/index.js';
import {
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody,
} from '../../middlewares/index.js';
import {
  cardGetAllSchema,
  cardAddSchema,
  cardUpdateSchema,
  cardChangePrioritySchema,
  cardSetDeadlineSchema,
} from '../../schemas/Card/schemaJoiCard.js';

import cardsController from '../../controllers/cards/index.js';

// ============================================================

const cardsRouter = express.Router();

cardsRouter.use(authenticate);

cardsRouter.get(
  cardsPath.BASE,
  isEmptyBody,
  validateBody(cardGetAllSchema),
  cardsController.getAllCards
);

cardsRouter.get(cardsPath.ID, isValidId, cardsController.getCardById);

cardsRouter.post(
  cardsPath.BASE,
  isEmptyBody,
  validateBody(cardAddSchema),
  cardsController.addCard
);

cardsRouter.put(
  cardsPath.ID,
  isValidId,
  isEmptyBody,
  validateBody(cardUpdateSchema),
  cardsController.updateCard
);

cardsRouter.patch(
  cardsPath.PRIORITY,
  isValidId,
  isEmptyBody,
  validateBody(cardChangePrioritySchema),
  cardsController.updateCard
);

cardsRouter.patch(
  cardsPath.DEADLINE,
  isValidId,
  isEmptyBody,
  validateBody(cardSetDeadlineSchema),
  cardsController.updateCard
);

cardsRouter.delete(cardsPath.ID, isValidId, cardsController.deleteCard);

export default cardsRouter;
