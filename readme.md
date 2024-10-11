# TESTE APPELSOFT

Esse é um teste prático para um vaga de desenvolvedor, siga as instruções abaixo para instalação e utilização do mesmo.

## Como rodar o projeto localmente

### Requisitos do sistema

- É preciso ter o php instalado na máquina na versão 8.2
- É preciso ter o composer instalado e o MySQL também
- É preciso ter o nodejs instalado na máquina na versão 20.9.0
- É preciso ter o @angular/cli instalado na máquina

### Instalação

Baixe o projeto no github

BACKEND

- Abra o caminho da pasta raiz do projeto no terminal e navegue até a pasta `/backend`
- Rode o comando `composer install`
- Localize o arquivo `.env.example`, duplique ele e renomeie para `.env`, abra-o e edite as credenciais do banco de dados conforme sua instalação do mysql

Criar uma key para o projeto

- Executar o comando `php artisan key:generate`

Criar banco de dados e popular

- Executar o comando `php artisan migrate`
- Executar o comando `php artisan db:seed`

Criar um token para uso do jwt

- Executar o comando `php artisan jwt:secret`

Rodar o servidor

- Executar o commando `php artisan serve` ou navegar até a pasta `/public` e rodar o comando `php -S localhost:8000`

FRONTEND

- Abra o caminho da pasta razi do projeto no terminal e navegue até a pasta `/frontend`
- Rode o comando `npm install`
- Rode o comando `ng serve` e acesse o navegador na url [http://localhost:4200](http://localhost:4200) e realize o login na tela que abrir usando as crendenciais abaixo:
  - email: user@email.com
  - senha: 123456
