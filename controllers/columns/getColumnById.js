import { Column } from '../../models/index.js';
import { errorStatus, successStatus } from '../../const/index.js';
import { HttpError } from '../../helpers/index.js';

// ============================================================

export const getColumnById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Column.findOne(
    { _id, owner },
    '-createdAt -updatedAt -board -owner'
  );

  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_COLUMN);
  }

  res.json({ ...successStatus.GET, data: result });
};
