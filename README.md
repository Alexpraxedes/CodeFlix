# Projeto para estudo, baseado no curso da Full Cycle - Code Flix
O projeto em si e separado em diversas camadas, onde nota-se a arquitetura de microserviços e microfronts. Comportando assim um sistema geral de administração, administração, publicação e consumo de vídeos, muito semelhante aos serviços de streamings populares, como Netflix, Disney Plus e etc.

## Módulo Administrativo - API (Backend)
O módulo ou serviço administrativo é responsável por toda a parte de gerência dos vídeos, cadastros, disponibilização e demais detalhes aplicados so plano de negócios.Ele é separado em um serviço de API feito em NodeJS, que se comunica com um serviço de mensageria, utilizando o RabbitMQ, um server cloud Google, para armazenar os vídeos e um serviço de Encoder.

### Partes importantes para estudo:
1. TypeScript
2. Conceito de Entidades
3. Testes (TDD)
4. NodeJS (Nest.js)
5. RabbitMQ
6. Testes E2E (End-to-End)