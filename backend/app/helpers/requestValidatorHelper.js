const { Validator } = require("node-input-validator");

validate = async (input, validation) => {
  const V = new Validator(input, validation);
  const Valid = await V.check();
  return { V, Valid };
};

module.exports = {
  validate
};
