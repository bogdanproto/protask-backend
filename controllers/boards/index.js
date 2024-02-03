import { getAllBoards } from './getAllBoards.js';
import { getBoardById } from './getBoardById.js';
import { addBoard } from './addBoard.js';
import { updateBoard } from './updateBoard.js';
import { deleteBoard } from './deleteBoard.js';

import { ctrlWrapper } from '../../decorators/index.js';

export default {
  getAllBoards: ctrlWrapper(getAllBoards),
  getBoardById: ctrlWrapper(getBoardById),
  addBoard: ctrlWrapper(addBoard),
  updateBoard: ctrlWrapper(updateBoard),
  deleteBoard: ctrlWrapper(deleteBoard),
};
