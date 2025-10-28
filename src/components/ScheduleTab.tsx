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
        <CardTitle className="text-2xl md:text-3xl font-oswald">Календарь матчей</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 md:space-y-4">
          {matches.map((match: any) => (
            <Card key={match.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Icon name="Calendar" size={14} className="text-muted-foreground" />
                      <span className="text-xs md:text-sm text-muted-foreground">
                        {new Date(match.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <Icon name="Clock" size={14} className="text-muted-foreground ml-2 md:ml-4" />
                      <span className="text-xs md:text-sm text-muted-foreground">{match.time}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 md:gap-8">
                      <div className="flex items-center gap-2 md:gap-3 flex-1 w-full sm:w-auto">
                        <span className="font-medium text-sm md:text-lg truncate max-w-[150px] sm:max-w-none">{match.home}</span>
                        {match.homeScore !== null && (
                          <Badge variant={match.homeScore > (match.awayScore || 0) ? 'default' : 'secondary'} className="text-sm md:text-lg px-2 md:px-3">
                            {match.homeScore}
                          </Badge>
                        )}
                      </div>
                      <div className="text-lg md:text-2xl font-bold text-muted-foreground self-center sm:self-auto">VS</div>
                      <div className="flex items-center gap-2 md:gap-3 flex-1 justify-start sm:justify-end w-full sm:w-auto">
                        {match.awayScore !== null && (
                          <Badge variant={match.awayScore > (match.homeScore || 0) ? 'default' : 'secondary'} className="text-sm md:text-lg px-2 md:px-3">
                            {match.awayScore}
                          </Badge>
                        )}
                        <span className="font-medium text-sm md:text-lg truncate max-w-[150px] sm:max-w-none">{match.away}</span>
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