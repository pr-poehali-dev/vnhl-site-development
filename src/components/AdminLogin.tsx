import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { verifyPassword, login } from '@/lib/auth';
import Icon from '@/components/ui/icon';

interface AdminLoginProps {
  onSuccess: () => void;
  onBack?: () => void;
}

const AdminLogin = ({ onSuccess, onBack }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const isValid = await verifyPassword(password);
    
    if (isValid) {
      login();
      onSuccess();
    } else {
      setError('Неверный пароль');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Icon name="Lock" size={48} className="text-primary" />
          </div>
          <CardTitle className="text-3xl font-oswald">Вход в админ-панель</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-lg"
                autoFocus
              />
              {error && (
                <p className="text-destructive text-sm mt-2">{error}</p>
              )}
            </div>
            <div className="flex gap-3">
              {onBack && (
                <Button type="button" variant="outline" onClick={onBack} className="flex-1 text-lg">
                  <Icon name="ArrowLeft" className="mr-2" size={20} />
                  Назад
                </Button>
              )}
              <Button type="submit" className={`text-lg ${onBack ? 'flex-1' : 'w-full'}`} disabled={loading}>
                {loading ? 'Проверка...' : 'Войти'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;