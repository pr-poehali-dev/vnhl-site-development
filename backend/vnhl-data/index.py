'''
Business: API для управления данными хоккейной лиги VNHL с хранилищем в JSON файлах
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с request_id, function_name
Returns: HTTP response dict
'''

import json
import os
from typing import Dict, Any
from pathlib import Path

DATA_DIR = Path('/tmp/vnhl_data')
DATA_DIR.mkdir(exist_ok=True)

def read_json_file(filename: str, default: Any) -> Any:
    '''Читает данные из JSON файла'''
    file_path = DATA_DIR / f'{filename}.json'
    if file_path.exists():
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return default

def write_json_file(filename: str, data: Any) -> None:
    '''Записывает данные в JSON файл'''
    file_path = DATA_DIR / f'{filename}.json'
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    query_params = event.get('queryStringParameters') or {}
    resource = query_params.get('resource', '')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        if resource == 'teams':
            if method == 'GET':
                teams = read_json_file('teams', [])
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(teams),
                    'isBase64Encoded': False
                }
            elif method == 'PUT':
                teams = json.loads(event.get('body', '[]'))
                write_json_file('teams', teams)
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
        
        elif resource == 'matches':
            if method == 'GET':
                matches = read_json_file('matches', [])
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(matches),
                    'isBase64Encoded': False
                }
            elif method == 'PUT':
                matches = json.loads(event.get('body', '[]'))
                write_json_file('matches', matches)
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
        
        elif resource == 'playoffs':
            if method == 'GET':
                playoffs = read_json_file('playoffs', {'roundOf16': [], 'quarterFinals': [], 'semiFinals': [], 'final': None})
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(playoffs),
                    'isBase64Encoded': False
                }
            elif method == 'PUT':
                playoffs = json.loads(event.get('body', '{}'))
                write_json_file('playoffs', playoffs)
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
        
        elif resource == 'rules':
            if method == 'GET':
                rules = read_json_file('rules', '')
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'content': rules}),
                    'isBase64Encoded': False
                }
            elif method == 'PUT':
                body_data = json.loads(event.get('body', '{}'))
                rules = body_data.get('content', '')
                write_json_file('rules', rules)
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
        
        elif resource == 'champion':
            if method == 'GET':
                champion = read_json_file('champion', {'team_name': '', 'logo': '🏆', 'year': ''})
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(champion),
                    'isBase64Encoded': False
                }
            elif method == 'PUT':
                champion = json.loads(event.get('body', '{}'))
                write_json_file('champion', champion)
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
        
        elif resource == 'settings':
            if method == 'GET':
                key = query_params.get('key', 'site_icon')
                settings = read_json_file('settings', {})
                value = settings.get(key, '🏒')
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'value': value}),
                    'isBase64Encoded': False
                }
            elif method == 'PUT':
                body_data = json.loads(event.get('body', '{}'))
                key = body_data.get('key', 'site_icon')
                value = body_data.get('value', '')
                settings = read_json_file('settings', {})
                settings[key] = value
                write_json_file('settings', settings)
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Not found'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
