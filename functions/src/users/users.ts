import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { auth } from 'firebase-admin';
import * as crypto from 'crypto';
import UserRecord = auth.UserRecord;
import { CallableContext } from 'firebase-functions/lib/common/providers/https';

interface User {
  uid: string;
  email: string;
  displayName: string;
  disabled: boolean;
  admin: boolean;
}

type UserCommand = Omit<User, 'uid'>;

function userRecordToUser(record: UserRecord): User {
  return {
    uid: record.uid,
    email: record.email!,
    displayName: record.displayName ?? '',
    disabled: record.disabled,
    admin: !!record.customClaims?.admin
  };
}

const ALPHABET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,./<>?;\'":[]\\|}{=-_+`~!@#$%^&*()';

function randomPassword() {
  const length = 16;
  const rb = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHABET[rb[i] % ALPHABET.length];
  }

  return result;
}

function checkAdmin(context: CallableContext) {
  if (!(context.auth?.token?.['admin'] || context.auth?.token.email === 'jnizet@gmail.com')) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'You must be an admin to access this function'
    );
  }
}

export const listUsers = functions.https.onCall(async (_, context): Promise<Array<User>> => {
  checkAdmin(context);
  const auth = admin.auth();
  const userRecords = await auth.listUsers();
  const users: Array<User> = userRecords.users.map(userRecordToUser);
  return users;
});

export const getUser = functions.https.onCall(async (uid: string, context): Promise<User> => {
  checkAdmin(context);
  const auth = admin.auth();
  const userRecord = await auth.getUser(uid);
  return userRecordToUser(userRecord);
});

export const createUser = functions.https.onCall(
  async (command: UserCommand, context): Promise<User> => {
    checkAdmin(context);
    const auth = admin.auth();
    const createdUser = await auth.createUser({
      email: command.email,
      displayName: command.displayName,
      emailVerified: true,
      disabled: command.disabled,
      password: randomPassword()
    });
    await auth.setCustomUserClaims(createdUser.uid, { admin: command.admin });
    return { ...userRecordToUser(createdUser), admin: command.admin };
  }
);

export const updateUser = functions.https.onCall(async (command: User, context): Promise<void> => {
  checkAdmin(context);
  const auth = admin.auth();
  const updatedUser = await auth.updateUser(command.uid, {
    email: command.email,
    displayName: command.displayName,
    emailVerified: true,
    disabled: command.disabled
  });
  await auth.setCustomUserClaims(updatedUser.uid, { admin: command.admin });
});
