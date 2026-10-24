import type { TeamMember } from '../types/team';

export function getMemberName(members: TeamMember[], memberId: string | null): string {
  const member = members.find((m) => m.id === memberId);
  return member ? member.name : 'Unassigned';
}
