import sqlite3
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from konlpy.tag import Okt
import numpy as np
import pickle
import re
import random
import requests
okt = Okt()

# 데이터베이스 연결 및 테이블 생성 
def create_database_and_table():
    conn = sqlite3.connect('supplements.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS supplements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            PRDLST_NM TEXT,
            PRIMARY_FNCLTY TEXT
        )
    ''')
    conn.commit()
    conn.close()

# 데이터베이스에 영양제 데이터 저장 
def save_supplement_data_to_db():
    base_url = "http://openapi.foodsafetykorea.go.kr/api/d8acc265bcbe4fdfb65d/C003/json"
    total_count = 3000
    page_size = 1000
    num_pages = (total_count + page_size - 1) // page_size

    df_all = pd.DataFrame()
    for page in range(1, num_pages + 1):
        start_index = (page - 1) * page_size + 1
        end_index = min(page * page_size, total_count)
        url = f"{base_url}/{start_index}/{end_index}/CHNG_DT=20200101"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            df = pd.DataFrame(data["C003"]["row"])[['PRDLST_NM', 'PRIMARY_FNCLTY']]

            # 특수 문자 제거 및 공백 정리
            df['PRIMARY_FNCLTY'] = df['PRIMARY_FNCLTY'].astype(str).apply(lambda x: re.sub(r'[^\w\s,]', '', x).strip())

            df_all = pd.concat([df_all, df], ignore_index=True)
        else:
            print(f"API 호출 실패 (페이지 {page}): {response.status_code}")

    conn = sqlite3.connect('supplements.db')
    df_all.to_sql('supplements', conn, if_exists='replace', index=False)
    conn.close()


# 데이터베이스에서 영양제 데이터 불러오기
# def fetch_supplement_data_from_db():
#     conn = sqlite3.connect('supplements.db')
#     df = pd.read_sql_query("SELECT * FROM supplements", conn)
#     conn.close()
#     return df

# # 식품안전나라 Open API 호출 (JSON, 전체 데이터)
# def fetch_supplement_data():
#     base_url = "http://openapi.foodsafetykorea.go.kr/api/d8acc265bcbe4fdfb65d/C003/json"
#     url = f"{base_url}/1/1000/CHNG_DT=20200101"
#     response = requests.get(url)

#     if response.status_code == 200:
#         data = response.json()
#         df = pd.DataFrame(data["C003"]["row"])
#         return df[["PRDLST_NM", "PRIMARY_FNCLTY"]]
#     else:
#         print(f"API 호출 실패: {response.status_code}")
#         return None


# 메인 실행 부분
if __name__ == "__main__":
    create_database_and_table()
    save_supplement_data_to_db()
#     df = fetch_supplement_data_from_db()

#     if df is not None:
#         # 원본 기능 데이터 복사
#         df_original = df.copy() 

#         # 전처리된 기능 데이터 생성
#         df['PRIMARY_FNCLTY'] = df["PRIMARY_FNCLTY"].astype(str).apply(morph_and_stopwords)

#         vectorizer = TfidfVectorizer()
#         tfidf_matrix = vectorizer.fit_transform(df["PRIMARY_FNCLTY"].astype(str))

#         while True:
#             user_input = input("현재 겪고 있는 증상이나 건강 상태를 입력하세요 (종료하려면 'quit' 입력): ")
#             if user_input.lower() == 'quit':
#                 break

#             with open('trained_mtx.pkl', 'wb') as fw:
#                 pickle.dump(tfidf_matrix, fw)
#             with open('trained_tf.pkl', 'wb') as fw:
#                 pickle.dump(vectorizer, fw)

#             recommendations = test_model(user_input)
#             if recommendations:
#                 print("추천 영양제 (유사도 높은 순):")
#                 for index in recommendations:
#                     print(f"- {df_original.iloc[index]['PRDLST_NM']}: {df_original.iloc[index]['PRIMARY_FNCLTY']}") # 원본 기능 출력
#             else:
#                 print("적절한 영양제를 찾지 못했습니다.")
