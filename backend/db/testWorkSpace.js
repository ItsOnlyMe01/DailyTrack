const { getOrCreateUser } = require("./users");
const { getOrCreateWorkspace, getWorkspaces } = require("./workspaces");

(async () => {
  const user = await getOrCreateUser("ritesh@gmail.com");

  await getOrCreateWorkspace(user.id, "Milk Business");
  await getOrCreateWorkspace(user.id, "Kirana Shop");

  const list = await getWorkspaces(user.id);
  console.log("Workspaces:", list);

  process.exit(0);
})();
