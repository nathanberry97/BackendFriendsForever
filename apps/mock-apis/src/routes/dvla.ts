import { Router, type Router as RouterType } from 'express';
import { personas } from '../data/personas.js';
import { dvlaData } from '../data/dvla.js';

const router: RouterType = Router();

router.get('/:citizenId', (req, res) => {
  const { citizenId } = req.params;
  const profile = personas[citizenId];

  if (!profile || !profile.linkedDepartments.includes('DVLA')) {
    res.status(404).json({ error: 'No DVLA record for this citizen' });
    return;
  }

  const data = dvlaData[citizenId];
  if (!data) {
    res.status(404).json({ error: 'No DVLA data available' });
    return;
  }

  res.json(data);
});

export default router;
