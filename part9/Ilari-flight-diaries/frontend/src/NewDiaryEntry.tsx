import { useState } from 'react';

const NewDiaryEntry = () => {
  const [newEntry, setNewEntry] = useState({
    date: '',
    weather: '',
    visibility: '',
    comment: ''
  });

  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setNewEntry(prevState => ({
    ...prevState,
    [name]: value,
  }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('http://localhost:3000/api/diaries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('New entry added:', data);
      setError('');
    })
    .catch(error => {
      console.error('Error adding entry:', error);
      setError(error.message);
    });
  };

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            value={newEntry.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Visibility:</label>
          <label><input type="radio" name="visibility" value="great" onChange={handleChange} /> Great</label>
          <label><input type="radio" name="visibility" value="good" onChange={handleChange} /> Good</label>
          <label><input type="radio" name="visibility" value="ok" onChange={handleChange} /> OK</label>
          <label><input type="radio" name="visibility" value="poor" onChange={handleChange} /> Poor</label>
        </div>

        <div>
          <label>Weather:</label>
          <label><input type="radio" name="weather" value="sunny" onChange={handleChange} /> Sunny</label>
          <label><input type="radio" name="weather" value="rainy" onChange={handleChange} /> Rainy</label>
          <label><input type="radio" name="weather" value="cloudy" onChange={handleChange} /> Cloudy</label>
          <label><input type="radio" name="weather" value="stormy" onChange={handleChange} /> Stormy</label>
          <label><input type="radio" name="weather" value="windy" onChange={handleChange} /> Windy</label>
        </div>

        <div>
          comment
          <textarea
            id="comment"
            name="comment"
            value={newEntry.comment}
            onChange={handleChange}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewDiaryEntry;
