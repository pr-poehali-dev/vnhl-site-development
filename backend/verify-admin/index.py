'''
Business: Verify admin password securely using bcrypt hash comparison
Args: event - dict with httpMethod, body (contains password)
      context - object with request_id attribute
Returns: HTTP response with authentication result
'''
import json
import os
import bcrypt
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    # Get password from request
    body_str = event.get('body', '{}')
    if not body_str or body_str.strip() == '':
        body_str = '{}'
    
    body_data = json.loads(body_str)
    password: str = body_data.get('password', '')
    
    if not password:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Password required'}),
            'isBase64Encoded': False
        }
    
    # Get hash from environment
    stored_hash: str = os.environ.get('ADMIN_PASSWORD_HASH', '')
    
    if not stored_hash:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Admin password not configured'}),
            'isBase64Encoded': False
        }
    
    # Verify password
    try:
        password_bytes = password.encode('utf-8')
        hash_bytes = stored_hash.encode('utf-8')
        
        is_valid = bcrypt.checkpw(password_bytes, hash_bytes)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'valid': is_valid,
                'message': 'Password verified' if is_valid else 'Invalid password'
            }),
            'isBase64Encoded': False
        }
    except (ValueError, TypeError) as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Verification failed: {str(e)}'}),
            'isBase64Encoded': False
        }