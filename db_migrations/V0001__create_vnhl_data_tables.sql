-- Создание таблицы для настроек сайта
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    site_icon TEXT DEFAULT '🏒',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы команд
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    games INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    goals INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0,
    logo TEXT DEFAULT '⭐',
    conference TEXT DEFAULT 'Восточная',
    position INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы матчей
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    team1 TEXT NOT NULL,
    team2 TEXT NOT NULL,
    score TEXT DEFAULT '',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы плей-офф
CREATE TABLE IF NOT EXISTS playoff_matches (
    id SERIAL PRIMARY KEY,
    round TEXT NOT NULL,
    match_index INTEGER NOT NULL,
    team1 TEXT NOT NULL,
    team2 TEXT NOT NULL,
    score1 INTEGER DEFAULT 0,
    score2 INTEGER DEFAULT 0,
    winner TEXT DEFAULT '',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы правил
CREATE TABLE IF NOT EXISTS rules (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    position INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы чемпиона
CREATE TABLE IF NOT EXISTS champion (
    id INTEGER PRIMARY KEY DEFAULT 1,
    team_name TEXT DEFAULT 'TBD',
    logo TEXT DEFAULT '🏆',
    season TEXT DEFAULT '',
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    mvp TEXT DEFAULT '',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальной записи настроек
INSERT INTO site_settings (site_icon) VALUES ('🏒');

-- Вставка начальной записи чемпиона
INSERT INTO champion (id, team_name, logo, season) VALUES (1, 'TBD', '🏆', '2024-2025');