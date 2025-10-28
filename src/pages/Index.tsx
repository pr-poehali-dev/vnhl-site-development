import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const teams = [
  { id: 1, name: 'Стальные Тигры', games: 30, wins: 22, losses: 6, ot: 2, points: 46, logo: '🐯' },
  { id: 2, name: 'Ледяные Волки', games: 30, wins: 21, losses: 7, ot: 2, points: 44, logo: '🐺' },
  { id: 3, name: 'Красные Драконы', games: 30, wins: 20, losses: 8, ot: 2, points: 42, logo: '🐉' },
  { id: 4, name: 'Полярные Медведи', games: 30, wins: 19, losses: 9, ot: 2, points: 40, logo: '🐻' },
  { id: 5, name: 'Грозовые Ястребы', games: 30, wins: 18, losses: 10, ot: 2, points: 38, logo: '🦅' },
  { id: 6, name: 'Синие Акулы', games: 30, wins: 17, losses: 11, ot: 2, points: 36, logo: '🦈' },
  { id: 7, name: 'Северные Рыси', games: 30, wins: 16, losses: 12, ot: 2, points: 34, logo: '🐱' },
  { id: 8, name: 'Огненные Фениксы', games: 30, wins: 15, losses: 13, ot: 2, points: 32, logo: '🔥' },
  { id: 9, name: 'Снежные Барсы', games: 30, wins: 13, losses: 14, ot: 3, points: 29, logo: '❄️' },
  { id: 10, name: 'Гранитные Орлы', games: 30, wins: 12, losses: 16, ot: 2, points: 26, logo: '🦅' },
  { id: 11, name: 'Чёрные Вороны', games: 30, wins: 10, losses: 17, ot: 3, points: 23, logo: '🐦' },
  { id: 12, name: 'Серебряные Лисы', games: 30, wins: 8, losses: 19, ot: 3, points: 19, logo: '🦊' },
];

const matches = [
  { id: 1, date: '2025-10-30', time: '19:00', home: 'Стальные Тигры', away: 'Ледяные Волки', homeScore: null, awayScore: null },
  { id: 2, date: '2025-10-30', time: '20:30', home: 'Красные Драконы', away: 'Полярные Медведи', homeScore: null, awayScore: null },
  { id: 3, date: '2025-10-31', time: '18:00', home: 'Грозовые Ястребы', away: 'Синие Акулы', homeScore: null, awayScore: null },
  { id: 4, date: '2025-11-01', time: '19:30', home: 'Северные Рыси', away: 'Огненные Фениксы', homeScore: null, awayScore: null },
  { id: 5, date: '2025-11-02', time: '17:00', home: 'Снежные Барсы', away: 'Гранитные Орлы', homeScore: null, awayScore: null },
  { id: 6, date: '2025-11-02', time: '20:00', home: 'Чёрные Вороны', away: 'Серебряные Лисы', homeScore: null, awayScore: null },
];

const playoffBracket = {
  quarterFinals: [
    { id: 1, team1: 'Стальные Тигры', team2: 'Огненные Фениксы', score1: null, score2: null },
    { id: 2, team1: 'Ледяные Волки', team2: 'Северные Рыси', score1: null, score2: null },
    { id: 3, team1: 'Красные Драконы', team2: 'Синие Акулы', score1: null, score2: null },
    { id: 4, team1: 'Полярные Медведи', team2: 'Грозовые Ястребы', score1: null, score2: null },
  ],
  semiFinals: [
    { id: 5, team1: 'Победитель 1/4 №1', team2: 'Победитель 1/4 №2', score1: null, score2: null },
    { id: 6, team1: 'Победитель 1/4 №3', team2: 'Победитель 1/4 №4', score1: null, score2: null },
  ],
  final: { id: 7, team1: 'Победитель 1/2 №1', team2: 'Победитель 1/2 №2', score1: null, score2: null },
};

const rules = [
  {
    title: 'Формат регулярного сезона',
    content: 'Каждая команда проводит 30 матчей в регулярном сезоне. За победу в основное время команда получает 2 очка, за победу в овертайме или буллитах - 2 очка, за поражение в овертайме или буллитах - 1 очко, за поражение в основное время - 0 очков.',
  },
  {
    title: 'Формат плей-офф',
    content: 'В плей-офф выходят 8 лучших команд по итогам регулярного сезона. Сетка плей-офф включает 1/4 финала, 1/2 финала и финал. Все серии играются до 4 побед.',
  },
  {
    title: 'Состав команды',
    content: 'Максимальный состав команды - 25 игроков (20 полевых + 3 вратаря + 2 резервных). На матч может быть заявлено не более 20 игроков, включая 2 вратарей.',
  },
  {
    title: 'Игровое время',
    content: 'Матч состоит из 3 периодов по 20 минут чистого времени. В случае ничьей назначается овертайм 5 минут (3 на 3). Если победитель не выявлен - буллиты (3 игрока от каждой команды).',
  },
  {
    title: 'Дисциплина',
    content: 'За грубые нарушения правил игроки получают штрафы: малый штраф - 2 минуты, большой штраф - 5 минут + автоматическое удаление до конца матча. За три больших штрафа в сезоне - дисквалификация на 1 матч.',
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('standings');

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <header className="bg-secondary text-white py-6 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🏒</div>
              <div>
                <h1 className="text-5xl font-oswald font-bold tracking-wider">VNHL</h1>
                <p className="text-sm text-muted-foreground mt-1">Виртуальная Национальная Хоккейная Лига</p>
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-6 py-2 border-primary text-white">
              Сезон 2025
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-14">
            <TabsTrigger value="standings" className="text-base font-oswald">
              <Icon name="Trophy" className="mr-2" size={20} />
              Таблица
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-base font-oswald">
              <Icon name="Calendar" className="mr-2" size={20} />
              Календарь
            </TabsTrigger>
            <TabsTrigger value="playoffs" className="text-base font-oswald">
              <Icon name="Target" className="mr-2" size={20} />
              Плей-офф
            </TabsTrigger>
            <TabsTrigger value="champion" className="text-base font-oswald">
              <Icon name="Award" className="mr-2" size={20} />
              Чемпион
            </TabsTrigger>
            <TabsTrigger value="rules" className="text-base font-oswald">
              <Icon name="BookOpen" className="mr-2" size={20} />
              Правила
            </TabsTrigger>
          </TabsList>

          <TabsContent value="standings" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-oswald">Турнирная таблица регулярного сезона</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-primary">
                        <th className="text-left py-4 px-2 font-oswald">#</th>
                        <th className="text-left py-4 px-4 font-oswald">Команда</th>
                        <th className="text-center py-4 px-2 font-oswald">И</th>
                        <th className="text-center py-4 px-2 font-oswald">В</th>
                        <th className="text-center py-4 px-2 font-oswald">П</th>
                        <th className="text-center py-4 px-2 font-oswald">ОТ</th>
                        <th className="text-center py-4 px-2 font-oswald bg-primary/10">О</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team, idx) => (
                        <tr
                          key={team.id}
                          className={`border-b hover:bg-muted/50 transition-colors ${
                            idx < 8 ? 'bg-primary/5' : ''
                          }`}
                        >
                          <td className="py-4 px-2 font-bold">{idx + 1}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{team.logo}</span>
                              <span className="font-medium">{team.name}</span>
                              {idx < 8 && (
                                <Badge variant="outline" className="ml-2 border-primary text-primary">
                                  Плей-офф
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="text-center py-4 px-2">{team.games}</td>
                          <td className="text-center py-4 px-2 text-green-600 font-semibold">{team.wins}</td>
                          <td className="text-center py-4 px-2 text-red-600 font-semibold">{team.losses}</td>
                          <td className="text-center py-4 px-2">{team.ot}</td>
                          <td className="text-center py-4 px-2 font-bold text-lg bg-primary/10">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-oswald">Календарь матчей</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matches.map((match) => (
                    <Card key={match.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon name="Calendar" size={16} className="text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {new Date(match.date).toLocaleDateString('ru-RU', {
                                  weekday: 'long',
                                  day: 'numeric',
                                  month: 'long',
                                })}
                              </span>
                              <Badge variant="outline">{match.time}</Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-center mt-4">
                              <div className="text-right">
                                <p className="font-semibold text-lg">{match.home}</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-4">
                                  <span className="text-3xl font-bold font-oswald">
                                    {match.homeScore ?? '—'}
                                  </span>
                                  <span className="text-muted-foreground">vs</span>
                                  <span className="text-3xl font-bold font-oswald">
                                    {match.awayScore ?? '—'}
                                  </span>
                                </div>
                              </div>
                              <div className="text-left">
                                <p className="font-semibold text-lg">{match.away}</p>
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
          </TabsContent>

          <TabsContent value="playoffs" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-oswald">Сетка плей-офф</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-oswald text-center mb-6">1/4 финала</h3>
                    {playoffBracket.quarterFinals.map((match) => (
                      <Card key={match.id} className="bg-secondary/5">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{match.team1}</span>
                              <Badge variant="outline">{match.score1 ?? '—'}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{match.team2}</span>
                              <Badge variant="outline">{match.score2 ?? '—'}</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-oswald text-center mb-6">1/2 финала</h3>
                    {playoffBracket.semiFinals.map((match) => (
                      <Card key={match.id} className="bg-secondary/5 mt-16">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{match.team1}</span>
                              <Badge variant="outline">{match.score1 ?? '—'}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{match.team2}</span>
                              <Badge variant="outline">{match.score2 ?? '—'}</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-oswald text-center mb-6">Финал</h3>
                    <Card className="bg-primary/10 border-2 border-primary mt-32">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg">{playoffBracket.final.team1}</span>
                            <Badge className="text-lg px-3 py-1">{playoffBracket.final.score1 ?? '—'}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg">{playoffBracket.final.team2}</span>
                            <Badge className="text-lg px-3 py-1">{playoffBracket.final.score2 ?? '—'}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="champion" className="animate-fade-in">
            <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon name="Trophy" size={64} className="text-primary" />
                </div>
                <CardTitle className="text-4xl font-oswald">Чемпион сезона 2024</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-6">
                  <div className="text-7xl">🐯</div>
                  <h2 className="text-5xl font-oswald font-bold">Стальные Тигры</h2>
                  <p className="text-xl text-muted-foreground">
                    Победители плей-офф VNHL 2024
                  </p>
                  <div className="grid grid-cols-3 gap-6 mt-8 max-w-2xl mx-auto">
                    <div className="bg-card p-6 rounded-lg">
                      <p className="text-3xl font-bold font-oswald text-primary">52</p>
                      <p className="text-sm text-muted-foreground mt-2">Побед</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg">
                      <p className="text-3xl font-bold font-oswald text-primary">16-3</p>
                      <p className="text-sm text-muted-foreground mt-2">Плей-офф</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg">
                      <p className="text-3xl font-bold font-oswald text-primary">278</p>
                      <p className="text-sm text-muted-foreground mt-2">Голов</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-oswald">Правила лиги VNHL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {rules.map((rule, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg">
                      <h3 className="text-xl font-oswald font-semibold mb-3">{rule.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{rule.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-secondary text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2025 VNHL. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
