"""
Business: API для управления данными VNHL - команды, матчи, плей-офф, правила, чемпион
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с request_id, function_name и другими атрибутами
Returns: HTTP response dict со статусом и данными в формате JSON
"""

import json
import os
from typing import Dict, Any, List, Optional
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Создаёт подключение к базе данных"""
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def serialize_row(row):
    """Конвертирует строку БД в JSON-совместимый dict"""
    result = dict(row)
    for key, value in result.items():
        if isinstance(value, datetime):
            result[key] = value.isoformat()
    return result

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path = event.get('queryStringParameters', {}).get('path', '')
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            if path == 'teams':
                cur.execute('SELECT * FROM teams ORDER BY position ASC')
                teams = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([serialize_row(row) for row in teams]),
                    'isBase64Encoded': False
                }
            
            elif path == 'matches':
                cur.execute('SELECT * FROM matches ORDER BY id ASC')
                matches = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([serialize_row(row) for row in matches]),
                    'isBase64Encoded': False
                }
            
            elif path == 'playoffs':
                cur.execute('SELECT * FROM playoff_matches ORDER BY round, match_index ASC')
                playoff_matches = cur.fetchall()
                
                bracket = {
                    'roundOf16': [],
                    'quarterFinals': [],
                    'semiFinals': [],
                    'final': None
                }
                
                for match in playoff_matches:
                    match_dict = serialize_row(match)
                    round_type = match_dict['round']
                    if round_type == 'roundOf16':
                        bracket['roundOf16'].append(match_dict)
                    elif round_type == 'quarterFinals':
                        bracket['quarterFinals'].append(match_dict)
                    elif round_type == 'semiFinals':
                        bracket['semiFinals'].append(match_dict)
                    elif round_type == 'final':
                        bracket['final'] = match_dict
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(bracket),
                    'isBase64Encoded': False
                }
            
            elif path == 'rules':
                cur.execute('SELECT * FROM rules ORDER BY position ASC')
                rules = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([serialize_row(row) for row in rules]),
                    'isBase64Encoded': False
                }
            
            elif path == 'champion':
                cur.execute('SELECT * FROM champion WHERE id = 1')
                champion = cur.fetchone()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(serialize_row(champion) if champion else {}),
                    'isBase64Encoded': False
                }
            
            elif path == 'settings':
                cur.execute('SELECT * FROM site_settings ORDER BY id DESC LIMIT 1')
                settings = cur.fetchone()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(serialize_row(settings) if settings else {}),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            if path == 'teams':
                teams_data = body_data.get('teams', [])
                cur.execute('DELETE FROM teams')
                
                for idx, team in enumerate(teams_data):
                    cur.execute(
                        "INSERT INTO teams (id, name, games, wins, losses, goals, points, logo, conference, position) "
                        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                        (team['id'], team['name'], team['games'], team['wins'], team['losses'], 
                         team['goals'], team['points'], team['logo'], team['conference'], idx)
                    )
                
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
            
            elif path == 'matches':
                matches_data = body_data.get('matches', [])
                cur.execute('DELETE FROM matches')
                
                for match in matches_data:
                    cur.execute(
                        "INSERT INTO matches (id, date, time, team1, team2, score) "
                        "VALUES (%s, %s, %s, %s, %s, %s)",
                        (match['id'], match['date'], match['time'], match['team1'], match['team2'], match['score'])
                    )
                
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
            
            elif path == 'playoffs':
                bracket = body_data.get('bracket', {})
                cur.execute('DELETE FROM playoff_matches')
                
                match_id = 1
                for round_type in ['roundOf16', 'quarterFinals', 'semiFinals']:
                    matches = bracket.get(round_type, [])
                    for idx, match in enumerate(matches):
                        cur.execute(
                            "INSERT INTO playoff_matches (id, round, match_index, team1, team2, score1, score2, winner) "
                            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                            (match_id, round_type, idx, match['team1'], match['team2'], 
                             match['score1'], match['score2'], match['winner'])
                        )
                        match_id += 1
                
                final = bracket.get('final')
                if final:
                    cur.execute(
                        "INSERT INTO playoff_matches (id, round, match_index, team1, team2, score1, score2, winner) "
                        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                        (match_id, 'final', 0, final['team1'], final['team2'], 
                         final['score1'], final['score2'], final['winner'])
                    )
                
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
            
            elif path == 'rules':
                rules_data = body_data.get('rules', [])
                cur.execute('DELETE FROM rules')
                
                for idx, rule in enumerate(rules_data):
                    cur.execute(
                        "INSERT INTO rules (id, title, content, position) VALUES (%s, %s, %s, %s)",
                        (rule['id'], rule['title'], rule['content'], idx)
                    )
                
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
            
            elif path == 'champion':
                champion_data = body_data.get('champion', {})
                cur.execute(
                    "UPDATE champion SET team_name = %s, logo = %s, season = %s, wins = %s, losses = %s, mvp = %s "
                    "WHERE id = 1",
                    (champion_data.get('teamName', 'TBD'), champion_data.get('logo', '🏆'), 
                     champion_data.get('season', ''), champion_data.get('wins', 0), 
                     champion_data.get('losses', 0), champion_data.get('mvp', ''))
                )
                
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
            
            elif path == 'settings':
                settings_data = body_data.get('settings', {})
                cur.execute('DELETE FROM site_settings')
                cur.execute(
                    "INSERT INTO site_settings (site_icon) VALUES (%s)",
                    (settings_data.get('siteIcon', '🏒'),)
                )
                
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid request'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()