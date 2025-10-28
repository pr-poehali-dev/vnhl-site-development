import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import AdminLogin from '@/components/AdminLogin';
import AdminPanel from '@/components/AdminPanel';
import StandingsTab from '@/components/StandingsTab';
import ScheduleTab from '@/components/ScheduleTab';
import PlayoffsTab from '@/components/PlayoffsTab';
import ChampionTab from '@/components/ChampionTab';
import RulesTab from '@/components/RulesTab';
import { isAuthenticated } from '@/lib/auth';
import {
  initialTeams,
  initialMatches,
  initialPlayoffBracket,
  initialRules,
  initialChampion,
} from '@/data/initialData';

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('standings');

  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('vnhl_teams');
    return saved ? JSON.parse(saved) : initialTeams;
  });

  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem('vnhl_matches');
    return saved ? JSON.parse(saved) : initialMatches;
  });

  const [playoffBracket, setPlayoffBracket] = useState(() => {
    const saved = localStorage.getItem('vnhl_playoffs');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.roundOf16?.length === 6 && parsed.quarterFinals?.length === 3) {
        return parsed;
      }
    }
    localStorage.setItem('vnhl_playoffs', JSON.stringify(initialPlayoffBracket));
    return initialPlayoffBracket;
  });

  const [rules, setRules] = useState(() => {
    const saved = localStorage.getItem('vnhl_rules');
    return saved ? JSON.parse(saved) : initialRules;
  });

  const [champion, setChampion] = useState(() => {
    const saved = localStorage.getItem('vnhl_champion');
    return saved ? JSON.parse(saved) : initialChampion;
  });

  const [siteIcon, setSiteIcon] = useState(() => {
    const saved = localStorage.getItem('vnhl_site_icon');
    return saved || '🏒';
  });

  useEffect(() => {
    localStorage.setItem('vnhl_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('vnhl_matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('vnhl_playoffs', JSON.stringify(playoffBracket));
  }, [playoffBracket]);

  useEffect(() => {
    localStorage.setItem('vnhl_rules', JSON.stringify(rules));
  }, [rules]);

  useEffect(() => {
    localStorage.setItem('vnhl_champion', JSON.stringify(champion));
  }, [champion]);

  useEffect(() => {
    localStorage.setItem('vnhl_site_icon', siteIcon);
  }, [siteIcon]);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  if (showAdmin && !authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} onBack={() => setShowAdmin(false)} />;
  }

  if (showAdmin && authenticated) {
    return (
      <AdminPanel
        teams={teams}
        setTeams={setTeams}
        matches={matches}
        setMatches={setMatches}
        playoffBracket={playoffBracket}
        setPlayoffBracket={setPlayoffBracket}
        rules={rules}
        setRules={setRules}
        champion={champion}
        setChampion={setChampion}
        siteIcon={siteIcon}
        setSiteIcon={setSiteIcon}
        onLogout={() => {
          setAuthenticated(false);
          setShowAdmin(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <header className="bg-secondary text-white py-6 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl flex items-center justify-center w-16 h-16">
                {siteIcon.startsWith('data:') || siteIcon.startsWith('http') ? (
                  <img src={siteIcon} alt="VNHL" className="w-full h-full object-contain" />
                ) : (
                  <span>{siteIcon}</span>
                )}
              </div>
              <div>
                <h1 className="text-5xl font-oswald font-bold tracking-wider">VNHL</h1>
                <p className="text-sm text-muted-foreground mt-1">Виртуальная Национальная Хоккейная Лига</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="default" onClick={() => setShowAdmin(true)} className="bg-white text-secondary hover:bg-gray-100">
                <Icon name="Settings" className="mr-2" size={20} />
                Админ-Панель
              </Button>
            </div>
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
            <StandingsTab teams={teams} />
          </TabsContent>

          <TabsContent value="schedule" className="animate-fade-in">
            <ScheduleTab matches={matches} />
          </TabsContent>

          <TabsContent value="playoffs" className="animate-fade-in">
            <PlayoffsTab playoffBracket={playoffBracket} />
          </TabsContent>

          <TabsContent value="champion" className="animate-fade-in">
            <ChampionTab champion={champion} />
          </TabsContent>

          <TabsContent value="rules" className="animate-fade-in">
            <RulesTab rules={rules} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-secondary text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-3xl">🏒</div>
            <h2 className="text-2xl font-oswald font-bold">VNHL</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Виртуальная Национальная Хоккейная Лига
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 VNHL. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;