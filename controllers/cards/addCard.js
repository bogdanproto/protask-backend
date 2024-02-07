import { Card, Column } from '../../models/index.js';
import { successStatus, errorStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const addCard = async (req, res) => {
  const { columnId } = req.body;
  const { _id: owner } = req.user;

  const column = await Column.findOne({ _id: columnId, owner });

  if (!column) {
    throw HttpError({ ...errorStatus.BAD_DATA_COLUMNID });
  }

  const board = column.board;

  const result = await Card.create({
    ...req.body,
    column: columnId,
    board,
    owner,
  });

  if (!result) {
    throw HttpError({ ...errorStatus.BAD_DATA });
  }

  await column.updateOne({ $push: { cards: result._id } });

  res.json({ ...successStatus.CREATED_CARD, data: result });
};
