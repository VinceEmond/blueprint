/* Gets specific user object from user id */
export function getUserName(allUsers, userId) {
  const filteredUser = allUsers.filter((user) => {
    return user.id === userId;
  });

  const user = filteredUser[0];

  return user;
}

/* Gets specific user name from project owner id */
export function getProjectOwnerName(ownerId, allUsers) {
  const filteredUser = allUsers.filter((user) => {
    return user.id === Number(ownerId);
  });

  if (!filteredUser[0]) {
    return "";
  }

  const filteredUserName = filteredUser[0].first_name;

  return filteredUserName;
}

/* Gets specific user name from task assignee_id */
export function getAssigneeName(assigneeId, allUsers) {
  const filteredUser = allUsers.filter((user) => {
    return user.id == assigneeId;
  });

  if (!filteredUser[0]) {
    return "";
  }

  const filteredUserName = filteredUser[0].first_name;
  return filteredUserName;
}

/* Gets project name from project id */
export function getProjectName(projectId, projects) {
  const filteredProject = projects.filter((project) => {
    return project.id === Number(projectId);
  });

  if (!filteredProject[0]) {
    return "";
  }

  const filteredProjectName = filteredProject[0].name;

  return filteredProjectName;
}

/* Gets all tasks for a specific user id */
export function getUserSpecificTasks(allTasks, userId) {
  if (!allTasks) {
    return;
  }

  return allTasks.filter((task) => {
    return task.assignee_id === userId;
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

  /* Generates all projects with a specific project updated */
  const updateState = userProjects.map((project) => {
    if (project.id === project_id) {
      project.status = newStatus;
    }
    return project;
  });
  return updateState;
}

/* Updates user task status */
export function updateUserTaskStatus(userTasks, task_id, checkBoxBool) {
  let newStatus = "";

  if (checkBoxBool === true) {
    newStatus = "Complete";
  } else {
    newStatus = "Not Started";
  }

  /* Generates all tasks with a specific task updated */
  const updateState = userTasks.map((task) => {
    if (task.id === task_id) {
      task.status = newStatus;
    }
    return task;
  });
  return updateState;
}
/* Generates all projects with a specific project updated */
export function updateProjects(allProjects, newProject) {
  const updatedProjects = [];
  allProjects.forEach((project) => {
    if (project.id === newProject.id) {
      updatedProjects.push(newProject);
    } else {
      updatedProjects.push(project);
    }
  });
  return updatedProjects;
}

/* Generates all tasks with a specific task updated */
export function updateTasks(allTasks, newTask) {
  const updatedTasks = [];
  allTasks.forEach((task) => {
    if (task.id === newTask.id) {
      updatedTasks.push(newTask);
    } else {
      updatedTasks.push(task);
    }
  });
  return updatedTasks;
}

/* Updates trello project status */
export function updateTrelloProjectStatus(allProjects, updatedProject) {
  const updatedProjects = allProjects.map((project) => {
    if (project.id === Number(updatedProject.id)) {
      project.status = updatedProject.status;
    }
    return project;
  });
  return updatedProjects;
}

/* Updates trello task status */
export function updateTrelloTaskStatus(allTasks, updatedTask) {
  const updatedTasks = allTasks.map((task) => {
    if (task.id === Number(updatedTask.id)) {
      task.status = updatedTask.status;
    }
    return task;
  });
  return updatedTasks;
}

/* Gets task count for specific project */
export function taskCount(projectId, allTasks) {
  let taskCounterArr = [];
  for (let task of allTasks) {
    if (task.project_id === projectId) {
      taskCounterArr.push(task.name);
    }
  }
  return taskCounterArr.length;
}
