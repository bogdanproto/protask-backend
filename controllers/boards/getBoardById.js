import { Board } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import { errorStatus, successStatus } from '../../const/index.js';

// ============================================================

export const getBoardById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Board.findOne(
    { _id, owner },
    '-createdAt -updatedAt -owner'
  ).populate([
    {
      path: 'backgroundImg',
      select: 'desktopCloudURL tabletCloudURL mobileCloudURL',
    },
    {
      path: 'columns',
      select: '_id title',
      populate: {
        path: 'cards',
        select: '_id title description priority deadline',
      },
    },
  ]);

  if (!result) {
    throw HttpError(errorStatus.NOT_FOUND_BOARD);
  }

  res.json({ ...successStatus.GET, data: result });
};
