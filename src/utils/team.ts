import type { TeamMember } from '../types/team';

export function getMemberName(members: TeamMember[], memberId: string | null): string {
  const member = members.find((m) => m.id === memberId);
  return member ? member.name : 'Unassigned';
}

// 'Ayesha Khan' → 'AK'
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}
