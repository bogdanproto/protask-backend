import express from 'express';

import { cardsPath } from '../../const/index.js';
import {
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody,
} from '../../middlewares/index.js';
import {
  cardAddSchema,
  cardUpdateSchema,
  cardChangeColumnSchema,
} from '../../schemas/Card/schemaJoiCard.js';

import cardsController from '../../controllers/cards/index.js';

// ============================================================

const cardsRouter = express.Router();

cardsRouter.use(authenticate);

cardsRouter.get(cardsPath.BASE, cardsController.getAllCards);

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
  cardsPath.CHANGE_COLUMN,
  isValidId,
  isEmptyBody,
  validateBody(cardChangeColumnSchema),
  cardsController.changeColumn
);

cardsRouter.delete(cardsPath.ID, isValidId, cardsController.deleteCard);

export default cardsRouter;
