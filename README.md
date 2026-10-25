# Halay's Accessories

Simple online shop: React (Vite) frontend + ASP.NET Core 8 Web API + SQL Server.
Products: Smart Watch, Headphones, Cap.

## Frontend (`frontend/`)
```
cd frontend
npm install
npm run dev
```
Uses dummy data until `VITE_API_URL` is set (e.g. in Vercel env vars after the API is deployed).

## Backend (`backend/HalaysAccessories.Api`)
```
cd backend/HalaysAccessories.Api
dotnet run
```
Default connection string targets SQL Server LocalDB; change `ConnectionStrings:DefaultConnection`.
The DB is created and seeded with the 3 products on startup. Endpoints: `GET /api/products`, `GET /api/products/{id}`.
Add your deployed frontend URL to `AllowedOrigins` for CORS.

## Branching
`main` = production, `development` = integration branch, work on `feature/*` branches merged into `development`.
