import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [calendar, setCalendar] = useState('Loading...');
  const [response, setResponse] = useState('Loading...');

  useEffect(() => {
    fetch('/api/cal')
      .then((response) => response.json())
      .then((data) => {
        const { year, month, day } = data;
        setCalendar(`${day}/${month}/${year}`);
        compareDates(day, month);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setCalendar('Error fetching data');
      });
  }, []);

  const compareDates = (day, month) => {
    fetch('/api/all')
      .then((response) => response.json())
      .then((data) => {
        const matchingEntry = data.find(
          (entry) => entry.day === day && entry.month === month
        );
        if (matchingEntry) {
          setResponse(`Today is ${matchingEntry.desc}`);
        } else {
          setResponse('No event found today');
        }
      })
      .catch((error) => {
        console.error('Error fetching calendar entries:', error);
        setResponse('Error fetching calendar entries');
      });
  };

  return (
    <div className="container">
      <h1>Welcome to Calendar App</h1>
      <h1 className="calendar">{calendar}</h1>
      <h3 className="response">{response}</h3>
      <h1>Manage your calendar entries easily.</h1>
      <Link href="/form">
        <button className="btn">Add Calendar Entry</button>
      </Link>
      <Link href="/list">
        <button className="btn">View Calendar Entries</button>
      </Link>
      <a href="https://lunar-cal.onrender.com" target="_blank" rel="noopener noreferrer">
        <button className="btn">External Lunar Calendar</button>
      </a>
    </div>
  );
}
