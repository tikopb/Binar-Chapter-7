# Binar-Chapter-7

- node js
- Express js
- rounting
- database migration
- mvc
- mvr
- sync process

## How To Run The App

1. run npm install
2. run db:create

```
npx sequelize db:create
```

3. run db:migrate

```
npx sequelize db:migrate
```

4. run npm start

```
npm start
```

5. app already runing

## How to Test

### Make user /register

1. open postman on anything api handler test
2. open this URL and set into POST PROCESS

```
localhost:3000/api/v2/auth/register
```

with body file

```
{
    "username": "tiko_pb2",
    "password": "1234"
}
```

3. please copy token from json return

```
  "acceccssToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0aWtvX3BiMiIsImlhdCI6MTYyODczNzk1OX0._g-UXx4dkn1yoLpAIrwKdturTBev_IoMbEU3g8v6Aps"
```

this token user for login auth

### Login validation

1. open postman on anything api handler test
2. open this URL and set into POST PROCESS

```
localhost:3000/api/v2/auth/login
```

with body file

```
{
    "username": "tiko_pb2",
    "password": "1234"
}
```

3. please copy token before process and set into header with key name => Authorization

```
  "acceccssToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0aWtvX3BiMiIsImlhdCI6MTYyODczNzk1OX0._g-UXx4dkn1yoLpAIrwKdturTBev_IoMbEU3g8v6Aps"
```

4. hit Send

### /create-room

this process will hit creating room on app

1. open postman on anything api handler test
2. open this URL and set into POST PROCESS

```
localhost:3000/api/v2/auth/create-room
```

with body file

```
{
    "username": "tiko_pb2",
    "password": "1234"
}
```

3. please copy token before process and set into header with key name => Authorization

```
  "acceccssToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0aWtvX3BiMiIsImlhdCI6MTYyODczNzk1OX0._g-UXx4dkn1yoLpAIrwKdturTBev_IoMbEU3g8v6Aps"
```

4. hit Send

### /fight

this process will search room and start to player fight

1. open postman on anything api handler test
2. open this URL and set into POST PROCESS

```
localhost:3000/api/v2/auth/fighting
```

with body file

```
{
    "username": "tiko_pb",
    "password": "1234",
    "roomNumber": "929430",
    "plyChoose": "R"
}
```

roomNumber get from create-room and plyChoose variabel is { R = Rock, P = Paper, S = Scissors }

3. please copy token before process and set into header with key name => Authorization

```
  "acceccssToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0aWtvX3BiMiIsImlhdCI6MTYyODczNzk1OX0._g-UXx4dkn1yoLpAIrwKdturTBev_IoMbEU3g8v6Aps"
```

4. hit Send

player can only fight in 3 rounde

### /result

this process will return the winner of the room
this process will search room and start to player fight

1. open postman on anything api handler test
2. open this URL and set into POST PROCESS

```
localhost:3000/api/v2/auth/fighting
```

with body file

```
{
    "roomNumber": "929430"
}
```

roomNumber get from create-room

3. hit Send

app will show the winner
