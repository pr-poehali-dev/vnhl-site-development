import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface SiteSettingsProps {
  siteIcon: string;
  setSiteIcon: (icon: string) => void;
}

const SiteSettings = ({ siteIcon, setSiteIcon }: SiteSettingsProps) => {
  const [iconUrl, setIconUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (iconUrl.trim()) {
      setSiteIcon(iconUrl.trim());
      setIconUrl('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSiteIcon(base64String);
        setUploading(false);
      };
      reader.onerror = () => {
        alert('Ошибка при загрузке файла');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Ошибка при загрузке файла');
      setUploading(false);
    }
  };

  const handleReset = () => {
    setSiteIcon('🏒');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Settings" size={24} />
            Настройки сайта
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6 p-4 bg-secondary/10 rounded-lg">
            <div className="text-6xl flex items-center justify-center w-20 h-20 bg-background rounded-lg">
              {siteIcon.startsWith('data:') || siteIcon.startsWith('http') ? (
                <img src={siteIcon} alt="Site icon" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <span>{siteIcon}</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Текущая иконка</h3>
              <p className="text-sm text-muted-foreground">
                Отображается в шапке сайта
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="icon-url" className="text-base font-semibold mb-3 block">
                Загрузить по ссылке
              </Label>
              <form onSubmit={handleUrlSubmit} className="flex gap-2">
                <Input
                  id="icon-url"
                  type="url"
                  placeholder="https://example.com/icon.png"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!iconUrl.trim()}>
                  <Icon name="Link" className="mr-2" size={18} />
                  Применить
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                Вставьте ссылку на изображение и нажмите "Применить"
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">или</span>
              </div>
            </div>

            <div>
              <Label htmlFor="icon-file" className="text-base font-semibold mb-3 block">
                Загрузить с компьютера
              </Label>
              <div className="flex gap-2">
                <Input
                  id="icon-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('icon-file')?.click()}
                  disabled={uploading}
                >
                  <Icon name="Upload" className="mr-2" size={18} />
                  {uploading ? 'Загрузка...' : 'Выбрать файл'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Поддерживаются форматы: PNG, JPG, SVG, GIF
              </p>
            </div>

            <div className="pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="w-full"
              >
                <Icon name="RotateCcw" className="mr-2" size={18} />
                Вернуть стандартную иконку 🏒
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettings;
