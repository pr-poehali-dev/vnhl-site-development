import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-secondary text-white py-4 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-oswald font-bold">Админ-панель VNHL</h1>
          <Button variant="outline" onClick={onLogout}>
            <Icon name="LogOut" className="mr-2" size={20} />
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
