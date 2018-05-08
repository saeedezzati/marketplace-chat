

![alt text](https://github.com/jlackback/interview-fullstack/blob/master/screenshot-1.png?raw=true)

![alt text](https://github.com/jlackback/interview-fullstack/blob/master/screenshot-2.png?raw=true)


SERVER:
- cd server
- run 'pip install -r requirements.txt' [Requires python ^3.0]
- python manage.py makemigrations
- python manage.py migrate
- python manage.py createsuperuser [create a super user account]
- run 'python manage.py runserver'
- go to http://127.0.0.1:8000/admin and login with the created account


CLIENT:
- cd client
- npm install
- npm run dev
- go to http://127.0.0.1:8080/