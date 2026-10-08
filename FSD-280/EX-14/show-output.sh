NAME="test$(date +%s)"
EMAIL="$NAME@example.com"
curl -s -X POST http://localhost:3004/register -H 'Content-Type: application/json' -d "{\"username\":\"$NAME\",\"email\":\"$EMAIL\",\"password\":\"pass123\"}"
echo
curl -s -X POST http://localhost:3004/login -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\",\"password\":\"pass123\"}" | tee /tmp/token.json
echo
TOKEN=$(python3 -c "import json;print(json.load(open('/tmp/token.json'))['token'])")
curl -s http://localhost:3004/profile -H "Authorization: Bearer $TOKEN"
echo
