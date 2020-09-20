## Versions
[![Version](https://img.shields.io/static/v1?label=Express&message=4.17&color=blue)]()
[![Version](https://img.shields.io/static/v1?label=Angular&message=10.1.2&color=blue)]()
[![Version](https://img.shields.io/static/v1?label=PostgreSQL&message=12.4&color=blue)]()

## Getting Started

### Database
If you are using Docker PostgreSQL image, run a Docker container using command:

```
docker run -d --name postgresql -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres postgres:12.4
```
Then create a database called "store".

To create the tables of the project you can run:
```
cd backend/database 
sequelize db:migrate
```
If you don't have the sequelize cli installed, you can simple run the .sql file on the backend/database/sql directory.

### Backend
##### Start the Express server
```
cd backend
npm run start
```
You can access on http://localhost:3000


### Frontend
##### Start the Angular server
```
cd frontend
npm run start
```
You can access on http://localhost:4200
