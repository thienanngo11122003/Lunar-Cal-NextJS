import { useState } from 'react';
import Link from 'next/link';

export default function Form() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [desc, setDesc] = useState('');

  const submitForm = () => {
    const formData = { day: parseInt(day), month: parseInt(month), desc };
    fetch('/api/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Calendar entry added successfully');
        } else {
          alert('Error adding calendar entry');
        }
      })
      .catch((error) => {
        console.error('Error adding calendar entry:', error);
        alert('Error adding calendar entry');
      });
  };

  return (
    <form className="form" onSubmit={(e) => {e.preventDefault(); submitForm();}}>
      <label htmlFor="day">Day:</label>
      <input type="number" id="day" value={day} onChange={(e) => setDay(e.target.value)} required /><br /><br />
      <label htmlFor="month">Month:</label>
      <input type="number" id="month" value={month} onChange={(e) => setMonth(e.target.value)} required /><br /><br />
      <label htmlFor="desc">Description:</label>
      <input type="text" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} /><br /><br />
      <button type="submit">Submit</button>
      <Link href="/">
        <button className="btn">Home</button>
      </Link>
      <a href="https://lunar-cal.onrender.com" target="_blank" rel="noopener noreferrer">
        <button className="btn">External Lunar Calendar</button>
      </a>
    </form>
  );
}
