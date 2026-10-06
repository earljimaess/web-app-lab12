# Stage 1: Dependency Installation & Build
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: Final Runtime Image
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

# Security Best Practice: Run non-root user
USER node

EXPOSE 3000
CMD ["node", "server.js"]
