import { sendEmail }  from '../../helpers/index.js';

const { SUPPORT_SERVICE } = process.env;

const needHelp = async (req, res) => {
    const { email, comment } = req.body;

    const data = {
      from: email,
      to:  SUPPORT_SERVICE,
      subject: 'Help Request',
      html: comment,
    };
    await sendEmail(data);

  res.json({
    message: "Your comment has been sent",
  });
}

export default needHelp;
