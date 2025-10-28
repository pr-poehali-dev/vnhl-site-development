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
          <CardTitle className="text-2xl md:text-3xl font-oswald">Турнирная таблица</CardTitle>
          <Tabs value={conferenceTab} onValueChange={setConferenceTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="east" className="font-oswald text-xs md:text-base">Восточная</TabsTrigger>
              <TabsTrigger value="west" className="font-oswald text-xs md:text-base">Западная</TabsTrigger>
            </TabsList>
            
            <TabsContent value="east" className="mt-6">
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b-2 border-primary">
                      <th className="text-left py-2 md:py-4 px-1 md:px-2 font-oswald text-xs md:text-base">#</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 font-oswald text-xs md:text-base">Команда</th>
                      <th className="text-center py-2 md:py-4 px-1 md:px-2 font-oswald text-xs md:text-base">И</th>
                      <th className="text-center py-2 md:py-4 px-1 md:px-2 font-oswald text-xs md:text-base">В</th>
                      <th className="text-center py-2 md:py-4 px-1 md:px-2 font-oswald text-xs md:text-base">П</th>
                      <th className="text-center py-2 md:py-4 px-1 md:px-2 font-oswald text-xs md:text-base hidden sm:table-cell">Голы</th>
                      <th className="text-center py-2 md:py-4 px-1 md:px-2 font-oswald bg-primary/10 text-xs md:text-base">О</th>
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
                        <td className="py-2 md:py-4 px-1 md:px-2 font-bold text-sm md:text-base">{idx + 1}</td>
                        <td className="py-2 md:py-4 px-2 md:px-4">
                          <div className="flex items-center gap-1 md:gap-3">
                            <span className="text-lg md:text-2xl">{team.logo}</span>
                            <span className="font-medium text-xs md:text-base truncate max-w-[120px] md:max-w-none">{team.name}</span>
                            {idx < 4 && (
                              <Badge variant="outline" className="ml-1 md:ml-2 border-primary text-primary text-[10px] md:text-xs px-1 md:px-2 hidden md:inline-flex">
                                Плей-офф
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-2 md:py-4 px-1 md:px-2 text-xs md:text-base">{team.games}</td>
                        <td className="text-center py-2 md:py-4 px-1 md:px-2 text-green-600 font-semibold text-xs md:text-base">{team.wins}</td>
                        <td className="text-center py-2 md:py-4 px-1 md:px-2 text-red-600 font-semibold text-xs md:text-base">{team.losses}</td>
                        <td className="text-center py-2 md:py-4 px-1 md:px-2 text-xs md:text-base hidden sm:table-cell">{team.goals}</td>
                        <td className="text-center py-2 md:py-4 px-1 md:px-2 font-bold text-sm md:text-lg bg-primary/10">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="west" className="mt-6">
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b-2 border-primary">
                      <th className="text-left py-2 md:py-4 px-1 md:px-2 font-oswald text-xs md:text-base">#</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 font-oswald text-xs md:text-base">Команда</th>
                      <th className="text-center py-2 md:py-4 px-1 md:px-2 font-oswald text-xs md:text-base">И</th>
                      <th className="text-center py-2 md:py-4 px-1 md:px-2 font-oswald text-xs md:text-base">В</th>
                      <th className="text-center py-2 md:py-4 px-1 md:px-2 font-oswald text-xs md:text-base">П</th>
                      <th className="text-center py-2 md:py-4 px-1 md:px-2 font-oswald text-xs md:text-base hidden sm:table-cell">Голы</th>
                      <th className="text-center py-2 md:py-4 px-1 md:px-2 font-oswald bg-primary/10 text-xs md:text-base">О</th>
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
                        <td className="py-2 md:py-4 px-1 md:px-2 font-bold text-sm md:text-base">{idx + 1}</td>
                        <td className="py-2 md:py-4 px-2 md:px-4">
                          <div className="flex items-center gap-1 md:gap-3">
                            <span className="text-lg md:text-2xl">{team.logo}</span>
                            <span className="font-medium text-xs md:text-base truncate max-w-[120px] md:max-w-none">{team.name}</span>
                            {idx < 4 && (
                              <Badge variant="outline" className="ml-1 md:ml-2 border-primary text-primary text-[10px] md:text-xs px-1 md:px-2 hidden md:inline-flex">
                                Плей-офф
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-2 md:py-4 px-1 md:px-2 text-xs md:text-base">{team.games}</td>
                        <td className="text-center py-2 md:py-4 px-1 md:px-2 text-green-600 font-semibold text-xs md:text-base">{team.wins}</td>
                        <td className="text-center py-2 md:py-4 px-1 md:px-2 text-red-600 font-semibold text-xs md:text-base">{team.losses}</td>
                        <td className="text-center py-2 md:py-4 px-1 md:px-2 text-xs md:text-base hidden sm:table-cell">{team.goals}</td>
                        <td className="text-center py-2 md:py-4 px-1 md:px-2 font-bold text-sm md:text-lg bg-primary/10">{team.points}</td>
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