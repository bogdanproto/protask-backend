import Board from '../../models/Board.js';
import { successStatus } from '../../const/index.js';

// ============================================================

export const getAllBoards = async (req, res) => {
  const result = await Board.find({}, '-createdAt -updatedAt');

  return res.json({ ...successStatus.GET, data: [...result] });
};

// // // ============================================================

// const getAllBoards = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 20, favorite } = req.query;
//   const skip = (page - 1) * limit;
//   const filterParams = favorite ? { owner, favorite } : { owner };
//   const result = await Board.find(filterParams, '', { skip, limit }).populate(
//     'owner',
//     'email'
//   );

//   res.json(result);
// };

// ============================================================
// ============================================================
