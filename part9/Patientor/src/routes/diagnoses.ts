import express from 'express';
import diagnoses from '../../data/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diagnoses);
});

// router.post('/', (_req, res) => {
//   res.send('Saving a diagnose!');
// });

export default router;
