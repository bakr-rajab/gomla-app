const Joi = require("joi");


const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required()
    .email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.string().min(6).required()
      .email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  };

  const productValidation = (data) => {
    // console.log(data)
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      price: Joi.number().required(),
      category: Joi.string(),
      image: Joi.string().required(),
      brand: Joi.string(),
      rating: Joi.number(),
      reviews: Joi.number(),
      description: Joi.string(),
    });
    
    return schema.validate(data);
  }

  const categoryValidation = (data) => {
    // console.log(data)
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      color: Joi.string(),
      icon: Joi.string(),
      image: Joi.string(),
    });
  return schema.validate(data);
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.productValidation= productValidation;
module.exports.categoryValidation = categoryValidation;