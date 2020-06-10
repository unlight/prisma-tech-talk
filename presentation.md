<!-- class: center, middle, no-inverse -->

# Prisma Framework Overview

![Prisma Logo](https://cdn.worldvectorlogo.com/logos/prisma-2.svg)

.footnote[2020]

---

class: no-inverse

# Contents

-   What is Prisma Framework
-   Comparison of tools
-   How it works
-   Integration with TypeGraphQL / NestJS

???
Сегодня будет обзор фрейморка prisma версии 2.
Если вы что-то слышали о версии 1, то можете забыть о ней,
как будто она никогда не существовала.

---

# What is Prisma?

Prisma is an open source database toolkit. It mainly consists of the following parts:

-   **Prisma Client**: Auto-generated and type-safe query builder for Node.js & TypeScript
-   **Prisma Migrate** (experimental): Declarative data modeling & migration system
-   **Prisma Studio** (experimental): GUI to view and edit data in your database

???

Призма, призма фреймворк, это семейство инстурументов для работы с базой данных, которое включает:
Prisma Client - клиент для подключения к БД, Prisma Migrate - инструмент для миграции данных,
Prisma Studio - приложение для манипулирования данными напрямую в БД, что-то вроде
SQL Management Studio.

Сами авторы не относят свой инструмент, ни к ORM, ни к query-builder-у.
Давайте послушаем доклад, и попытаемся понять почему.

---

# Comparison of tools

-   Native Driver
-   Query Builder
-   ORM

???

Сначала, давайте посмотрим, какие существуют способы работы с БД.

---

# Native Driver

Examples are `pg` or `mysql` modules.

```javascript
const { Client } = require('pg');
const client = new Client();
await client.connect();
const result = await client.query('SELECT $1::text as message', ['Hello']);
```

.flex.p-mt-0[
.w-1of2[

**Benefits:**

-   Full Control (Flexibility, Performance, etc.)

]

.w-1of2[

**Drawbacks:**

-   Database Oriented Programming
-   None Level of Abstraction
-   Low Productivity
-   Type Unsafety

]
]

???

Нативный драйвер, как правило, имеет низкоуровневый API:
подключение, авторизация, запросы и т.д.

_Недостатки_ такого способа.
Вместо JS, мы теперь пишем на каком-то другом языке, как правило это SQL
или его диалект. Понятно, что абстрации тут никакой нет. Разработчику нужно делать много ручной работы: перечислить все имена колонок таблиц, в перечислении можно ошибиться, и ошибка обнаружится только в рантайме, нужно знать структуру БД, чтобы соединить таблицы.

Но _Преимущество_ это полный контроль

---

# Query Builder

---

# ORM

---
