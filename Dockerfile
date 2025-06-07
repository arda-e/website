# ---------- Stage 1 : build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# deps & tools
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

# sources
COPY src ./src
COPY build.mjs ./build.mjs

# full build (server + vendor + client + assets)
RUN npm run build:all

# ---------- Stage 2 : runtime ----------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 80
CMD ["node", "dist/index.js"]