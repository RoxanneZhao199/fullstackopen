interface TotalProps {
  totalExercises: number;
}

export const Total: React.FC<TotalProps> = ({ totalExercises }) => {
  return <p>Number of exercises {totalExercises}</p>;
};
