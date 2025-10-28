import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logout } from '@/lib/auth';
import Icon from '@/components/ui/icon';

interface Team {
  id: number;
  name: string;
  games: number;
  wins: number;
  losses: number;
  ot: number;
  points: number;
  logo: string;
}

interface Match {
  id: number;
  date: string;
  time: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
}

interface PlayoffMatch {
  id: number;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
}

interface Rule {
  title: string;
  content: string;
}

interface Champion {
  name: string;
  logo: string;
  wins: number;
  playoffRecord: string;
  goals: number;
  season: string;
}

interface AdminPanelProps {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  matches: Match[];
  setMatches: (matches: Match[]) => void;
  playoffBracket: any;
  setPlayoffBracket: (bracket: any) => void;
  rules: Rule[];
  setRules: (rules: Rule[]) => void;
  champion: Champion;
  setChampion: (champion: Champion) => void;
  onLogout: () => void;
}

const AdminPanel = ({ 
  teams, 
  setTeams, 
  matches, 
  setMatches, 
  playoffBracket, 
  setPlayoffBracket,
  rules,
  setRules,
  champion,
  setChampion,
  onLogout 
}: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState('teams');

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const updateTeam = (id: number, field: keyof Team, value: any) => {
    setTeams(teams.map(team => 
      team.id === id ? { ...team, [field]: value } : team
    ));
  };

  const addTeam = () => {
    const newId = Math.max(...teams.map(t => t.id), 0) + 1;
    setTeams([...teams, {
      id: newId,
      name: 'Новая команда',
      games: 0,
      wins: 0,
      losses: 0,
      ot: 0,
      points: 0,
      logo: '⭐'
    }]);
  };

  const deleteTeam = (id: number) => {
    setTeams(teams.filter(team => team.id !== id));
  };

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

  const updatePlayoffMatch = (stage: 'quarterFinals' | 'semiFinals' | 'final', id: number, field: string, value: any) => {
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

  const updateRule = (index: number, field: 'title' | 'content', value: string) => {
    setRules(rules.map((rule, idx) => 
      idx === index ? { ...rule, [field]: value } : rule
    ));
  };

  const addRule = () => {
    setRules([...rules, { title: 'Новое правило', content: 'Описание правила' }]);
  };

  const deleteRule = (index: number) => {
    setRules(rules.filter((_, idx) => idx !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <header className="bg-secondary text-white py-4 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-oswald font-bold">Админ-панель VNHL</h1>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" className="mr-2" size={20} />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="teams">Команды</TabsTrigger>
            <TabsTrigger value="matches">Матчи</TabsTrigger>
            <TabsTrigger value="playoffs">Плей-офф</TabsTrigger>
            <TabsTrigger value="rules">Правила</TabsTrigger>
            <TabsTrigger value="champion">Чемпион</TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Управление командами</CardTitle>
                  <Button onClick={addTeam}>
                    <Icon name="Plus" className="mr-2" size={20} />
                    Добавить команду
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teams.map((team) => (
                    <Card key={team.id}>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center">
                          <Input
                            value={team.logo}
                            onChange={(e) => updateTeam(team.id, 'logo', e.target.value)}
                            placeholder="🏒"
                            className="text-center text-2xl"
                          />
                          <Input
                            value={team.name}
                            onChange={(e) => updateTeam(team.id, 'name', e.target.value)}
                            className="md:col-span-2"
                          />
                          <Input
                            type="number"
                            value={team.wins}
                            onChange={(e) => updateTeam(team.id, 'wins', parseInt(e.target.value))}
                            placeholder="В"
                          />
                          <Input
                            type="number"
                            value={team.losses}
                            onChange={(e) => updateTeam(team.id, 'losses', parseInt(e.target.value))}
                            placeholder="П"
                          />
                          <Input
                            type="number"
                            value={team.ot}
                            onChange={(e) => updateTeam(team.id, 'ot', parseInt(e.target.value))}
                            placeholder="ОТ"
                          />
                          <Input
                            type="number"
                            value={team.points}
                            onChange={(e) => updateTeam(team.id, 'points', parseInt(e.target.value))}
                            placeholder="О"
                          />
                          <Button variant="destructive" onClick={() => deleteTeam(team.id)}>
                            <Icon name="Trash2" size={20} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches">
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
          </TabsContent>

          <TabsContent value="playoffs">
            <div className="space-y-6">
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
          </TabsContent>

          <TabsContent value="rules">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Управление правилами</CardTitle>
                  <Button onClick={addRule}>
                    <Icon name="Plus" className="mr-2" size={20} />
                    Добавить правило
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rules.map((rule, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex gap-4">
                            <Input
                              value={rule.title}
                              onChange={(e) => updateRule(idx, 'title', e.target.value)}
                              placeholder="Заголовок правила"
                              className="flex-1"
                            />
                            <Button variant="destructive" onClick={() => deleteRule(idx)}>
                              <Icon name="Trash2" size={20} />
                            </Button>
                          </div>
                          <Textarea
                            value={rule.content}
                            onChange={(e) => updateRule(idx, 'content', e.target.value)}
                            placeholder="Описание правила"
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="champion">
            <Card>
              <CardHeader>
                <CardTitle>Информация о чемпионе</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Название команды</label>
                      <Input
                        value={champion.name}
                        onChange={(e) => setChampion({ ...champion, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Эмодзи</label>
                      <Input
                        value={champion.logo}
                        onChange={(e) => setChampion({ ...champion, logo: e.target.value })}
                        className="text-2xl text-center"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Побед</label>
                      <Input
                        type="number"
                        value={champion.wins}
                        onChange={(e) => setChampion({ ...champion, wins: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Плей-офф</label>
                      <Input
                        value={champion.playoffRecord}
                        onChange={(e) => setChampion({ ...champion, playoffRecord: e.target.value })}
                        placeholder="16-3"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Голов</label>
                      <Input
                        type="number"
                        value={champion.goals}
                        onChange={(e) => setChampion({ ...champion, goals: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Сезон</label>
                    <Input
                      value={champion.season}
                      onChange={(e) => setChampion({ ...champion, season: e.target.value })}
                      placeholder="2024"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
