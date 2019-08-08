type tReturnValue = tRole | null;
export const getUserRole = (session: tSession, org: tOrg): tReturnValue => {
  if (!session.isAuthenticated) return null;
  if (!session.roles) return null;

  const roleIndex = session.roles.findIndex(role => role.orgId === org.id);
  const role = roleIndex > -1 ? session.roles[roleIndex].role : null;

  if (role) return role;
  return null;
};
