const { getOrCreateUser } = require("./users");

(async () => {
  const user1 = await getOrCreateUser("riteshsingh01st@gmail.com");
  console.log("User", user1);
  const user2 = await getOrCreateUser("ritesh@gmail.com");
  console.log("User", user2);
  const user3 = await getOrCreateUser("ritesh@gmail.com");
  console.log("User", user3);

  process.exit(0);
})();
