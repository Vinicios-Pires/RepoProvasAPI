# Usage
```
$ git clone https://github.com/Vinicios-Pires/RepoProvasAPI.git

$ cd RepoProvasAPI

$ npm install

$ npm run dev
```
#

# API:

# Rotas de autenticação:

- POST /signup
  - Rota para cadastrar um usuário (Senha de no mínimo 10 caracteres)
  - headers: {}
  - body: {
    "email": "email@email.com",
    "password": "somepassword"
    "confirmPassword": "samepassword"
    }
- POST /signin
  - Rota para o usuário logar e receber um token através do corpo da resposta
  - headers: {}
  - body: {
    "email": "email@email.com",
    "password": "somepassword"
    }

# Rota de provas:

- POST /test
  - Rota para o usuário criar um registro de prova
  - headers: {
    "Authorization": "Bearer token"
    }
  - body: {
    "name": "somename",
	  "pdfUrl": "pdf.pdf",
	  "categoryId": number (min: 1, max: 3),
	  "teacherDisciplineId": number (min: 1, max: 6)
    }
- GET /test/disciplines
  - Rota para o usuário pegar todas as provas ordenadas por disciplinas através do corpo da resposta
  - headers: {
    "Authorization": "Bearer token"
    }
  - body: {}
- GET /test/teachers
  - Rota para o usuário pegar todas as provas ordenadas por professores através do corpo da resposta
  - headers: {
    "Authorization": "Bearer token"
    }
  - body: {}
