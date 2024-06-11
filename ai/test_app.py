import unittest
from app import app
import json

class TestRecommend(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_recommend(self):
        data = {"user_input": "피로회복"}
        response = self.app.post("/recommend", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['Content-Type'], 'application/json')

        # Mock 서버의 응답 확인
        response_data = response.get_json()
        self.assertEqual(response_data["message"], "Recommendations received successfully")

if __name__ == "__main__":
    unittest.main()
