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

  const result = await Card.create({
    ...req.body,
    column: columnId,
    board: column.board,
    owner,
  });

  if (!result) {
    throw HttpError({ ...errorStatus.BAD_DATA });
  }

  const { _id, title, description, priority, deadline } = result;

  await column.updateOne({ $push: { cards: result._id } });

  res
    .status(successStatus.CREATED_CARD.status)
    .json({
      ...successStatus.CREATED_CARD,
      data: {
        _id,
        title,
        description,
        priority,
        deadline,
        column: result.column,
      },
    });
};
