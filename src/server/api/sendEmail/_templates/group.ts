import {spacesUrl} from '~app/constants';

export const group = (content: string, group: ts.group): string => {
  const parsedAv = parseInt(group.avatar, 10);
  const isDefaultAv = !isNaN(parsedAv);
  const avatar = isDefaultAv
    ? ''
    : `<img
      alt=""
      src="${spacesUrl}/groups/${group.avatar}"
      style="margin-right: 8px;"
      width="50"
    />`;

  return `
    <div>
      <div style="margin-bottom: 24px;">
        ${content}
      </div>
      <div style="
        padding: 24px;
        border: 1px solid #efefef;
        border-radius: 8px;
        background: #f6f6f6;">
        <h1 style="display: flex;align-items: center;line-height: 1.2;">
          ${avatar}
          <a
            style="color: #000;"
            href="https://consens.us.org/group/${group.handle}">
            ${group.name}
          </a>
        </h1>
        <p style="font-size: 16px;line-height:1.5;">
          ${group.description}
        </p>
      </div>
    </div>
  `;
};

