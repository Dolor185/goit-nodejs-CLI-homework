const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = () => {
  fs.readFile(contactsPath, "utf8")
    .then((data) => console.log(JSON.parse(data)))
    .catch((err) => console.log(err));
};

const getContactById = (contactId) => {
  fs.readFile(contactsPath, "utf8")
    .then((data) => JSON.parse(data).find((name) => name.id === contactId))
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8").then((data) => {
      return JSON.parse(data).filter(({ id }) => id !== contactId);
    });
    const newContent = JSON.stringify(data);
    await fs.writeFile(contactsPath, newContent, "utf8");
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs
      .readFile(contactsPath, "utf8")
      .then((data) => JSON.parse(data));
    const contact = {
      id: uid(),
      name,
      email,
      phone,
    };

    const newContent = JSON.stringify([...data, { ...contact }]);

    await fs.writeFile(contactsPath, newContent, "utf8");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
