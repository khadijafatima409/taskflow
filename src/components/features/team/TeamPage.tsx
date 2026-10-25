import Card from '../../Card';
import { seedTeam } from '../../../data/seedTeam';
import { getInitials } from '../../../utils/team';

function TeamPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Team</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {seedTeam.map((member) => (
          <Card key={member.id} className="p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                {getInitials(member.name)}
              </span>
              <div>
                <p className="text-sm font-semibold">{member.name}</p>
                <p className="text-xs text-muted">{member.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}

export default TeamPage;
