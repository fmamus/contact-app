import { useMemo, useState } from 'react';

import './style.css'
import List from './List';
import Form from './Form';

const STORAGE_KEY = 'contact-app.contacts';

const initialContacts = [
  {
    id: 'furkan-1',
    fullname: 'Furkan Mamus',
    phone_number: '0532 123 45 67',
    email: 'furkan@example.com',
    favorite: true,
  },
  {
    id: 'fatma-2',
    fullname: 'Fatma Kaya',
    phone_number: '0544 567 89 10',
    email: 'fatma@example.com',
    favorite: false,
  },
  {
    id: 'ali-3',
    fullname: 'Ali Demir',
    phone_number: '0555 951 40 14',
    email: 'ali@example.com',
    favorite: false,
  },
  {
    id: 'fatih-4',
    fullname: 'Fatih Yilmaz',
    phone_number: '0532 000 00 00',
    email: 'fatih@example.com',
    favorite: true,
  },
];

const getSavedContacts = () => {
  try {
    const savedContacts = window.localStorage.getItem(STORAGE_KEY);
    return savedContacts ? JSON.parse(savedContacts) : initialContacts;
  } catch {
    return initialContacts;
  }
};

function Contacts() {
  const [contacts, setContacts] = useState(getSavedContacts);
  const [filterText, setFilterText] = useState('');

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filterText.trim().toLowerCase();

    return contacts
      .filter((contact) => {
        if (!normalizedFilter) {
          return true;
        }

        return [contact.fullname, contact.phone_number, contact.email]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedFilter));
      })
      .sort((first, second) => {
        if (first.favorite !== second.favorite) {
          return first.favorite ? -1 : 1;
        }

        return first.fullname.localeCompare(second.fullname);
      });
  }, [contacts, filterText]);

  const favoriteCount = contacts.filter((contact) => contact.favorite).length;

  const saveContacts = (nextContacts) => {
    setContacts(nextContacts);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContacts));
  };

  const addContact = (contact) => {
    saveContacts([
      ...contacts,
      {
        ...contact,
        id: `${Date.now()}-${contact.fullname.toLowerCase().replace(/\s+/g, '-')}`,
        favorite: false,
      },
    ]);
  };

  const removeContact = (contactId) => {
    saveContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const toggleFavorite = (contactId) => {
    saveContacts(
      contacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, favorite: !contact.favorite }
          : contact
      )
    );
  };

  return (
      <div className="contacts-shell">
        <section className="hero-panel" aria-labelledby="contacts-title">
          <div>
            <p className="eyebrow">Smart address book</p>
            <h1 id="contacts-title">Contacts</h1>
            <p className="hero-copy">Search, add, favorite and manage your people from a cleaner workspace.</p>
          </div>

          <div className="stats-grid" aria-label="Contact statistics">
            <div>
              <span>{contacts.length}</span>
              <small>Total</small>
            </div>
            <div>
              <span>{favoriteCount}</span>
              <small>Favorites</small>
            </div>
          </div>
        </section>

        <main className="contacts-layout">
          <List
            contacts={filteredContacts}
            filterText={filterText}
            onFilterChange={setFilterText}
            onRemoveContact={removeContact}
            onToggleFavorite={toggleFavorite}
            totalContacts={contacts.length}
          />
          <Form addContact={addContact} />
        </main>
      </div>
  )
}

export default Contacts;
