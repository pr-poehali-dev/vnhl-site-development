import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Team {
  id: number;
  name: string;
  games: number;
  wins: number;
  losses: number;
  goals: number;
  points: number;
  logo: string;
  conference: string;
}

interface StandingsTabProps {
  teams: Team[];
}

const StandingsTab = ({ teams }: StandingsTabProps) => {
  const [conferenceTab, setConferenceTab] = useState('east');

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <CardTitle className="text-3xl font-oswald">Турнирная таблица</CardTitle>
          <Tabs value={conferenceTab} onValueChange={setConferenceTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="east" className="font-oswald">Восточная Конференция</TabsTrigger>
              <TabsTrigger value="west" className="font-oswald">Западная Конференция</TabsTrigger>
            </TabsList>
            
            <TabsContent value="east" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-primary">
                      <th className="text-left py-4 px-2 font-oswald">#</th>
                      <th className="text-left py-4 px-4 font-oswald">Команда</th>
                      <th className="text-center py-4 px-2 font-oswald">И</th>
                      <th className="text-center py-4 px-2 font-oswald">В</th>
                      <th className="text-center py-4 px-2 font-oswald">П</th>
                      <th className="text-center py-4 px-2 font-oswald">Голы</th>
                      <th className="text-center py-4 px-2 font-oswald bg-primary/10">О</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.filter((team: any) => team.conference === 'Восточная').map((team: any, idx: number) => (
                      <tr
                        key={team.id}
                        className={`border-b hover:bg-muted/50 transition-colors ${
                          idx < 4 ? 'bg-primary/5' : ''
                        }`}
                      >
                        <td className="py-4 px-2 font-bold">{idx + 1}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{team.logo}</span>
                            <span className="font-medium">{team.name}</span>
                            {idx < 4 && (
                              <Badge variant="outline" className="ml-2 border-primary text-primary">
                                Плей-офф
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-4 px-2">{team.games}</td>
                        <td className="text-center py-4 px-2 text-green-600 font-semibold">{team.wins}</td>
                        <td className="text-center py-4 px-2 text-red-600 font-semibold">{team.losses}</td>
                        <td className="text-center py-4 px-2">{team.goals}</td>
                        <td className="text-center py-4 px-2 font-bold text-lg bg-primary/10">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="west" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-primary">
                      <th className="text-left py-4 px-2 font-oswald">#</th>
                      <th className="text-left py-4 px-4 font-oswald">Команда</th>
                      <th className="text-center py-4 px-2 font-oswald">И</th>
                      <th className="text-center py-4 px-2 font-oswald">В</th>
                      <th className="text-center py-4 px-2 font-oswald">П</th>
                      <th className="text-center py-4 px-2 font-oswald">Голы</th>
                      <th className="text-center py-4 px-2 font-oswald bg-primary/10">О</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.filter((team: any) => team.conference === 'Западная').map((team: any, idx: number) => (
                      <tr
                        key={team.id}
                        className={`border-b hover:bg-muted/50 transition-colors ${
                          idx < 4 ? 'bg-primary/5' : ''
                        }`}
                      >
                        <td className="py-4 px-2 font-bold">{idx + 1}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{team.logo}</span>
                            <span className="font-medium">{team.name}</span>
                            {idx < 4 && (
                              <Badge variant="outline" className="ml-2 border-primary text-primary">
                                Плей-офф
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-4 px-2">{team.games}</td>
                        <td className="text-center py-4 px-2 text-green-600 font-semibold">{team.wins}</td>
                        <td className="text-center py-4 px-2 text-red-600 font-semibold">{team.losses}</td>
                        <td className="text-center py-4 px-2">{team.goals}</td>
                        <td className="text-center py-4 px-2 font-bold text-lg bg-primary/10">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardHeader>
    </Card>
  );
};

export default StandingsTab;
