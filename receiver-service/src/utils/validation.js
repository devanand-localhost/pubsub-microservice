const Joi = require("joi");

const userSchema = Joi.object({
  user: Joi.string().required(),
  class: Joi.string().required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required(),
});

const validateUser = (data) => {
  return userSchema.validate(data);
};

module.exports = {
  validateUser,
};
