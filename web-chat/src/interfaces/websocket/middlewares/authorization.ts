import { verify } from 'jsonwebtoken';
import { SocketWebChat } from '../../../types/interface';
import jwtConfig from '../../../utils/jwt';

type DecodedJwt = {
  id: string,
  username: string,
  iat: number,
  exp: number,
};

export default async (socket: SocketWebChat, next: any): Promise<any> => {
  const authToken = socket.handshake && socket.handshake.auth && socket.handshake.auth.token;

  if (!authToken) {
    throw new Error('Token was not informed');
  }

  try {
    const decoded = verify(authToken, jwtConfig.secret) as DecodedJwt;

    socket.userId = decoded.id;
    socket.username = decoded.username;

    next();
  } catch (error) {
    next(error);
  }
};
