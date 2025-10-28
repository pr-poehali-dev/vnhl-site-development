import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Team {
  id: number;
  name: string;
  games: number;
  wins: number;
  losses: number;
  goals: number;
  points: number;
  logo: string;
  conference: string;
}

interface SortableTeamItemProps {
  team: Team;
  updateTeam: (id: number, field: keyof Team, value: any) => void;
  deleteTeam: (id: number) => void;
}

function SortableTeamItem({ team, updateTeam, deleteTeam }: SortableTeamItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: team.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className={isDragging ? 'shadow-lg' : ''}>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center">
          <div
            className="cursor-grab active:cursor-grabbing flex items-center justify-center"
            {...attributes}
            {...listeners}
          >
            <Icon name="GripVertical" size={24} className="text-muted-foreground" />
          </div>
          <Input
            value={team.logo}
            onChange={(e) => updateTeam(team.id, 'logo', e.target.value)}
            placeholder="🏒"
            className="text-center text-2xl"
          />
          <Input
            value={team.name}
            onChange={(e) => updateTeam(team.id, 'name', e.target.value)}
            className="md:col-span-2"
          />
          <select
            value={team.conference}
            onChange={(e) => updateTeam(team.id, 'conference', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="Восточная">Восточная</option>
            <option value="Западная">Западная</option>
          </select>
          <Input
            type="number"
            value={team.wins}
            onChange={(e) => updateTeam(team.id, 'wins', parseInt(e.target.value))}
            placeholder="В"
          />
          <Input
            type="number"
            value={team.losses}
            onChange={(e) => updateTeam(team.id, 'losses', parseInt(e.target.value))}
            placeholder="П"
          />
          <Input
            type="number"
            value={team.goals}
            onChange={(e) => updateTeam(team.id, 'goals', parseInt(e.target.value))}
            placeholder="Голы"
          />
          <Input
            type="number"
            value={team.points}
            onChange={(e) => updateTeam(team.id, 'points', parseInt(e.target.value))}
            placeholder="О"
          />
          <Button variant="destructive" onClick={() => deleteTeam(team.id)}>
            <Icon name="Trash2" size={20} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface TeamsManagementProps {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
}

const TeamsManagement = ({ teams, setTeams }: TeamsManagementProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateTeam = (id: number, field: keyof Team, value: any) => {
    setTeams(teams.map(team => 
      team.id === id ? { ...team, [field]: value } : team
    ));
  };

  const addTeam = () => {
    const newId = Math.max(...teams.map(t => t.id), 0) + 1;
    setTeams([...teams, {
      id: newId,
      name: 'Новая команда',
      games: 0,
      wins: 0,
      losses: 0,
      goals: 0,
      points: 0,
      logo: '⭐',
      conference: 'Восточная'
    }]);
  };

  const deleteTeam = (id: number) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = teams.findIndex((team) => team.id === active.id);
      const newIndex = teams.findIndex((team) => team.id === over.id);

      setTeams(arrayMove(teams, oldIndex, newIndex));
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Управление командами</CardTitle>
          <Button onClick={addTeam}>
            <Icon name="Plus" className="mr-2" size={20} />
            Добавить команду
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Icon name="Info" size={16} />
            Перетаскивайте команды за иконку, чтобы изменить их порядок в таблице
          </p>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={teams.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {teams.map((team) => (
                <SortableTeamItem
                  key={team.id}
                  team={team}
                  updateTeam={updateTeam}
                  deleteTeam={deleteTeam}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
};

export default TeamsManagement;
