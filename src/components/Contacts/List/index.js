function List({
  contacts,
  filterText,
  onFilterChange,
  onRemoveContact,
  onToggleFavorite,
  totalContacts,
}) {
  return (
      <section className="list-panel" aria-labelledby="contact-list-title">
        <div className="list-toolbar">
          <div>
            <p className="eyebrow">Directory</p>
            <h2 id="contact-list-title">People</h2>
          </div>

          <div className="result-count">
            {contacts.length} / {totalContacts}
          </div>
        </div>

        <label className="search-field">
          <span>Search contacts</span>
          <input
            placeholder="Search by name, phone or email"
            value={filterText}
            onChange={(e) => onFilterChange(e.target.value)}
          />
        </label>

        <ul className="list">
          {contacts.map((contact) => (
            <li key={contact.id}>
              <button
                className={`icon-button favorite-button ${contact.favorite ? 'is-active' : ''}`}
                type="button"
                onClick={() => onToggleFavorite(contact.id)}
                aria-label={`${contact.favorite ? 'Remove from' : 'Add to'} favorites`}
                title={`${contact.favorite ? 'Remove from' : 'Add to'} favorites`}
              >
                {contact.favorite ? '★' : '☆'}
              </button>

              <div className="contact-avatar" aria-hidden="true">
                {contact.fullname.charAt(0).toUpperCase()}
              </div>

              <div className="contact-details">
                <strong>{contact.fullname}</strong>
                <span>{contact.phone_number}</span>
                {contact.email && <small>{contact.email}</small>}
              </div>

              <button
                className="icon-button delete-button"
                type="button"
                onClick={() => onRemoveContact(contact.id)}
                aria-label={`Delete ${contact.fullname}`}
                title="Delete contact"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {contacts.length === 0 && (
          <div className="empty-state">
            <strong>No contacts found</strong>
            <span>Try a different search or add someone new.</span>
          </div>
        )}
      </section>
  )
}

export default List;
