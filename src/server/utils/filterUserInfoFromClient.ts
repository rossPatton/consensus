import _ from 'lodash';

// depending on user preferences
// lets strip out sensitive data before sending to the client
// things like the user's real name, email, location, etc
// on the client we will render things conditionally based on whats available
export const filterUserInfoFromClient = async (users: tUser[]) => {
  return await Promise.all(
    users.map(async user => {
      const userToReturn: Mutable = user;

      if (userToReturn.privateEmail) {
        userToReturn.email = '';
      } else if (userToReturn.privateName) {
        userToReturn.name = '';
      } else if (userToReturn.privateLocation) {
        userToReturn.city = '';
      } else if (userToReturn.privatePhone) {
        userToReturn.phone = '';
      }

      return userToReturn as tUser;
    }),
  );
};
