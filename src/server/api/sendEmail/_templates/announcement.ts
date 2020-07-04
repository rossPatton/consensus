export const announcement = (content: string, meeting: ts.meeting): string => {
  return `
    <div>
      <h1>${meeting.title}</h1>
    </div>
    ${content}
  `;
};

