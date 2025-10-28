import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Rule {
  title: string;
  content: string;
}

interface RulesManagementProps {
  rules: Rule[];
  setRules: (rules: Rule[]) => void;
}

const RulesManagement = ({ rules, setRules }: RulesManagementProps) => {
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
  );
};

export default RulesManagement;
