export const initialTeams = [
  { id: 1, name: 'Стальные Тигры', games: 30, wins: 22, losses: 6, goals: 145, points: 46, logo: '🐯', conference: 'Восточная' },
  { id: 2, name: 'Ледяные Волки', games: 30, wins: 21, losses: 7, goals: 138, points: 44, logo: '🐺', conference: 'Восточная' },
  { id: 3, name: 'Красные Драконы', games: 30, wins: 20, losses: 8, goals: 132, points: 42, logo: '🐉', conference: 'Восточная' },
  { id: 4, name: 'Полярные Медведи', games: 30, wins: 19, losses: 9, goals: 128, points: 40, logo: '🐻', conference: 'Западная' },
  { id: 5, name: 'Грозовые Ястребы', games: 30, wins: 18, losses: 10, goals: 121, points: 38, logo: '🦅', conference: 'Западная' },
  { id: 6, name: 'Синие Акулы', games: 30, wins: 17, losses: 11, goals: 115, points: 36, logo: '🦈', conference: 'Восточная' },
  { id: 7, name: 'Северные Рыси', games: 30, wins: 16, losses: 12, goals: 109, points: 34, logo: '🐱', conference: 'Западная' },
  { id: 8, name: 'Огненные Фениксы', games: 30, wins: 15, losses: 13, goals: 103, points: 32, logo: '🔥', conference: 'Восточная' },
  { id: 9, name: 'Снежные Барсы', games: 30, wins: 13, losses: 14, goals: 98, points: 29, logo: '❄️', conference: 'Западная' },
  { id: 10, name: 'Гранитные Орлы', games: 30, wins: 12, losses: 16, goals: 92, points: 26, logo: '🦅', conference: 'Западная' },
  { id: 11, name: 'Чёрные Вороны', games: 30, wins: 10, losses: 17, goals: 85, points: 23, logo: '🐦', conference: 'Восточная' },
  { id: 12, name: 'Серебряные Лисы', games: 30, wins: 8, losses: 19, goals: 78, points: 19, logo: '🦊', conference: 'Западная' },
];

export const initialMatches = [
  { id: 1, date: '2025-10-30', time: '19:00', home: 'Стальные Тигры', away: 'Ледяные Волки', homeScore: null, awayScore: null },
  { id: 2, date: '2025-10-30', time: '20:30', home: 'Красные Драконы', away: 'Полярные Медведи', homeScore: null, awayScore: null },
  { id: 3, date: '2025-10-31', time: '18:00', home: 'Грозовые Ястребы', away: 'Синие Акулы', homeScore: null, awayScore: null },
  { id: 4, date: '2025-11-01', time: '19:30', home: 'Северные Рыси', away: 'Огненные Фениксы', homeScore: null, awayScore: null },
  { id: 5, date: '2025-11-02', time: '17:00', home: 'Снежные Барсы', away: 'Гранитные Орлы', homeScore: null, awayScore: null },
  { id: 6, date: '2025-11-02', time: '20:00', home: 'Чёрные Вороны', away: 'Серебряные Лисы', homeScore: null, awayScore: null },
];

export const initialPlayoffBracket = {
  roundOf16: [
    { id: 1, team1: 'Команда 1', team2: 'Команда 16', score1: null, score2: null },
    { id: 2, team1: 'Команда 8', team2: 'Команда 9', score1: null, score2: null },
    { id: 3, team1: 'Команда 4', team2: 'Команда 13', score1: null, score2: null },
    { id: 4, team1: 'Команда 5', team2: 'Команда 12', score1: null, score2: null },
    { id: 5, team1: 'Команда 2', team2: 'Команда 15', score1: null, score2: null },
    { id: 6, team1: 'Команда 7', team2: 'Команда 10', score1: null, score2: null },
    { id: 7, team1: 'Команда 3', team2: 'Команда 14', score1: null, score2: null },
    { id: 8, team1: 'Команда 6', team2: 'Команда 11', score1: null, score2: null },
  ],
  quarterFinals: [
    { id: 9, team1: 'Победитель 1/8 №1', team2: 'Победитель 1/8 №2', score1: null, score2: null },
    { id: 10, team1: 'Победитель 1/8 №3', team2: 'Победитель 1/8 №4', score1: null, score2: null },
    { id: 11, team1: 'Победитель 1/8 №5', team2: 'Победитель 1/8 №6', score1: null, score2: null },
    { id: 12, team1: 'Победитель 1/8 №7', team2: 'Победитель 1/8 №8', score1: null, score2: null },
  ],
  semiFinals: [
    { id: 13, team1: 'Победитель 1/4 №1', team2: 'Победитель 1/4 №2', score1: null, score2: null },
    { id: 14, team1: 'Победитель 1/4 №3', team2: 'Победитель 1/4 №4', score1: null, score2: null },
  ],
  final: { id: 15, team1: 'Победитель 1/2 №1', team2: 'Победитель 1/2 №2', score1: null, score2: null },
};

export const initialRules = [
  {
    title: 'Формат регулярного сезона',
    content: 'Каждая команда проводит 30 матчей в регулярном сезоне. За победу в основное время команда получает 2 очка, за победу в овертайме или буллитах - 2 очка, за поражение в овертайме или буллитах - 1 очко, за поражение в основное время - 0 очков.',
  },
  {
    title: 'Формат плей-офф',
    content: 'В плей-офф выходят 8 лучших команд по итогам регулярного сезона. Сетка плей-офф включает 1/4 финала, 1/2 финала и финал. Все серии играются до 4 побед.',
  },
  {
    title: 'Состав команды',
    content: 'Максимальный состав команды - 25 игроков (20 полевых + 3 вратаря + 2 резервных). На матч может быть заявлено не более 20 игроков, включая 2 вратарей.',
  },
  {
    title: 'Игровое время',
    content: 'Матч состоит из 3 периодов по 20 минут чистого времени. В случае ничьей назначается овертайм 5 минут (3 на 3). Если победитель не выявлен - буллиты (3 игрока от каждой команды).',
  },
  {
    title: 'Дисциплина',
    content: 'За грубые нарушения правил игроки получают штрафы: малый штраф - 2 минуты, большой штраф - 5 минут + автоматическое удаление до конца матча. За три больших штрафа в сезоне - дисквалификация на 1 матч.',
  },
];

export const initialChampion = {
  name: 'Стальные Тигры',
  logo: '🐯',
  wins: 52,
  playoffRecord: '16-3',
  goals: 278,
  season: '2024'
};
