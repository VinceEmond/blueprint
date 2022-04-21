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
    return user.id === Number(ownerId);
  });
  const filteredUserName = filteredUser[0].first_name;

  return filteredUserName;
}

/* Gets project name from project id */
export function getProjectName(projectId, projects) {
  const filteredProject = projects.filter((project) => {
    return project.id === Number(projectId);
  });
  const filteredProjectName = filteredProject[0].name;

  return filteredProjectName;
}

/* Gets all tasks assigned to a specific userID */
export function getUserSpecificTasks(allTasks, user_id) {
  if (!allTasks) {
    return;
  }

  return allTasks.filter((task) => {
    return task.assignee_id === user_id;
  });
}

/* Gets all projects where user is assigned to a task */
export function getUserSpecificProjects(allProjects, userTasks, user_id) {
  if (!allProjects || !userTasks) {
    return;
  }

  return allProjects.filter((project) => {
    for (const task of userTasks) {
      if (task.project_id === project.id || project.owner_id === user_id) {
        return project;
      }
    }
  });
}

/* Updates user project status */
export function updateUserProjectStatus(
  userProjects,
  project_id,
  checkBoxBool
) {
  let newStatus = "";

  if (checkBoxBool === true) {
    newStatus = "Complete";
  } else {
    newStatus = "Not Started";
  }

  const updateState = userProjects.map((project) => {
    if (project.id === project_id) {
      project.status = newStatus;
    }
    // console.log("PROJECT: ", project);
    return project;
  });
  return updateState;

  // const filteredProject = filteredState[0];
  // console.log("FILTEREDPROJ ", filteredProject);
  // return filteredProject;
}

/* Updates user task status */
export function updateUserTaskStatus(userTasks, task_id, checkBoxBool) {
  let newStatus = "";

  if (checkBoxBool === true) {
    newStatus = "Complete";
  } else {
    newStatus = "Not Started";
  }

  const updateState = userTasks.map((task) => {
    if (task.id === task_id) {
      task.status = newStatus;
    }
    // console.log("PROJECT: ", project);
    return task;
  });
  return updateState;

  // const filteredProject = filteredState[0];
  // console.log("FILTEREDPROJ ", filteredProject);
  // return filteredProject;
}
