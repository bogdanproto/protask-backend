import { User, Board } from '../../models/index.js';
import { successStatus } from '../../const/index.js';

// ============================================================

export const addBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.create({ ...req.body, owner });
  const { _id, title, icon, backgroundImg } = result;

  await User.findByIdAndUpdate(
    { _id: owner },
    { $push: { boards: result._id } }
  );

  res.json({
    ...successStatus.CREATED_BOARD,
    data: {
      _id,
      title,
      icon,
      backgroundImg,
    },
  });
};
