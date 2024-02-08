import { Card, Column } from '../../models/index.js';
import { successStatus, errorStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const changeColumn = async (req, res) => {
  const { id: _id } = req.params;
  const { columnId } = req.body;
  const { _id: owner } = req.user;

  const nextColumn = await Column.findOne({ _id: columnId, owner });

  if (!nextColumn) {
    throw HttpError({ ...errorStatus.BAD_DATA_CARD_MOVE });
  }

  const card = await Card.findOne({ _id, owner });
  const prevColumn = await Column.findOne({ _id: card.column, owner });
  const result = await Card.findOneAndUpdate(
    { _id, owner },
    { column: columnId }
  );

  if (!result) {
    throw HttpError({ ...errorStatus.BAD_DATA });
  }

  const { title, description, priority, deadline, column } = result;

  await prevColumn.updateOne({ $pull: { cards: _id } });
  await nextColumn.updateOne({ $push: { cards: _id } });

  res.json({
    ...successStatus.UPDATED_CARD_MOVE,
    data: {
      _id,
      title,
      description,
      priority,
      deadline,
      column,
      prevColumn: prevColumn._id,
    },
  });
};
