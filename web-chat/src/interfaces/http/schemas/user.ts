import joi from 'joi';

export const singUpSchema = joi.object({
  body: joi.object({
    username: joi.string().required(),
    password: joi.string().required().min(6),
  }),
});

export const singInSchema = joi.object({
  body: joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
});
