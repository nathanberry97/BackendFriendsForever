import { Router, type Router as RouterType } from 'express';
import { personas } from '../data/personas.js';
import { dwpData } from '../data/dwp.js';

const router: RouterType = Router();

router.get('/:citizenId', (req, res) => {
  const { citizenId } = req.params;
  const profile = personas[citizenId];

  if (!profile || !profile.linkedDepartments.includes('DWP')) {
    res.status(404).json({ error: 'No DWP record for this citizen' });
    return;
  }

  const data = dwpData[citizenId];
  if (!data) {
    res.status(404).json({ error: 'No DWP data available' });
    return;
  }

  res.json(data);
});

export default router;
