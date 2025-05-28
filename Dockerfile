# Stage 1: Build the Vite application (此阶段与之前保持一致)
FROM node:22-alpine AS builder

WORKDIR /app
COPY . .

# 设置阿里云 npm 源
RUN npm config set registry https://registry.npmmirror.com

# Build the Vite project for production
RUN npm install -c && npm run build 

# Stage 2: Serve with Caddy (此阶段有较大修改)
FROM caddy:latest

RUN apk add --no-cache gettext

# 拷贝自定义的 Caddy 配置模板
COPY Caddyfile /etc/caddy/Caddyfile.template 

# 拷贝构建好的 Vite 应用程序文件到 Caddy 的默认根目录
COPY --from=builder /app/dist /usr/share/caddy

EXPOSE 80 

# 这是关键部分：使用 envsubst 在容器启动时替换 Caddyfile 中的变量
CMD ["/bin/sh", "-c", "envsubst '$$BACKEND_SERVICE_NAME $$BACKEND_PORT' < /etc/caddy/Caddyfile.template > /etc/caddy/Caddyfile && caddy run --config /etc/caddy/Caddyfile --adapter caddyfile"]