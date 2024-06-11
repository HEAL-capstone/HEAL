from flask import Flask, jsonify, render_template, request, app
import sqlite3
import pandas as pd
from model import recommend_supplements
import requests
app = Flask(__name__)

# 데이터베이스에서 영양제 데이터 불러오기
def fetch_supplement_data_from_db():
    conn = sqlite3.connect('supplements.db')
    df = pd.read_sql_query("SELECT * FROM supplements", conn)
    conn.close()
    return df
# 영양제 데이터 로드 (애플리케이션 시작 시 한 번 실행)
df_original = fetch_supplement_data_from_db()

# @app.route("/", methods=["GET", "POST"])
# def index():
#     recommendations = []
#     if request.method == "POST":
#         user_input = request.form["user_input"]
#         recommendations = recommend_supplements(user_input)  # model.py 함수 호출

#     return render_template("index.html", recommendations=recommendations, df=df_original)

# if __name__ == "__main__":
#     app.run(host='0.0.0.0', port=5000, debug=True)


@app.route("/recommend", methods=["POST"])
def recommend():
    user_input = request.json["user_input"]  # JSON 데이터에서 입력 받기
    recommendations = recommend_supplements(user_input)

    # 추천 결과를 JSON 형식으로 변환
    result = []
    for index in recommendations:
        result.append({
            "PRDLST_NM": df_original.iloc[index]['PRDLST_NM'],
            "PRIMARY_FNCLTY": df_original.iloc[index]['PRIMARY_FNCLTY']
        })
        
    app.logger.info(f"JSON Response: {result}")
    # 다른 서버로 추천 결과 전송
    target_server_url = "http://localhost:8080/endpoint"  # 다른 서버의 엔드포인트 URL
    try:
        response = requests.post(target_server_url, json=result)
        response.raise_for_status()  # 응답 상태 코드 확인
        app.logger.info("Successfully sent recommendations to target server")
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Failed to send recommendations: {e}")
    return jsonify(result)  # JSON 응답 반환

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)