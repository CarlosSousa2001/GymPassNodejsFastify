# App

GymPass style app.

## RFs (Requisitos funcionais)

[ok] Deve ser possível se cadastrar;

[ok] Deve ser possível se autenticar;

[ok] Deve ser possível obter o perfil de um usuário logado;

[ok] Deve ser possível obter o número de check-ins realizados pelo usuário logado;

[ok] Deve ser possível o usuário obter o seu histórico de check-ins;

[ok] Deve ser possível o usuário buscar academias próximas;

[ok] Deve ser possível o usuário buscar academias pelo nome;

[ok] Deve ser possível o usuário realizar check-in em uma academia;

[ok] Deve ser possível validar o check-in de um usuário;

[ok] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

[ok] O usuário não deve poder se cadastrar com um e-mail duplicado;

[ok] O usuário não pode fazer 2 check-ins no mesmo dia;

[ok] O usuário não pode fazer check-in se não estiver perto (100m) da academia;

[ok] O check-in só pode ser validado até 20 minutos após ser criado;

[ok] O check-in só pode ser validado por administradores;

[ok] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

[ok] A senha do usuário precisa estar criptografada;

[ok] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;

[ok] Todas listas de dados precisam estar paginadas com 20 itens por página;

[ok] O usuário deve ser identificado por um JWT (JSON Web Token);

