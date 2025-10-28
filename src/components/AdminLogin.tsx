import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { verifyPassword, login } from '@/lib/auth';
import Icon from '@/components/ui/icon';

interface AdminLoginProps {
  onSuccess: () => void;
  onBack?: () => void;
}

const LOCK_DURATION = 15 * 60 * 1000;
const MAX_ATTEMPTS = 3;

const AdminLogin = ({ onSuccess, onBack }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const savedLockUntil = localStorage.getItem('vnhl_login_lock');
    if (savedLockUntil) {
      const lockTime = parseInt(savedLockUntil);
      if (lockTime > Date.now()) {
        setLockUntil(lockTime);
      } else {
        localStorage.removeItem('vnhl_login_lock');
        localStorage.removeItem('vnhl_login_attempts');
      }
    }

    const savedAttempts = localStorage.getItem('vnhl_login_attempts');
    if (savedAttempts) {
      setAttempts(parseInt(savedAttempts));
    }
  }, []);

  useEffect(() => {
    if (lockUntil && lockUntil > Date.now()) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, lockUntil - Date.now());
        setRemainingTime(remaining);
        
        if (remaining === 0) {
          setLockUntil(null);
          setAttempts(0);
          localStorage.removeItem('vnhl_login_lock');
          localStorage.removeItem('vnhl_login_attempts');
          setError('');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lockUntil]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lockUntil && lockUntil > Date.now()) {
      return;
    }

    setLoading(true);
    setError('');

    const isValid = await verifyPassword(password);
    
    if (isValid) {
      login();
      localStorage.removeItem('vnhl_login_lock');
      localStorage.removeItem('vnhl_login_attempts');
      setAttempts(0);
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('vnhl_login_attempts', newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockTime = Date.now() + LOCK_DURATION;
        setLockUntil(lockTime);
        localStorage.setItem('vnhl_login_lock', lockTime.toString());
        setError(`Превышен лимит попыток входа. Попробуйте через 15 минут.`);
      } else {
        setError(`Неверный пароль. Осталось попыток: ${MAX_ATTEMPTS - newAttempts}`);
      }
    }
    
    setLoading(false);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const isLocked = lockUntil && lockUntil > Date.now();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Icon name={isLocked ? "ShieldAlert" : "Lock"} size={48} className={isLocked ? "text-destructive" : "text-primary"} />
          </div>
          <CardTitle className="text-3xl font-oswald">Вход в админ-панель</CardTitle>
        </CardHeader>
        <CardContent>
          {isLocked ? (
            <div className="space-y-4">
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4 text-center">
                <p className="text-destructive font-semibold mb-2">Доступ временно заблокирован</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Превышен лимит попыток входа
                </p>
                <div className="text-2xl font-oswald font-bold text-destructive">
                  {formatTime(remainingTime)}
                </div>
                <p className="text-xs text-muted-foreground mt-2">до разблокировки</p>
              </div>
              {onBack && (
                <Button type="button" variant="outline" onClick={onBack} className="w-full text-lg">
                  <Icon name="ArrowLeft" className="mr-2" size={20} />
                  Назад
                </Button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-lg"
                  autoFocus
                  disabled={loading}
                />
                {error && (
                  <p className="text-destructive text-sm mt-2">{error}</p>
                )}
                {attempts > 0 && attempts < MAX_ATTEMPTS && (
                  <p className="text-amber-600 text-sm mt-2">
                    Осталось попыток: {MAX_ATTEMPTS - attempts}
                  </p>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;