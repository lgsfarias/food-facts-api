# NodeJs Challenge 20201030

<p align="center">
  <a href="https://github.com/lgsfarias/nodejs-challenge-20201030">
    <img src="./src/assets/foodiconreadme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    Food Facts API
  </h3>
  <p align="center">
    API para suporte a nutricionistas nutricionistas da empresa Fitness Foods LC
    <br />
    <a href="https://github.com/lgsfarias/nodejs-challenge-20201030"><strong>Explore the docs »</strong></a>
    <br />
</p>

## 🎯 Objetivo

Nesse desafio trabalharemos no desenvolvimento de uma REST API para utilizar os dados do projeto Open Food Facts, que é um banco de dados aberto com informação nutricional de diversos produtos alimentícios.

O projeto tem como objetivo dar suporte a equipe de nutricionistas da empresa Fitness Foods LC para que eles possam revisar de maneira rápida a informação nutricional dos alimentos que os usuários publicam pela aplicação móvel.

<br/>

## ⛏️ Ferramentas utilizadas

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-47A248?style=for-the-badge&logo=mongoose&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

<br/>

## 🏁 instruções de instalação

Para rodar este projeto, você precisará instalar [Node.js](https://nodejs.org/en/).

Clone o repositório

```bash
git clone https://github.com/lgsfarias/nodejs-challenge-20201030.git
```

Accesse a pasta do projeto

```bash
cd nodejs-challenge-20201030
```

Preencha o arquivo .env com as variáveis de ambiente conforme o arquivo .env.example

```bash
cp .env.example .env
```

Instale as dependências

```bash
npm install
```

<br/>

## 🏃🏽 Como rodar o projeto

Este projeto utiliza o [Docker](https://www.docker.com/) e docker-compose para subir a API e o MongoDB em ambientes de teste e desenvolvimento. Portanto para rodar o projeto, você precisará ter o [Docker](https://www.docker.com/) instalado em sua máquina.

Para rodar o projeto em ambiente de desenvolvimento, execute o comando:

```bash
npm run dev:docker
```

Para rodar o projeto em ambiente de produção, execute o comando:

```bash
npm run prod:docker
```

Para rodar os testes, execute o comando:

```bash
npm run ci:test
```

<br/>

## 🚀 Rotas

```yml
GET /
- Detalhes da API, se conexão leitura e escritura com a base de dados está OK, horário da última vez que o CRON foi executado, tempo online e uso de memória.
```

```yml
PUT /products/:code
    - Será responsável por receber atualizações do Projeto Web
    - body: {
      code: number;,
      status: string,
      url: string,
      creator: string,
      created_t: number,
      last_modified_t: number,
      product_name: string,
      quantity: string,
      brands: string,
      categories: string,
      labels: string,
      cities: string,
      purchase_places: string,
      stores: string,
      ingredients_text: string,
      traces: string,
      serving_size: string,
      serving_quantity: number,
      nutriscore_score: number,
      nutriscore_grade: string,
      main_category: string,
      image_url: string,
      imported_t: string
    }
```

```yml
DELETE /products/:code
-  Mudar o status do produto para trash
```

```yml
GET /products/:code
- Obter a informação somente de um produto da base de dados
```

```yml
GET /products?page={page}&limit={limit}
- Obter a informação de todos os produtos da base de dados com paginação
```

<br/>

## Frontend do projeto

O frontend do projeto está disponível em: [Frontend](https://github.com/lgsfarias/nodejs-challenge-20201030-front)

<br/>

## Contact

<div>
  <a href="https://www.linkedin.com/in/lgsfarias" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
  <a href = "mailto:lgsfarias.dev@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
</div>
