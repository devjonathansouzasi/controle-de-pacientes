# Projeto para controle de pacientes - API

## Detalhes

- **A api conta atualmente com as seguintes Entidades:**

- **User**
- **Patient**.

### **User**

- Users possuem acesso aos endpoints da API. Eles são os responsáveis por gerenciar o cadastros de Patients.

#### Estrutura

```
{
"_id": "",
"firstname": "",
"lastname": "",
"username": "",
"email": "",
"createdAt": "",
"updatedAt": "",
"__v": 0
}
```

#### Endpoints disponíveis

| Method | Route                 |
| ------ | --------------------- |
| POST   | /auth/register        |
| POST   | /auth/authenticate    |
| POST   | /auth/forgot_password |
| POST   | /auth/reset_password  |

### **Patient**

- Patients são mantenidos pelos Users.

#### Estrutura

```
{
"_id": "",
"name": "",
"age": "",
"description": "",
"observations": "",
"location": "",
"user": "",
"createdAt": "",
"updatedAt": "",
"__v": ""
}
```

#### Endpoints disponíveis

| Method | Route                |
| ------ | -------------------- |
| POST   | /patients            |
| GET    | /patients            |
| GET    | /patients:patientid  |
| PUT    | /patitents:patientid |
| DELETE | /patitents:patientid |

## Rodando o projeto

1. Para executar a API. Primeiro instale o docker e docker-compose em sua maquina.
2. Agora clone o repositório e acesse a pasta raiz do projeto.
3. Agora execute o comando **docker-compose up**. O docker irá configurar todo o ambiente e subir a aplicação. Isso Pode demorar um pouco dependendo da velocidade da sua conexão com a internet.
4. Após terminado. Use algum rest client (Recomendo o Insomnia) para testar a aplicação, ou utilize o frontend do projeto.
