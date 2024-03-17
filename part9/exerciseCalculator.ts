interface Value {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export function calculateExercises(dailyHours: number[], targetHours: number): Value {
  const periodLength = dailyHours.length;
  const totalHours = dailyHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const average = totalHours / periodLength;

  const trainingDays = dailyHours.filter(day => day > 0).length;

  let success = average >= targetHours;
  let rating: number;
  let ratingDescription: string;

  if (average < targetHours) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (average === targetHours){
    rating = 3;
    ratingDescription ='good job, you met your target';
  } else {
    rating = 4;
    ratingDescription ='excellent, you surpassed your target';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average
  }
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

const args = process.argv.slice(2).map(arg => Number(arg));
const targetHours = args[0];
const dailyHours = args.slice(1);

if (!args.every(arg => !isNaN(arg))) {
  console.log('Please provide only numbers as argument');
  process.exit(1);

}

const result = calculateExercises(dailyHours, targetHours);
console.log(result);
