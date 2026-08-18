import { Router, type Router as RouterType } from 'express';
import { personas } from '../data/personas.js';
import { hmrcData } from '../data/hmrc.js';

const router: RouterType = Router();

router.get('/:citizenId', (req, res) => {
  const { citizenId } = req.params;
  const profile = personas[citizenId];

  if (!profile || !profile.linkedDepartments.includes('HMRC')) {
    res.status(404).json({ error: 'No HMRC record for this citizen' });
    return;
  }

  const data = hmrcData[citizenId];
  if (!data) {
    res.status(404).json({ error: 'No HMRC data available' });
    return;
  }

  res.json(data);
});

export default router;
