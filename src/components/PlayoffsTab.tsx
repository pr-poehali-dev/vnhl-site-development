import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlayoffMatch {
  id: number;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
}

interface PlayoffBracket {
  roundOf16: PlayoffMatch[];
  quarterFinals: PlayoffMatch[];
  semiFinals: PlayoffMatch[];
  final: PlayoffMatch;
}

interface PlayoffsTabProps {
  playoffBracket: PlayoffBracket;
}

const PlayoffsTab = ({ playoffBracket }: PlayoffsTabProps) => {
  const renderMatch = (match: PlayoffMatch) => (
    <div
      key={match.id}
      className="bg-card border-2 border-primary/20 rounded-lg p-3 md:p-4 hover:border-primary transition-colors"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm md:text-base truncate max-w-[150px] sm:max-w-none">{match.team1}</span>
          <span className="font-bold text-base md:text-lg ml-2">{match.score1 ?? '—'}</span>
        </div>
        <div className="border-t border-muted"></div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm md:text-base truncate max-w-[150px] sm:max-w-none">{match.team2}</span>
          <span className="font-bold text-base md:text-lg ml-2">{match.score2 ?? '—'}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-oswald">1/6 финала</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {playoffBracket.roundOf16.map(renderMatch)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-oswald">1/4 финала</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {playoffBracket.quarterFinals.map(renderMatch)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-oswald">1/2 финала</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {playoffBracket.semiFinals.map(renderMatch)}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 md:border-4 border-primary">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-2xl md:text-3xl font-oswald text-center">Финал</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 md:pt-6">
          <div className="max-w-md mx-auto">
            {renderMatch(playoffBracket.final)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayoffsTab;