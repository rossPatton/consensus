// digitalocean's spaces api is designed to be the same as s3 basically
// so we use the s3 sdk, but we aren't using s3 or amazon
import AWS from 'aws-sdk';

const groupsEndpoint: unknown = new AWS.Endpoint('nyc3.digitaloceanspaces.com/groups');
export const groupsS3 = new AWS.S3({
  endpoint: groupsEndpoint as string,
  accessKeyId: __SPACES_KEY__,
  secretAccessKey: __SPACES_SECRET__,
});

const usersEndpoint: unknown = new AWS.Endpoint('nyc3.digitaloceanspaces.com/users');
export const usersS3 = new AWS.S3({
  endpoint: usersEndpoint as string,
  accessKeyId: __SPACES_KEY__,
  secretAccessKey: __SPACES_SECRET__,
});

export const uploadDefaults = {
  Bucket: 'consensus',
  ACL: 'public-read',
};
