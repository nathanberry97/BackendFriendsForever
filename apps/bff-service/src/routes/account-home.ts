import { Router, type Router as RouterType } from 'express';
import { fetchUserProfile, fetchHMRC, fetchDVLA, fetchDWP } from '../api-client.js';
import { assembleUI } from '../assemble-ui.js';

const router: RouterType = Router();

router.get('/', async (req, res) => {
  const citizenId = req.query.citizenId as string | undefined;

  if (!citizenId) {
    res.status(400).json({ error: 'citizenId query parameter is required' });
    return;
  }

  const profile = await fetchUserProfile(citizenId);
  if (!profile) {
    res.status(404).json({ error: 'Citizen not found' });
    return;
  }

  const [hmrc, dvla, dwp] = await Promise.all([
    profile.linkedDepartments.includes('HMRC') ? fetchHMRC(citizenId) : Promise.resolve(null),
    profile.linkedDepartments.includes('DVLA') ? fetchDVLA(citizenId) : Promise.resolve(null),
    profile.linkedDepartments.includes('DWP') ? fetchDWP(citizenId) : Promise.resolve(null),
  ]);

  const response = assembleUI(profile, { hmrc, dvla, dwp });
  res.json(response);
});

export default router;
