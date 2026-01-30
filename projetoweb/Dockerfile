# Estágio 1: Construção (Build)
FROM node:20-alpine AS build

WORKDIR /app

# Copia arquivos de definição de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Gera o build de produção (gera a pasta /dist)
RUN npm run build

# Estágio 2: Servir os arquivos estáticos (Production)
FROM nginx:stable-alpine

# Copia os arquivos do build para o diretório de serviço do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração simples para suportar rotas do React (SPA)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
