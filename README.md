```md
# Desafio Técnico DSIN

Este projeto foi desenvolvido para o desafio técnico da **DSIN**, utilizando as seguintes tecnologias:

- 🟢 **Drizzle ORM** – Para manipulação do banco de dados.
- 📌 **TypeScript** – Tipagem estática para maior segurança no código.
- 🟢 **Node.js** – Ambiente de execução JavaScript no backend.
- ✅ **Zod** – Utilizado para validações.
- 🧪 **Vitest** – Ferramenta de testes unitários.
- ⚡ **Fastify** – Framework para criação da API.

## 🚀 Como Iniciar o Projeto

### 1️⃣ Instale as dependências  
```sh
npm install
```

### 2️⃣ Configure as variáveis de ambiente  
Crie um arquivo `.env` baseado no `.env.example` fornecido no projeto.  

### 3️⃣ Configure o banco de dados  

Se tiver **Docker**, execute:  
```sh
docker compose up -d
```
Isso iniciará um banco de dados automaticamente.  

Se **não** tiver Docker, configure um banco manualmente e atualize a URL de conexão no `.env`.

---

## 🔄 Migrações do Banco de Dados (Drizzle ORM)

Para gerar e aplicar as migrações do banco de dados, execute os seguintes comandos:

```sh
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

## 🧪 Rodando os Testes Unitários

Os testes são executados com **Vitest**. Para rodá-los, use:

```sh
npm run test
```

---

## 🔍 Testando a API

As rotas da API estão configuradas no arquivo **client.http**.  
Para utilizá-lo, instale a extensão **REST Client** no seu editor.

---

📌 **Agora você está pronto para rodar e testar a aplicação! 🚀**  
```
