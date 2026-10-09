
FROM node:22-alpine

WORKDIR /app

COPY package.json vite.config.js index.html ./

RUN npm install

COPY src ./src

RUN npm run build

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--allowedHosts", "vertexlearn-lms-production.up.railway.app"]