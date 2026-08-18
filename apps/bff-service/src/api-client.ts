import type { UDPUserProfile } from '@bff/shared-types';

const BASE_URL = process.env.MOCK_API_BASE_URL || 'http://localhost:4001';

export async function fetchUserProfile(citizenId: string): Promise<UDPUserProfile | null> {
  const res = await fetch(`${BASE_URL}/api/udp/users/${citizenId}`);
  if (!res.ok) return null;
  return res.json() as Promise<UDPUserProfile>;
}

export async function fetchHMRC(citizenId: string): Promise<Record<string, any> | null> {
  const res = await fetch(`${BASE_URL}/api/hmrc/${citizenId}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchDVLA(citizenId: string): Promise<Record<string, any> | null> {
  const res = await fetch(`${BASE_URL}/api/dvla/${citizenId}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchDWP(citizenId: string): Promise<Record<string, any> | null> {
  const res = await fetch(`${BASE_URL}/api/dwp/${citizenId}`);
  if (!res.ok) return null;
  return res.json();
}
