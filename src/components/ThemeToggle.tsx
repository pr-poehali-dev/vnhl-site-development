import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
      title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    >
      {theme === 'dark' ? (
        <Icon name="Sun" size={20} />
      ) : (
        <Icon name="Moon" size={20} />
      )}
    </Button>
  );
};

export default ThemeToggle;
