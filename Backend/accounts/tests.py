from django.test import TestCase

from django.contrib.auth import get_user_model

User = get_user_model()

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(username='testuser', password='password')
        self.assertEqual(user.username, 'testuser')
        self.assertTrue(user.check_password('password'))
        self.assertEqual(user.role, 'user')

    def test_create_superuser(self):
        superuser = User.objects.create_superuser(username='superuser', password='password')
        self.assertEqual(superuser.username, 'superuser')
        self.assertTrue(superuser.check_password('password'))
        self.assertEqual(superuser.role, 'admin')
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)
