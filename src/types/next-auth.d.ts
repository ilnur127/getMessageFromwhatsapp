/* eslint-disable */
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { User } from '@prisma/client';

export type IUserData = {
  createdAt?: Date | null | undefined;
  email?: string | null | undefined;
  managementId?: number | null | undefined;
  name?: string | null | undefined;
  patronymic?: string | null | undefined;
  permissions: Record<string, unknown>[];
  photoUrl?: string | null | undefined;
  positionId?: number | null | undefined;
  sectorId?: number | null | undefined;
  surname?: string | null | undefined;
  fileStorageUrl?: string | null | undefined;
  userId: number;
} & Record<string, unknown>;

/** Extend the built-in session types */
declare module 'next-auth' {
  interface Session {
    accessToken?: string | null | undefined;
    idToken?: string | null | undefined;
    userData?: IUserData | null | undefined;
  }
  interface User {
    accessToken?: string | null | undefined;
    idToken?: string | null | undefined;
    userData?: IUserData | null | undefined;
  }
}

/** Extend the built-in types for JWT */
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string | null | undefined;
    idToken?: string | null | undefined;
    userData?: IUserData | null | undefined;
  }
}
