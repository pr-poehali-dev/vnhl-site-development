import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Match {
  id: number;
  date: string;
  time: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
}

interface MatchesManagementProps {
  matches: Match[];
  setMatches: (matches: Match[]) => void;
}

const MatchesManagement = ({ matches, setMatches }: MatchesManagementProps) => {
  const updateMatch = (id: number, field: keyof Match, value: any) => {
    setMatches(matches.map(match => 
      match.id === id ? { ...match, [field]: value } : match
    ));
  };

  const addMatch = () => {
    const newId = Math.max(...matches.map(m => m.id), 0) + 1;
    setMatches([...matches, {
      id: newId,
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      home: 'Команда 1',
      away: 'Команда 2',
      homeScore: null,
      awayScore: null
    }]);
  };

  const deleteMatch = (id: number) => {
    setMatches(matches.filter(match => match.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Управление матчами</CardTitle>
          <Button onClick={addMatch}>
            <Icon name="Plus" className="mr-2" size={20} />
            Добавить матч
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match) => (
            <Card key={match.id}>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                  <Input
                    type="date"
                    value={match.date}
                    onChange={(e) => updateMatch(match.id, 'date', e.target.value)}
                  />
                  <Input
                    type="time"
                    value={match.time}
                    onChange={(e) => updateMatch(match.id, 'time', e.target.value)}
                  />
                  <Input
                    value={match.home}
                    onChange={(e) => updateMatch(match.id, 'home', e.target.value)}
                    placeholder="Хозяева"
                  />
                  <Input
                    type="number"
                    value={match.homeScore ?? ''}
                    onChange={(e) => updateMatch(match.id, 'homeScore', e.target.value ? parseInt(e.target.value) : null)}
                    placeholder="—"
                    className="text-center"
                  />
                  <Input
                    type="number"
                    value={match.awayScore ?? ''}
                    onChange={(e) => updateMatch(match.id, 'awayScore', e.target.value ? parseInt(e.target.value) : null)}
                    placeholder="—"
                    className="text-center"
                  />
                  <Input
                    value={match.away}
                    onChange={(e) => updateMatch(match.id, 'away', e.target.value)}
                    placeholder="Гости"
                  />
                  <Button variant="destructive" onClick={() => deleteMatch(match.id)}>
                    <Icon name="Trash2" size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchesManagement;
