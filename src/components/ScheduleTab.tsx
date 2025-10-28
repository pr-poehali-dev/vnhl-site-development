import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface ScheduleTabProps {
  matches: Match[];
}

const ScheduleTab = ({ matches }: ScheduleTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-oswald">Календарь матчей</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match: any) => (
            <Card key={match.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Calendar" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(match.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <Icon name="Clock" size={16} className="text-muted-foreground ml-4" />
                      <span className="text-sm text-muted-foreground">{match.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="font-medium text-lg">{match.home}</span>
                        {match.homeScore !== null && (
                          <Badge variant={match.homeScore > (match.awayScore || 0) ? 'default' : 'secondary'} className="text-lg px-3">
                            {match.homeScore}
                          </Badge>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-muted-foreground">VS</div>
                      <div className="flex items-center gap-3 flex-1 justify-end">
                        {match.awayScore !== null && (
                          <Badge variant={match.awayScore > (match.homeScore || 0) ? 'default' : 'secondary'} className="text-lg px-3">
                            {match.awayScore}
                          </Badge>
                        )}
                        <span className="font-medium text-lg">{match.away}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleTab;
