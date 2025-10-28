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
import { api } from '@/lib/api';
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

  const [teams, setTeams] = useState(initialTeams);
  const [matches, setMatches] = useState(initialMatches);
  const [playoffBracket, setPlayoffBracket] = useState(initialPlayoffBracket);
  const [rules, setRules] = useState(initialRules);
  const [champion, setChampion] = useState(initialChampion);
  const [siteIcon, setSiteIcon] = useState('🏒');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [teamsData, matchesData, playoffsData, rulesData, championData, settingsData] = await Promise.all([
        api.getTeams(),
        api.getMatches(),
        api.getPlayoffs(),
        api.getRules(),
        api.getChampion(),
        api.getSettings()
      ]);

      if (teamsData.length > 0) {
        setTeams(teamsData);
      } else {
        const localTeams = localStorage.getItem('vnhl_teams');
        if (localTeams) {
          const parsedTeams = JSON.parse(localTeams);
          setTeams(parsedTeams);
          await api.saveTeams(parsedTeams);
        }
      }

      if (matchesData.length > 0) {
        setMatches(matchesData);
      } else {
        const localMatches = localStorage.getItem('vnhl_matches');
        if (localMatches) {
          const parsedMatches = JSON.parse(localMatches);
          setMatches(parsedMatches);
          await api.saveMatches(parsedMatches);
        }
      }

      if (playoffsData.roundOf16) {
        setPlayoffBracket(playoffsData);
      } else {
        const localPlayoffs = localStorage.getItem('vnhl_playoffs');
        if (localPlayoffs) {
          const parsedPlayoffs = JSON.parse(localPlayoffs);
          setPlayoffBracket(parsedPlayoffs);
          await api.savePlayoffs(parsedPlayoffs);
        }
      }

      if (rulesData) {
        setRules(rulesData);
      } else {
        const localRules = localStorage.getItem('vnhl_rules');
        if (localRules) {
          const parsedRules = JSON.parse(localRules);
          setRules(parsedRules);
          await api.saveRules(parsedRules);
        }
      }

      if (championData.teamName) {
        setChampion(championData);
      } else {
        const localChampion = localStorage.getItem('vnhl_champion');
        if (localChampion) {
          const parsedChampion = JSON.parse(localChampion);
          setChampion(parsedChampion);
          await api.saveChampion(parsedChampion);
        }
      }

      if (settingsData) {
        setSiteIcon(settingsData);
      } else {
        const localIcon = localStorage.getItem('vnhl_site_icon');
        if (localIcon) {
          setSiteIcon(localIcon);
          await api.saveSettings('site_icon', localIcon);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTeamsToDb = async (newTeams: any[]) => {
    setTeams(newTeams);
    await api.saveTeams(newTeams);
  };

  const saveMatchesToDb = async (newMatches: any[]) => {
    setMatches(newMatches);
    await api.saveMatches(newMatches);
  };

  const savePlayoffsToDb = async (newBracket: any) => {
    setPlayoffBracket(newBracket);
    await api.savePlayoffs(newBracket);
  };

  const saveRulesToDb = async (newRules: any[]) => {
    setRules(newRules);
    await api.saveRules(newRules);
  };

  const saveChampionToDb = async (newChampion: any) => {
    setChampion(newChampion);
    await api.saveChampion(newChampion);
  };

  const saveSiteIconToDb = async (newIcon: string) => {
    setSiteIcon(newIcon);
    await api.saveSettings('site_icon', newIcon);
  };

  if (showAdmin && !authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} onBack={() => setShowAdmin(false)} />;
  }

  if (showAdmin && authenticated) {
    return (
      <AdminPanel
        teams={teams}
        setTeams={saveTeamsToDb}
        matches={matches}
        setMatches={saveMatchesToDb}
        playoffBracket={playoffBracket}
        setPlayoffBracket={savePlayoffsToDb}
        rules={rules}
        setRules={saveRulesToDb}
        champion={champion}
        setChampion={saveChampionToDb}
        siteIcon={siteIcon}
        setSiteIcon={saveSiteIconToDb}
        onLogout={() => {
          setAuthenticated(false);
          setShowAdmin(false);
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Загрузка...</div>
      </div>
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
                  <img src={siteIcon} alt="VNHL" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen" />
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