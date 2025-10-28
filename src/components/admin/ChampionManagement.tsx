import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Champion {
  name: string;
  logo: string;
  wins: number;
  playoffRecord: string;
  goals: number;
  season: string;
}

interface ChampionManagementProps {
  champion: Champion;
  setChampion: (champion: Champion) => void;
}

const ChampionManagement = ({ champion, setChampion }: ChampionManagementProps) => {
  return (
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
  );
};

export default ChampionManagement;
