export const Emoji = (props: { className?: string, emoji: string, label: string }) => (
  <small
    role="img"
    className={props.className || ''}
    aria-label={props.label}>
    {props.emoji}
  </small>
);
