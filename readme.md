# TESTE APPELSOFT

Esse é um teste prático para um vaga de desenvolvedor, siga as instruções abaixo para instalação e utilização do mesmo.

## Como rodar o projeto localmente

### Requisitos do sistema

- É preciso ter o php instalado na máquina na versão 8.3
- É preciso ter o composer instalado e o MySQL também

### Instalação

BACKEND

- Baixe o projeto no github, abra o caminho da pasta raiz do projeto no terminal e navegue até a pasta `backend`
- Rode o comando `composer install`
- Localize o arquivo `.env.example`, duplique ele e renomeie para `.env`, abra-o e edite as credenciais do banco de dados conforme sua instalação do mysql

Criar uma key para o projeto

- Executar o comando `php artisan key:generate`

Criar rotas da api

- Executar o comando `php artisan install:api`

Criar banco de dados e popular

- Executar o comando `php artisan migrate`
- Executar o comando `php artisan db:seed`

Criar um token para uso do jwt

- Executar o comando `php artisan jwt:secret`

Rodar o servidor

- Executar o commando `php artisan serve` ou navegar até a pasta `/public` e rodar o comando `php -S localhost:8000`

FRONTEND

-
