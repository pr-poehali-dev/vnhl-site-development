import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logout } from '@/lib/auth';
import AdminHeader from '@/components/admin/AdminHeader';
import TeamsManagement from '@/components/admin/TeamsManagement';
import MatchesManagement from '@/components/admin/MatchesManagement';
import PlayoffsManagement from '@/components/admin/PlayoffsManagement';
import RulesManagement from '@/components/admin/RulesManagement';
import ChampionManagement from '@/components/admin/ChampionManagement';

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

interface Match {
  id: number;
  date: string;
  time: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <AdminHeader onLogout={handleLogout} />

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
            <TeamsManagement teams={teams} setTeams={setTeams} />
          </TabsContent>

          <TabsContent value="matches">
            <MatchesManagement matches={matches} setMatches={setMatches} />
          </TabsContent>

          <TabsContent value="playoffs">
            <PlayoffsManagement 
              playoffBracket={playoffBracket} 
              setPlayoffBracket={setPlayoffBracket} 
            />
          </TabsContent>

          <TabsContent value="rules">
            <RulesManagement rules={rules} setRules={setRules} />
          </TabsContent>

          <TabsContent value="champion">
            <ChampionManagement champion={champion} setChampion={setChampion} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
