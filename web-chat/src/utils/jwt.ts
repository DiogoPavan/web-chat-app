import env from './env';

type JwtConfig = {
  secret: string,
  expiresIn: string,
};

export default {
  secret: env.authSecret,
  expiresIn: '1d',
} as JwtConfig;
