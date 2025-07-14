# Machine Manager - Sistema de Monitoramento de Máquinas

Plataforma web para cadastro, visualização e monitoramento de máquinas pesadas, com localização em mapa e status de operação.

## 🔧 Tecnologias

### Backend:
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **class-validator**, **class-transformer**

### Frontend:
- **Angular 17+**
- **RxJS**
- **Angular Material**
- **@angular/google-maps**


## ✅ Funcionalidades

### Backend (API REST)

| Método | Rota                     | Descrição                                |
|--------|--------------------------|-------------------------------------------|
| GET    | /machines                | Lista máquinas com paginação e filtros    |
| GET    | /machines/:id            | Retorna uma máquina específica            |
| POST   | /machines                | Cria uma nova máquina                     |
| PATCH  | /machines/:id/telemetry  | Atualiza apenas dados de telemetria       |
| DELETE | /machines/:id            | Remove uma máquina                        |

#### Parâmetros de busca:
- `page` — página atual (padrão: 1)
- `pageSize` — itens por página (padrão: 10)
- `status` — filtra por status da máquina
- `query` — busca textual em nome ou localização

### Frontend (Interface Angular)

- **Dashboard de Máquinas** – Lista com nome, status e localização
- **Cadastro de Máquinas** – Formulário com validação
- **Detalhes da Máquina** – Visualização detalhada da máquina
- **Edição de telemetria** – Formulário de edição de lcoalixação e status da maquina
- **Mapa Interativo** – Localização geográfica com Google Maps


## 📁 Estrutura de Pastas (Frontend)

```
src/
├── app/
│   ├── core/
│   │   ├── enums/
│   │   └── models/
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── machine-create/
│   │   ├── machine-details/
│   ├── services/
│   │   ├── geocoding/
│   │   ├── machines/
│   │   ├── snackbar/
│   ├── shared/components/
│   │   ├── machine-status/
│   │   ├── machine-table/
│   │   ├── map/
│   │   └── sidebar/
│   ├── app.component.ts / .html / .css
│   ├── app.config.ts / app.routes.ts
├── assets/
│   ├── icon/
│   └── logo/
├── styles/
├── custom-theme.scss
├── index.html
```

## 📁 Estrutura de Pastas (Backend)

```
src/
├── app.module.ts
├── main.ts
├── common/                         
│   ├── enums/
│   └── models/
├── database/
│   ├── database.module.ts
│   └── database.providers.ts
├── modules/
│   └── machines/
│       ├── controllers/
│       │   └── machines.controller.ts
│       ├── dto/
│       │   ├── create-machine.dto.ts
│       │   ├── update-telemetry.dto.ts
│       │   └── read-machine.dto.ts
│       ├── entities/
│       │   └── machine.entity.ts
│       ├── services/
│       │   └── machines.service.ts
│       └── machines.module.ts
```



## 🚀 Instalação

### Pré-requisitos

Antes de rodar o projeto, certifique-se de ter os seguintes itens instalados na sua máquina:

- [Node.js](https://nodejs.org/)
- [Nest CLI](https://docs.nestjs.com/cli/overview): instale com `npm install -g @nestjs/cli`
- [Angular CLI Versão 17](https://angular.dev/tools/cli/setup-local): instale com `npm install -g @angular/cli@17`
- [PostgreSQL](https://www.postgresql.org/download/): instale localmente e crie o banco de dados

### Banco de dados

Acesse o PostgreSQL e crie a base de dados chamada `machine_db`:

```sql
CREATE DATABASE machine_db;
```

Clone o projeto do github com o comando:

```bash
git clone https://github.com/seu-usuario/machine-manager-backend.git
```

### Backend
Para rodar o backend navegue para a pasta dos arquivos da API
```bash
cd machine-manager-backend
```

Em seguida instale as dependencias
```bash
npm install
```
Configure o arquivo `.env` apontando para a sua base de dados. Depois rode:
```bash
npm run start:dev
```

### Frontend
Para rodar o frontend navegue para a pasta dos arquivos da projeto angular
```bash
cd machine-manager-frontend
```

Em seguida instale as dependencias
```bash
npm install
```
Configure o arquivo `environment.ts` apontando para a url `localhost` + a porta definida no arquivo `.env` da API. Depois rode:
```bash
npm start
```

E acesse: [http://localhost:4200](http://localhost:4200)



## 👩‍💻 Contato

**Fernanda Campolin**  
[LinkedIn](https://linkedin.com/in/fernanda-campolin)  
fernandacampolin@gmail.com
(42) 98821-2992
