# CommuNet

### Pre-start

1. Install deps
```
npm ci
```

2. [Up database](#up-database)

2. Run migrations
```
npm run migration:run
```

### Up Database

1. Run docker: `docker compose up -d`
2. Run migrations: `npm run migration:run`
3. Run seed: `npm run seed:run`
