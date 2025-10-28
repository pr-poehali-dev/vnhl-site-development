import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Rule {
  title: string;
  content: string;
}

interface RulesTabProps {
  rules: Rule[];
}

const RulesTab = ({ rules }: RulesTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rules.map((rule: any, idx: number) => (
        <Card key={idx} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-oswald">
              <Icon name="BookOpen" className="text-primary" size={24} />
              {rule.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{rule.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RulesTab;
