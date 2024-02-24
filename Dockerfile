FROM node:18.17.1 as development

WORKDIR usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:18.17.1

WORKDIR usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=development usr/src/app/dist ./dist

CMD ["node","dist/server.js"]
