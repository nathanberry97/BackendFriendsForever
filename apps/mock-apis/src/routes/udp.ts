import { Router, type Router as RouterType } from 'express';
import { personas } from '../data/personas.js';

const router: RouterType = Router();

router.get('/users/:citizenId', (req, res) => {
  const profile = personas[req.params.citizenId];
  if (!profile) {
    res.status(404).json({ error: 'Citizen not found' });
    return;
  }
  res.json(profile);
});

export default router;
