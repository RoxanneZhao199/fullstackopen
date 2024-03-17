import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/bmi', (req, res) => {
  const { weight, height} = req.query;

  if (!weight || !height || isNaN(Number(weight)) || isNaN(Number(height))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const bmi = calculateBmi(Number(weight), Number(height));

  return res.json({
    weight: Number(weight),
    height: Number(height),
    bmi: bmi
  });
})

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || !daily_exercises.every((d) => typeof d === 'number') || typeof target !== 'number') {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises, target);
  return res.json(result);
});
