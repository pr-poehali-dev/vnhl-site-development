import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Champion {
  name: string;
  logo: string;
  wins: number;
  playoffRecord: string;
  goals: number;
  season: string;
}

interface ChampionTabProps {
  champion: Champion;
}

const ChampionTab = ({ champion }: ChampionTabProps) => {
  return (
    <Card className="border-4 border-primary">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/5 text-center pb-8">
        <div className="text-8xl mb-4">{champion.logo}</div>
        <CardTitle className="text-5xl font-oswald mb-2">{champion.name}</CardTitle>
        <Badge variant="default" className="text-xl px-6 py-2">
          Чемпион сезона {champion.season}
        </Badge>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
            <CardContent className="text-center p-6">
              <Icon name="Trophy" className="mx-auto mb-3 text-green-600" size={40} />
              <div className="text-4xl font-bold text-green-600 mb-2">{champion.wins}</div>
              <div className="text-sm text-muted-foreground font-medium">Побед</div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="text-center p-6">
              <Icon name="Target" className="mx-auto mb-3 text-blue-600" size={40} />
              <div className="text-4xl font-bold text-blue-600 mb-2">{champion.playoffRecord}</div>
              <div className="text-sm text-muted-foreground font-medium">Плей-офф</div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200">
            <CardContent className="text-center p-6">
              <Icon name="Zap" className="mx-auto mb-3 text-orange-600" size={40} />
              <div className="text-4xl font-bold text-orange-600 mb-2">{champion.goals}</div>
              <div className="text-sm text-muted-foreground font-medium">Голов</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8 p-6 bg-muted/50 rounded-lg">
          <p className="text-lg text-muted-foreground font-medium">
            Победитель Кубка VNHL сезона {champion.season}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChampionTab;
