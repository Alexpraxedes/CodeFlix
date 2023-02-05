# Módulo Administrativo - API (Backend)
O módulo ou serviço administrativo é responsável por toda a parte de gerência dos vídeos, cadastros, disponibilização e demais detalhes aplicados so plano de negócios.Ele é separado em um serviço de API feito em NodeJS, que se comunica com um serviço de mensageria, utilizando o RabbitMQ, um server cloud Google, para armazenar os vídeos e um serviço de Encoder.

## Partes importantes para estudo:
1. Testes de unidade
2. Code refactoring
3. Encapsulamento
4. Objetos de valor
5. Utilização de persistência In Memory
6. Casos de Uso (regras cruciais x aplicação) - App Business Rules
7. Monorepo
8. Dev Container e VSCode remotes