# derkysan.dev

Landing personal en Vite + React.

## Scripts

```bash
npm run dev      # Vite (frontend) + API server
npm run build    # build frontend en /dist
npm run start    # sirve /dist + endpoint /api/contact
npm run preview  # preview de Vite
```

## Variables de entorno

Usa `.env` (o variables del entorno de despliegue):

```bash
SENDGRID_APIKEY=...
VITE_GA_MEASUREMENT_ID=...
```

## Despliegue en Vercel

- Este proyecto despliega el frontend con Vite (`dist`) y usa una funcion serverless en `/api/contact`.
- Asegura la variable `SENDGRID_APIKEY` en Vercel (`Project Settings > Environment Variables`).
