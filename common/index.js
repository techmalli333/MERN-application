const commonResponse = ({
  res,
  success = false,
  message = "",
  data = null,
  token,
}) => {
  if (success) {
    res.send({ success, message, data, token });
  } else {
    res.send({ success, message, data });
  }
};

module.exports = {
  commonResponse,
};
