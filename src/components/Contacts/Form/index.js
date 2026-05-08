import { useState } from 'react';

const initialFormValues = { fullname: '', phone_number: '', email: '' };

function Form({ addContact }) {
  
  const [form, setForm] = useState(initialFormValues);
  const [error, setError] = useState('');

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const nextContact = {
      fullname: form.fullname.trim(),
      phone_number: form.phone_number.trim(),
      email: form.email.trim(),
    };

    if (!nextContact.fullname || !nextContact.phone_number) {
      setError('Full name and phone number are required.');
      return;
    }

    addContact(nextContact);
    setForm(initialFormValues);
  }
  return (
      <form className="contact-form" onSubmit={onSubmit}>
        <div className="form-heading">
          <p className="eyebrow">New contact</p>
          <h2>Add person</h2>
        </div>

        <label>
          <span>Full name</span>
          <input name="fullname" placeholder="Jane Cooper" value={form.fullname} onChange={onChangeInput} />
        </label>

        <label>
          <span>Phone number</span>
          <input name="phone_number" placeholder="+90 555 123 45 67" value={form.phone_number} onChange={onChangeInput} />
        </label>

        <label>
          <span>Email</span>
          <input name="email" placeholder="jane@example.com" type="email" value={form.email} onChange={onChangeInput} />
        </label>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        
        <div className="btn">
          <button type="submit">Add Contact</button>
        </div>
      </form>
  );
}

export default Form;
