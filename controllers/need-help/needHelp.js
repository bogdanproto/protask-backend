import { sendEmail, HttpError }  from '../../helpers/index.js';

const { SUPPORT_SERVICE} = process.env;

export const needHelp = async (req, res) => {
    const { email, text } = req.body;
    if (!email || !text) {
        throw HttpError(404, "Please provide email and text");
      }

      const data = {
        from: email,
        to: SUPPORT_SERVICE
        subject: 'Help Request',
        text: text,
      };
      await sendEmail(data);

  res.json({
    message: "Your comment has been sent",
  });
}

