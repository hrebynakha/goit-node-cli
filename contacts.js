import fs from 'node:fs/promises';
import path from 'node:path';
import { nanoid } from 'nanoid';

const __dirname = path.resolve();
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
   const data = await fs.readFile(contactsPath);
   return JSON.parse(data);
}
  
async function getContactById(contactId) {
   const data = await listContacts();
   return data.find(contact => contact.id === contactId) || null;
}
  
async function removeContact(contactId) {
   const data = await listContacts();
   const contactIndex = data.findIndex(contact => contact.id === contactId);
   if (contactIndex === -1) {
      return null;
   }
   const removedContact = data.splice(contactIndex, 1)[0];
   await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
   return removedContact;
}
  
async function addContact(name, email, phone) {
   const data = await listContacts();
   const newContact = { id: nanoid(), name, email, phone };
   data.push(newContact);
   await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
   return newContact;
}
export { listContacts, getContactById, removeContact, addContact };