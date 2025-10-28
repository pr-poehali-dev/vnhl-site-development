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
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
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
      <header className="bg-secondary text-white py-4 md:py-6 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-3xl md:text-5xl flex items-center justify-center w-10 h-10 md:w-16 md:h-16">
                {siteIcon.startsWith('data:') || siteIcon.startsWith('http') ? (
                  <img src={siteIcon} alt="VNHL" className="w-full h-full object-contain" />
                ) : (
                  <span>{siteIcon}</span>
                )}
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-oswald font-bold tracking-wider">VNHL</h1>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 hidden sm:block">Виртуальная Национальная Хоккейная Лига</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle />
              <Button variant="default" onClick={() => setShowAdmin(true)} className="bg-white text-secondary hover:bg-gray-100 text-sm md:text-base">
                <Icon name="Settings" className="mr-0 md:mr-2" size={20} />
                <span className="hidden sm:inline">Админ-Панель</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4 md:mb-8 h-auto md:h-14">
            <TabsTrigger value="standings" className="text-xs md:text-base font-oswald flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
              <Icon name="Trophy" className="md:mr-2" size={16} />
              <span className="hidden sm:inline">Таблица</span>
              <span className="sm:hidden">📊</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-xs md:text-base font-oswald flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
              <Icon name="Calendar" className="md:mr-2" size={16} />
              <span className="hidden sm:inline">Календарь</span>
              <span className="sm:hidden">📅</span>
            </TabsTrigger>
            <TabsTrigger value="playoffs" className="text-xs md:text-base font-oswald flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
              <Icon name="Target" className="md:mr-2" size={16} />
              <span className="hidden sm:inline">Плей-офф</span>
              <span className="sm:hidden">🎯</span>
            </TabsTrigger>
            <TabsTrigger value="champion" className="text-xs md:text-base font-oswald flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
              <Icon name="Award" className="md:mr-2" size={16} />
              <span className="hidden sm:inline">Чемпион</span>
              <span className="sm:hidden">🏆</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="text-xs md:text-base font-oswald flex-col md:flex-row gap-1 md:gap-2 py-2 md:py-0">
              <Icon name="BookOpen" className="md:mr-2" size={16} />
              <span className="hidden sm:inline">Правила</span>
              <span className="sm:hidden">📖</span>
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