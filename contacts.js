import fs from 'fs/promises';
import path from 'path';
const __dirname = path.resolve();
import { nanoid } from 'nanoid';

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
   const contact = await getContactById(contactId);
   if (!contact) {
      return null;
   }
   const data = await listContacts();
   const index = data.findIndex(contact => contact.id === contactId);
   const removedContact = data.splice(index, 1)[0];
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