import { Board } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const updateBoard = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Board.findOneAndUpdate({ _id, owner }, req.body);

  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_BOARD);
  }

  const { title, icon, backgroundImg } = result;

  res.json({
    ...successStatus.UPDATED_BOARD,
    data: { _id, title, icon, backgroundImg },
  });
};
