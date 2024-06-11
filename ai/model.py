import pickle
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from konlpy.tag import Okt
import numpy as np
import re
import random
import sqlite3
import pickle

okt = Okt()

# 데이터베이스에서 영양제 데이터 불러오기
def fetch_supplement_data_from_db():
    conn = sqlite3.connect('supplements.db')
    df = pd.read_sql_query("SELECT * FROM supplements", conn)
    conn.close()
    return df
# 전처리 함수 (Okt 형태소 분석기 사용)
def morph_and_stopwords(s):
    token_ls = []
    s = re.sub('[^ A-Za-z0-9가-힣]+', '', s)
    tmp = okt.morphs(s, stem=True)
    stopwords = pd.read_csv('stopwords.txt', delimiter='\t')  # stopwords.txt 파일 필요
    textrule = pd.read_csv('textrule.txt', delimiter='\t')    # textrule.txt 파일 필요

    for token in tmp:
        if token not in list(stopwords['sword']):
            if token not in list(textrule['word']):
                token_ls.append(token)
            else:
                find_row = textrule.loc[textrule['word'] == token]
                find_row = find_row[0:1]
                find_row = find_row.iloc[:, :2]
                new_words = find_row['new_word'].values[0].split(',')
                for w in new_words:
                    token_ls.append(w)
    return token_ls
# # 영양제 데이터 로드 (애플리케이션 시작 시 한 번 실행)
# df = fetch_supplement_data_from_db()

# # 모델 파일 생성 (최초 한 번만 실행, 이후 주석 처리)
# df['PRIMARY_FNCLTY'] = df["PRIMARY_FNCLTY"].astype(str).apply(morph_and_stopwords)
# vectorizer = TfidfVectorizer()
# tfidf_matrix = vectorizer.fit_transform(df["PRIMARY_FNCLTY"].astype(str))
# with open('trained_mtx.pkl', 'wb') as fw:
#     pickle.dump(tfidf_matrix, fw)
# with open('trained_tf.pkl', 'wb') as fw:
#     pickle.dump(vectorizer, fw)

# conn = sqlite3.connect('supplements.db')
# df = pd.read_sql_query("SELECT * FROM supplements WHERE PRDLST_NM = '팜스슈퍼프로폴리스'", conn)
# conn.close()

# print(df)
# 영양제 추천 모델 (파일 로드 및 추천)
def recommend_supplements(user_input):
    with open('trained_mtx.pkl', 'rb') as fr:
        trained_mtx = pickle.load(fr)
    with open('trained_tf.pkl', 'rb') as fr:
        trained_tf = pickle.load(fr)

    recommendations = test_model(user_input, trained_mtx, trained_tf)  # 모델 함수에 인자 전달
    return recommendations

# 영양제 추천 모델 (핵심 로직)
def test_model(new_data, trained_mtx, trained_tf):  # 인자 추가
    morph = morph_and_stopwords(new_data)
    print(morph)
    if len(morph) == 0:
        return []
    tf_new_mtx = trained_tf.transform(morph)

    cosine_sim = cosine_similarity(trained_mtx, tf_new_mtx)
    similarity = []
    for sim in cosine_sim:
        similarity.append(np.sum(sim) / len(morph))
    similarity = list(enumerate(similarity))
    similarity = sorted(similarity, key=lambda x: x[1], reverse=True)

    if similarity[0][1] == 0.0:
        return []

    saved_arr = []
    saved = 0
    saved_score = -1
    for idx in range(0, len(similarity)):
        if similarity[idx][1] < 0.02:
            break
        if saved < 3:
            saved_arr.append(similarity[idx])
            saved_score = similarity[idx][1]
            saved += 1
        else:
            if saved_score == similarity[idx][1]:
                saved_arr.append(similarity[idx])
                saved += 1
            else:
                break
    recommendation_indices = [idx[0] for idx in saved_arr]
    if len(recommendation_indices) > 3:
        recommendation_indices = random.sample(recommendation_indices, 3)
    return recommendation_indices

# sen = "눈에 좋은"
# result = recommend_supplements(sen)
# print("입력받은 문장: ", sen)
# print("추천",result)