export default async (req, res) => {
    if (req.method === 'GET') {
      try {
        const response = await fetch('https://lunar-cal.onrender.com/all');
        const calendars = await response.json();
        res.status(200).json(calendars);
      } catch (error) {
        console.error('Error fetching calendar entries:', error);
        res.status(500).json({ error: 'Error fetching calendar entries' });
      }
    } else if (req.method === 'POST') {
      try {
        const response = await fetch('https://lunar-cal.onrender.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
        const newEntry = await response.json();
        res.status(201).json(newEntry);
      } catch (error) {
        console.error('Error saving calendar entry:', error);
        res.status(500).json({ error: 'Error saving calendar entry' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  };
  