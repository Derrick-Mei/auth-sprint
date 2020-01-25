const db = require("./dbConfig");
const bcrypt = require("bcryptjs");

function findAll() {
  return db("users");
}

function findAllBy(filter) {
  return db("users")
    .where(filter)
    .select("username", "authorization", "id");
}

function findOneBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

async function addOne(user) {
  const salt = await bcrypt.genSalt(14);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;

  const [id] = await db("users").insert(user);
  return findOneBy({ id });
}

async function updateOne(user) {
  await db("users")
    .update(user)
    .where({ id: user.id });
  return findOneBy({ id: user.id });
}

function removeOne(id) {
  return db("users")
    .del()
    .where({ id });
}

module.exports = {
  findAll,
  findAllBy,
  findOneBy,
  addOne,
  updateOne,
  removeOne
};
