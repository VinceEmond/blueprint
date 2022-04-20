/* Gets specific user */
export function getUserName(users, id) {
  const filteredUser = users.filter((user) => {
    return user.id === id;
  });

  const user = filteredUser[0];

  return user;
}

/* Gets specific user name from project owner id */
export function getProjectOwnerName(ownerId, users) {
  const filteredUser = users.filter((user) => {
    return user.id === ownerId;
  });
  const filteredUserName = filteredUser[0].first_name;

  return filteredUserName;
}

/* Gets project name from project id */
export function getProjectName(projectId, projects) {
  const filteredProject = projects.filter((project) => {
    return project.id === projectId;
  });
  const filteredProjectName = filteredProject[0].name;

  return filteredProjectName;
}
