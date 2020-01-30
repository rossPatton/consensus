import _ from 'lodash';

// depending on user preferences
// lets strip out sensitive data before sending to the client
// things like the user's real name, email, location, etc
// on the client we will render things conditionally based on whats available
export const filterUserInfoFromClient = async (users: tUser[]) => {
  return await Promise.all(
    users.map(async user => {
      const userToReturn = user;

      if (userToReturn.privateEmail) {
        // @ts-ignore
        userToReturn.email = '';
      } else if (userToReturn.privateName) {
        // @ts-ignore
        userToReturn.name = '';
      } else if (userToReturn.privateLocation) {
        // @ts-ignore
        userToReturn.city = '';
        // @ts-ignore
        userToReturn.country = '';
        // @ts-ignore
        userToReturn.region = '';
      } else if (userToReturn.privatePhone) {
        // @ts-ignore
        userToReturn.phone = '';
      }

      return userToReturn;
    }),
  );
};
