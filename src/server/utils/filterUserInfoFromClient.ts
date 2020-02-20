import _ from 'lodash';
import {Mutable} from 'utility-types';

// depending on user preferences
// lets strip out sensitive data before sending to the client, based on user prefs
// things like the user's email, location, etc
// on the client we will render things conditionally based on whats available
// certain things like passwords, phone numbers, always, are always stripped out
export const filterUserInfoFromClient = async (users: tUser[]) => {
  return Promise.all(
    users.map(async user => {
      const userToReturn: Mutable<tUser> = user;

      // rn now, email is the only optional thing we ask for that has a use
      // so, we want to let the user decide if they want to share their primary email
      if (userToReturn.privateEmail) {
        userToReturn.email = '';
      }

      return userToReturn as tUser;
    }),
  );
};
