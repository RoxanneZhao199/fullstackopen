import { useEffect, useState } from 'react';
import './App.css';
import DiaryEntry from './DiaryEntry';
import NewDiaryEntry from './NewDiaryEntry'

interface DiaryEntryType {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntryType[]>([]);

  useEffect(() => {
    fetch('/api/diaries')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setDiaryEntries(data);
      })
      .catch(error => {
        console.error('Failed to fetch diary entries:', error);
      });
  }, []);

  return (
    <div>
      <h2>Add new entry</h2>
      <NewDiaryEntry />
      <h2>Diary entries</h2>
      {diaryEntries.map((entry) => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

export default App;
