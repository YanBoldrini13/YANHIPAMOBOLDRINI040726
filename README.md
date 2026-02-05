# Projetoweb-userApi

DADOS DE INSCRIÇÃO:
Projeto Desenvolvedor Front End

Dados do Candidato
N° Inscrição : 16555
Nome: YAN HIPAMO BOLDRINI
Email: yan.hipamo11@gmail.com
CPF: 040.726.982-70
RG: 1217217

==================================================
   PET GERENCIADOR - GUIA DE INSTALAÇÃO E EXECUÇÃO
==================================================

Este projeto foi desenvolvido utilizando React, TypeScript e Tailwind CSS.
Siga os passos abaixo para preparar o ambiente e rodar a aplicação localmente.

1. PRÉ-REQUISITOS
-----------------
Certifique-se de ter instalado em sua máquina:
- Node.js (Versão 18 ou superior recomendada)
- NPM (Vem instalado junto com o Node)
- Docker (Opcional, para rodar via container)

2. INSTALAÇÃO DAS DEPENDÊNCIAS
------------------------------
Abra o terminal na pasta raiz do projeto (onde está o arquivo package.json) e execute:

   npm install

Este comando instalará:
- React 19 & React Router DOM (Core & Roteamento)
- Axios (Comunicação com API)
- Tailwind CSS & PostCSS (Estilização)
- TypeScript (Tipagem)
- Vite (Ferramenta de Build/Dev Server)

3. EXECUTANDO O PROJETO (MODO DESENVOLVIMENTO)
---------------------------------------------
Após a instalação, inicie o servidor local com:

   npm run dev

O terminal fornecerá um link (geralmente http://localhost:5173). Abra-o no seu navegador.

4. EXECUTANDO VIA CONTAINER (DOCKER)
------------------------------------
Para rodar a aplicação de forma isolada sem precisar instalar o Node.js localmente:

   # 1. Construir a imagem do container
   docker build -t pet-gerenciador .

   # 2. Iniciar o container
   docker run -d -p 8080:80 --name app-pet pet-gerenciador

Após isso, acesse: http://localhost:8080

5. COMANDOS ADICIONAIS
----------------------
- Criar pacote de produção local: npm run build
- Rodar o Linter (Checar erros): npm run lint
- Visualizar build de produção: npm run preview

6. OBSERVAÇÕES
--------------
- O projeto consome a API hospedada em: https://pet-manager-api.geia.vip
- Certifique-se de estar conectado à internet para que as requisições de API e carregamento de imagens funcionem.

==================================================

Faltou implementar: 

- listar dentro de pet o tutor vinculado ao mesmo.
motivo: o tutor não aparece na lista de pets. com a logica que criei com o uso de pets_id no tutor.
