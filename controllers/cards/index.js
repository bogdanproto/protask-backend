import { getAllCards } from './getAllCard.js';
import { getCardById } from './getCardById.js';
import { addCard } from './addCard.js';
import { updateCard } from './updateCard.js';
import { deleteCard } from './deleteCard.js';

import { ctrlWrapper } from '../../decorators/index.js';

export default {
  getAllCards: ctrlWrapper(getAllCards),
  getCardById: ctrlWrapper(getCardById),
  addCard: ctrlWrapper(addCard),
  updateCard: ctrlWrapper(updateCard),
  deleteCard: ctrlWrapper(deleteCard),
};
