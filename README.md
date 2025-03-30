# App

API for a Gympass-like app.

## RFs - Requisitos Funcionais

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário acessar seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

## RN - Regras de Negócio

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no dia;
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

## RNFs - Requisitos Não-funcionais

- [x] A senha do usuário deve estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados Postgres;
- [] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JSON Web Token;
