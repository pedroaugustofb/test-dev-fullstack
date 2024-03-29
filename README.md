# Test Diogojpina

Este é um projeto de exemplo que inclui um backend construído com NestJS e um frontend construído com React.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e o npm ou yarn instalados em seu ambiente de desenvolvimento.

## Instalação

### Backend

Para instalar as dependências do backend, navegue até a pasta do backend e execute:

```bash
npm install
or
yarn install
```

### Frontend

```bash
npm install
or
yarn install
```

## Execução

### Backend

```bash
npm run dev
or
yarn dev
```

Backend conta com documentação que com a aplicação em execução pode ser acessado pelo navegador em:

```
http://localhost:8080/doc
```

### Frontend

```bash
npm run dev
or
yarn dev
```

## Autenticação de rotas admin

### Obs: Projeto ja upado com .env com configuração de database em postgres, entre outros

```
email: admin@email.com
password: 12345678
```

## Libs usadas

### Backend

-> swagger para documentação

-> bcrypt para criptografia de password

-> jsonwebtoken para criação de tokens de autenticação

-> typeorm para construção/validação de entidades

-> class-validator e class-transform para validação de DTOs

### Frontend

-> react-router-dom para navegação entre rotas

-> react-hook-form para construção

-> zod para validação de forms

-> lucide-react para icons

-> axios para chamadas http

-> js-cookie para utilização de cookies
