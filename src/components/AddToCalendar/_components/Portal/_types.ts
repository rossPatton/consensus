type onRequestClose = React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  | React.KeyboardEvent<HTMLDivElement>;

export type tProps = {
  children: React.ReactNode[],
  isOpen: boolean,
  onRequestClose: (event: onRequestClose) => void,
};
