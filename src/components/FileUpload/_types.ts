export type tProps = {
  // what type of file are we uploading
  fieldKey: string,
  // where in DO spaces to upload the file
  folder?: 'groups' | 'users',
  // the unique identifier for the image
  hash?: string,
  img?: string,
  // if we want to include additional info about uploading the image to the user, like size
  info?: string,
  // shorthand code that includes group or user id and image type
  prefix?: string,
  // header text for the section
  title?: string,
  // just used here for rendering the preview
  width?: string,
}

export type tContainerProps = tProps & {
  featuredImage: ts.thunk<string>,
  postFeaturedImageDispatch: (query: ts.spacesQuery) => void,
}

export type tComponentProps = tProps & {
  removeImage: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  setImage: (ev: React.ChangeEvent<HTMLInputElement>) => void,
};
