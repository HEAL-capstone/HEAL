# test_server.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/endpoint", methods=["POST"])
def endpoint():
    data = request.get_json()
    print("Received data:", data)  # 받은 데이터 출력
    return jsonify({"message": "Recommendations received successfully"})

if __name__ == "__main__":
    app.run(port=8080)  # 다른 포트 번호 사용
