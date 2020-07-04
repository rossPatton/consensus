// import {spacesUrl} from '~app/constants';

export const group = (content: string, group: ts.group): string => {
  return `
    <div>
      <div>
        ${content}
      </div>
      <div style="
        padding: 24px;
        border: 1px solid #efefef;
        border-radius: 8px;
        background: #f6f6f6;">
        <h1 style="line-height: 1.2;">
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

