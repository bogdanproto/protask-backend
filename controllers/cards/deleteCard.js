import { Card, Column } from '../../models/index.js';
import { errorStatus, successStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const deleteCard = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const card = await Card.findOne({ _id, owner });

  if (!card) {
    throw HttpError(errorStatus.NOT_FOUND_CARD);
  }
  const column = await Column.findOne({ _id: card.column, owner });
  const { title } = card;

  await card.deleteOne();
  await column.updateOne({ $pull: { cards: card._id } });

  res.json({
    ...successStatus.DELETED_CARD,
    data: { _id, title, column: column._id },
  });
};
