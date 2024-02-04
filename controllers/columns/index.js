import { getAllColumns } from './getAllColumns.js';
import { getColumnById } from './getColumnById.js';
import { addColumn } from './addColumn.js';
import { updateColumn } from './updateColumn.js';
import { deleteColumn } from './deleteColumn.js';

import { ctrlWrapper } from '../../decorators/index.js';

export default {
  getAllColumns: ctrlWrapper(getAllColumns),
  getColumnById: ctrlWrapper(getColumnById),
  addColumn: ctrlWrapper(addColumn),
  updateColumn: ctrlWrapper(updateColumn),
  deleteColumn: ctrlWrapper(deleteColumn),
};
