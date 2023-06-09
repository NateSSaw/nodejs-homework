const Joi = require("joi");

const validateMessages = (field) => {
  return {
    "string.base": `${field} should be a type of 'text'`,
    "string.empty": `${field} cannot be an empty field`,
    "any.required": `missing required ${field} field`,
  };
};

const addSchema = Joi.object({
  name: Joi.string().required().messages(validateMessages("name")),
  email: Joi.string().required().messages(validateMessages("email")),
  phone: Joi.number().required().messages(validateMessages("phone")),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages(validateMessages("favorite")),
});

module.exports = { addSchema, updateFavoriteSchema };
