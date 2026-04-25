"""
API для блога AFisht Radio: получение, создание, редактирование и удаление постов.
Создание/редактирование/удаление — только для администратора (проверка пароля).
"""
import json
import os
import psycopg2

SCHEMA = os.environ['MAIN_DB_SCHEMA']
CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def check_admin(headers: dict) -> bool:
    password = os.environ.get('ADMIN_PASSWORD', '')
    provided = headers.get('x-admin-password', '') or headers.get('X-Admin-Password', '')
    return provided == password

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    headers = event.get('headers') or {}

    # GET /  — список всех постов
    if method == 'GET' and not params.get('id'):
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, title, content, created_at, updated_at FROM {SCHEMA}.posts ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        conn.close()
        posts = [
            {'id': r[0], 'title': r[1], 'content': r[2],
             'created_at': r[3].isoformat(), 'updated_at': r[4].isoformat()}
            for r in rows
        ]
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(posts)}

    # GET /?id=X — один пост
    if method == 'GET' and params.get('id'):
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, title, content, created_at, updated_at FROM {SCHEMA}.posts WHERE id = %s",
            (params['id'],)
        )
        r = cur.fetchone()
        conn.close()
        if not r:
            return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'Not found'})}
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(
            {'id': r[0], 'title': r[1], 'content': r[2],
             'created_at': r[3].isoformat(), 'updated_at': r[4].isoformat()}
        )}

    # POST / — создать пост (только админ)
    if method == 'POST':
        if not check_admin(headers):
            return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Forbidden'})}
        body = json.loads(event.get('body') or '{}')
        title = body.get('title', '').strip()
        content = body.get('content', '').strip()
        if not title or not content:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'title and content required'})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.posts (title, content) VALUES (%s, %s) RETURNING id, created_at",
            (title, content)
        )
        row = cur.fetchone()
        conn.commit()
        conn.close()
        return {'statusCode': 201, 'headers': CORS, 'body': json.dumps(
            {'id': row[0], 'title': title, 'content': content, 'created_at': row[1].isoformat()}
        )}

    # PUT /?id=X — редактировать пост (только админ)
    if method == 'PUT':
        if not check_admin(headers):
            return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Forbidden'})}
        post_id = params.get('id')
        if not post_id:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'id required'})}
        body = json.loads(event.get('body') or '{}')
        title = body.get('title', '').strip()
        content = body.get('content', '').strip()
        if not title or not content:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'title and content required'})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"UPDATE {SCHEMA}.posts SET title=%s, content=%s, updated_at=NOW() WHERE id=%s RETURNING id",
            (title, content, post_id)
        )
        if not cur.fetchone():
            conn.close()
            return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'Not found'})}
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    # DELETE /?id=X — удалить пост (только админ)
    if method == 'DELETE':
        if not check_admin(headers):
            return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Forbidden'})}
        post_id = params.get('id')
        if not post_id:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'id required'})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {SCHEMA}.posts WHERE id=%s RETURNING id", (post_id,))
        if not cur.fetchone():
            conn.close()
            return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'Not found'})}
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}