import { UserDocument } from '../user/user.schema';

export type TokenType = 'ACCESS' | 'REFRESH';

// Payload for an authenticated user's JWT
export interface UserJwtPayload {
  sub: string;
  username: string;
}

// Authentication result after user registration or user login
export interface AuthResult {
  user: UserDocument;
  accessToken: string;
  // Access token expiration date
  expiresAt: Date;
  refreshToken: string;
}
