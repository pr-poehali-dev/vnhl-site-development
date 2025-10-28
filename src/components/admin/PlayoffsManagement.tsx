import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface PlayoffMatch {
  id: number;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
}

interface PlayoffsManagementProps {
  playoffBracket: any;
  setPlayoffBracket: (bracket: any) => void;
}

const PlayoffsManagement = ({ playoffBracket, setPlayoffBracket }: PlayoffsManagementProps) => {
  const updatePlayoffMatch = (stage: 'roundOf16' | 'quarterFinals' | 'semiFinals' | 'final', id: number, field: string, value: any) => {
    if (stage === 'final') {
      setPlayoffBracket({
        ...playoffBracket,
        final: { ...playoffBracket.final, [field]: value }
      });
    } else {
      setPlayoffBracket({
        ...playoffBracket,
        [stage]: playoffBracket[stage].map((match: PlayoffMatch) =>
          match.id === id ? { ...match, [field]: value } : match
        )
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>1/6 финала</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {playoffBracket.roundOf16.map((match: PlayoffMatch) => (
              <div key={match.id} className="grid grid-cols-5 gap-4 items-center">
                <Input
                  value={match.team1}
                  onChange={(e) => updatePlayoffMatch('roundOf16', match.id, 'team1', e.target.value)}
                  className="col-span-2"
                />
                <Input
                  type="number"
                  value={match.score1 ?? ''}
                  onChange={(e) => updatePlayoffMatch('roundOf16', match.id, 'score1', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="—"
                  className="text-center"
                />
                <Input
                  type="number"
                  value={match.score2 ?? ''}
                  onChange={(e) => updatePlayoffMatch('roundOf16', match.id, 'score2', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="—"
                  className="text-center"
                />
                <Input
                  value={match.team2}
                  onChange={(e) => updatePlayoffMatch('roundOf16', match.id, 'team2', e.target.value)}
                  className="col-span-1"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1/4 финала</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {playoffBracket.quarterFinals.map((match: PlayoffMatch) => (
              <div key={match.id} className="grid grid-cols-5 gap-4 items-center">
                <Input
                  value={match.team1}
                  onChange={(e) => updatePlayoffMatch('quarterFinals', match.id, 'team1', e.target.value)}
                  className="col-span-2"
                />
                <Input
                  type="number"
                  value={match.score1 ?? ''}
                  onChange={(e) => updatePlayoffMatch('quarterFinals', match.id, 'score1', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="—"
                  className="text-center"
                />
                <Input
                  type="number"
                  value={match.score2 ?? ''}
                  onChange={(e) => updatePlayoffMatch('quarterFinals', match.id, 'score2', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="—"
                  className="text-center"
                />
                <Input
                  value={match.team2}
                  onChange={(e) => updatePlayoffMatch('quarterFinals', match.id, 'team2', e.target.value)}
                  className="col-span-1"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1/2 финала</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {playoffBracket.semiFinals.map((match: PlayoffMatch) => (
              <div key={match.id} className="grid grid-cols-5 gap-4 items-center">
                <Input
                  value={match.team1}
                  onChange={(e) => updatePlayoffMatch('semiFinals', match.id, 'team1', e.target.value)}
                  className="col-span-2"
                />
                <Input
                  type="number"
                  value={match.score1 ?? ''}
                  onChange={(e) => updatePlayoffMatch('semiFinals', match.id, 'score1', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="—"
                  className="text-center"
                />
                <Input
                  type="number"
                  value={match.score2 ?? ''}
                  onChange={(e) => updatePlayoffMatch('semiFinals', match.id, 'score2', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="—"
                  className="text-center"
                />
                <Input
                  value={match.team2}
                  onChange={(e) => updatePlayoffMatch('semiFinals', match.id, 'team2', e.target.value)}
                  className="col-span-1"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Финал</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 items-center">
            <Input
              value={playoffBracket.final.team1}
              onChange={(e) => updatePlayoffMatch('final', 0, 'team1', e.target.value)}
              className="col-span-2"
            />
            <Input
              type="number"
              value={playoffBracket.final.score1 ?? ''}
              onChange={(e) => updatePlayoffMatch('final', 0, 'score1', e.target.value ? parseInt(e.target.value) : null)}
              placeholder="—"
              className="text-center"
            />
            <Input
              type="number"
              value={playoffBracket.final.score2 ?? ''}
              onChange={(e) => updatePlayoffMatch('final', 0, 'score2', e.target.value ? parseInt(e.target.value) : null)}
              placeholder="—"
              className="text-center"
            />
            <Input
              value={playoffBracket.final.team2}
              onChange={(e) => updatePlayoffMatch('final', 0, 'team2', e.target.value)}
              className="col-span-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayoffsManagement;
