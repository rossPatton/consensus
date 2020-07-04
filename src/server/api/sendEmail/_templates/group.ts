export const group = (content: string, group: ts.group): string => {
  return `
    <div>
      <h1>${group.name}</h1>
    </div>
    ${content}
  `;
};

