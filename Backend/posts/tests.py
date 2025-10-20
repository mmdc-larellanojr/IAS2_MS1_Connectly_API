from django.test import TestCase

from django.contrib.auth import get_user_model
from .models import Follow

User = get_user_model()

class FollowModelTest(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='password')
        self.user2 = User.objects.create_user(username='user2', password='password')

    def test_follow(self):
        Follow.objects.create(follower=self.user1, following=self.user2)
        self.assertEqual(self.user1.following.count(), 1)
        self.assertEqual(self.user2.followers.count(), 1)

    def test_unfollow(self):
        Follow.objects.create(follower=self.user1, following=self.user2)
        Follow.objects.filter(follower=self.user1, following=self.user2).delete()
        self.assertEqual(self.user1.following.count(), 0)
        self.assertEqual(self.user2.followers.count(), 0)

    def test_follow_self(self):
        with self.assertRaises(Exception):
            Follow.objects.create(follower=self.user1, following=self.user1)

    def test_follow_already_following(self):
        Follow.objects.create(follower=self.user1, following=self.user2)
        with self.assertRaises(Exception):
            Follow.objects.create(follower=self.user1, following=self.user2)
