import * as React from 'react';


export interface DiaryEntryProps {
  entry: {
    id: number;
    date: string;
    weather: string;
    visibility: string;
    // comment?: string;
  };
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry }) => {
  const { date, weather, visibility } = entry;

  return (
    <div className="diary-entry">
      <h3>Date: {date}</h3>
      <p>Weather: {weather}</p>
      <p>Visibility: {visibility}</p>
      {/* {comment && <p>Comment: {comment}</p>} */}
    </div>
  );
};

export default DiaryEntry;
