import joi from 'joi';

export const singUpSchema = joi.object({
  body: joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
});

export const singInSchema = joi.object({
  body: joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
});
