import _ from 'lodash';
import {Mutable} from 'utility-types';

// depending on user preferences
// lets strip out sensitive data before sending to the client, based on user prefs
// things like the user's email, location, etc
// on the client we will render things conditionally based on whats available
// certain things like passwords, phone numbers, always, are always stripped out
export const filterUserInfoFromClient = async (users: tUser[]) => {
  return await Promise.all(
    users.map(async user => {
      const userToReturn: Mutable<tUser> = user;

      if (userToReturn.privateEmail) {
        userToReturn.email = '';
      } else if (userToReturn.privateLocation) {
        userToReturn.city = '';
      }

      return userToReturn as tUser;
    }),
  );
};
