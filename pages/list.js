import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function List() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('/api/all')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // Add this line to log the fetched data
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          console.error('Fetched data is not an array:', data);
          alert('Error: Fetched data is not an array. Please try again later.');
        }
      })
      .catch((error) => {
        console.error('Error fetching calendar entries:', error);
        alert('Error fetching calendar entries. Please try again later.');
      });
  }, []);

  return (
    <div>
      <h1>Calendar Entries</h1>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Month</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={`${entry.day}-${entry.month}`}>
              <td>{entry.day}</td>
              <td>{entry.month}</td>
              <td>{entry.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/">
        <button className="btn">Home</button>
      </Link>
      <a href="https://lunar-cal.onrender.com" target="_blank" rel="noopener noreferrer">
        <button className="btn">External Lunar Calendar</button>
      </a>
    </div>
  );
}
