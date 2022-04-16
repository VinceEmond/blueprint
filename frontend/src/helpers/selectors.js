/* Gets name for specific user */
export function getUserName(users, id) {
  const filteredUser = users.filter((user) => {
    return user.id === id;
  });

  const name = filteredUser[0]["first_name"];

  return name;
}
