<!-- class: center, middle, no-inverse -->

# Prisma Framework Overview

<!-- ![Prisma Logo](https://cdn.worldvectorlogo.com/logos/prisma-2.svg) -->

<!-- ![](./images/logo-b.png) -->

.footnote[2020]

---

class: no-inverse

# Contents

-   Prisma
-   Comparison of Tools
-   Prisma Client
-   How It Works
-   Data Model
-   Examples (queries/mutations)
-   Competitors

???
Сегодня я расскажу о новом типе инструмента для работы с базой данных
точнее о семействе инструментов, которые объединены во фреймворках
под названием Призма.

---

class: no-inverse

# Prisma

Next-generation database tooling

-   **Prisma Client** - A type-safe database client for efficient
    and safe database access
-   **Prisma Migrate** (experimental) - Declarative data modeling
    & migration system
-   **Prisma Studio** - GUI to view and edit data in your database

???

Призма, призма фреймворк, это семейство инстурументов для работы с базой данных,
которое включает:
Prisma Client - клиент для подключения к базой данных, Prisma Migrate -
инструмент для миграции данных.
Prisma Studio - приложение для манипулирования
данными напрямую в БД, что-то вроде SQL Management Studio.  
Я сегодня в основном буду рассказывать про Prisma Client.

---

class: no-inverse

# Comparison of tools

-   Native Driver
-   Query Builder
-   ORM

???

Сначала, давайте посмотрим, какие существуют способы работы с базой данных.
Все их можно разделить на 3 категории

---

class: no-inverse

# Native Driver

Examples are `pg` or `mysql` modules

```javascript
const { Client } = require('pg');
const client = new Client();
await client.connect();
const result = await client.query('SELECT $1::text as message', ['Hello']);
```

.grid.p-mt-0[
.grid-column-1[

**Benefits**

-   Full Control (Flexibility, Performance, etc.)

]

.grid-column-2[

**Drawbacks**

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
Для того чтобы забрать данные, мы теперь пишем на каком-то другом языке,
как правило это SQL или его диалект. Понятно, что абстрации тут никакой нет.
Разработчику нужно делать много ручной работы:
перечислить все имена колонок таблиц, в перечислении можно ошибиться,
и ошибка обнаружится только в рантайме, нужно знать структуру базы данных,
чтобы соединить таблицы.

Но _Преимущество_ это полный контроль.

---

class: no-inverse

# Query Builder

Adds a layer of abstraction above raw database-native querying (e.g.&nbsp;`knex.js`)

```javascript
knex('users')
    .join('contacts', 'users.id', '=', 'contacts.user_id')
    .select('users.id', 'contacts.phone');
```

.grid.p-mt-0[
.grid-column-1[

**Features**

-   May Support Multiple Databases
-   Decompose Queries into Logical Chunks
-   Mixed Database / Programming Focused
-   Medium Productivity

]

.grid-column-2[

**Drawbacks**

-   Still Need to Think About Data in Terms of Sql
-   Low Level of Abstraction
-   Type Unsafety

]
]

???

Query Builder добавляет уровень уровень абстракции к базе данных,
и формально мы уже пишем на javascript-е.
Т.е. вместо ключевых слов в SQL строке, мы используем методы select,
join и т.д.
Но все равно, мы должны держать в уме структуру базы данных, имена колонок,
первичных ключей, внешних ключей.

(Левая колонка это фичи, не достоинства/преимущества)

---

class: no-inverse

# ORM

Object relational mapper, define your application models as classes

.grid.p-mt-0[
.grid-column-1[

**Benefits**

-   Programming Oriented
-   High Level of Abstraction
-   High Productivity

]

.grid-column-2[

**Drawbacks**

-   Low Control
-   [Object-Relational Impedance Mismatch](https://en.wikipedia.org/wiki/Object-relational_impedance_mismatch)
-   May Generate Complicated Queries
    ([N+1 Problem](https://stackoverflow.com/questions/97197/what-is-the-n1-selects-problem-in-orm-object-relational-mapping))
-   Type Unsafety for Partial Database Queries

]
]

???
В ORM мы полностью абстрагируемся и работаем с сущностями (обычно это классы),
которые являются частью нашего приложения.
Продуктивность в ORM выше.  
И теперь необязательно знать о стуктуре базой данных.  
Как правило, в ORM есть инструменты миграции, они все сгенерируют.  
Из _недостатков_, у нас нет полного контроля над базой данных,
реализация скрыта, мы не знаем там происходит внутри,
ORM может сгенерировать сложные (непроизводительные) запросы.
N+1 проблема.
В некоторых случаях некорректная типизация (в случае TypeScript)

---

class: no-inverse

# Prisma Client

![](./images/prisma-client.png)

???
Сами авторы Призмы не относят свой инструмент, ни к ORM, ни к query-builder-у.
Это нечто близкое query builder-у, но также имеющую фичи ORM - возможность декларативно запрашивать данные.

Чем же призма принципиально отличается от существующих инструментов?

---

class: no-inverse

# How it works

![](./images/prisma-engines.png)

???
Ваш код (из node.js) больше не работает с базой данных напрямую,
а через Query Engine,
Query Engine - исполняемый файл который написан на языке Rust.
nodejs (prisma client) отправляет запрос в Query Engine
какие данные мы хотим получить,
rust binary (query engine) конвертирует его в SQL запрос и выполняет к базе данных.

---

class: no-inverse

# Data Model

-   Manually writing the data model and mapping it to the database with Prisma Migrate
-   Generating the data model from introspecting a database

```
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

???
Следующее отличие, модели описываются не в самой базе данных, не в классах.
А специальном файле-схеме,
написанном на языке Prisma Schema Language (PSL), похож на graphql.
Чтобы получить такую схему:

1. интроспектировать существующую базу данных
   (интроспектировать - получить тип и структуру объекта)
2. либо описать модели вручную файле
   у модели есть свойства определяется как имя дальше тип модификатор обязательное поле или нет,
   атрибут с помощью которых можно описать отношения между моделями
   или другую специфику - уникальные значения, значения по умолчанию, и так далее

-   https://www.prisma.io/docs/understand-prisma/data-modeling

---

class: no-inverse

# Generate Prisma Client

```sh
npx prisma generate
```

```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

await prisma.$connect();
// Working with database...
await prisma.$disconnect();
```

???

Самое важное.
На основе этой схемы будет сгенерирован код клиента, для работы с базой.
Как выглядят запросы.

---

class: no-inverse

# Generated methods

-   findUnique
-   findMany
-   findFirst
-   create
-   delete
-   update
-   deleteMany
-   updateMany
-   etc.

???
Для получения и изменения данных, будут сгенерированы методы,
для каждой модели.

---

class: no-inverse

# Find One

The `findUnique` query lets you retrieve a single database record by _ID_
or another _unique_ attribute.

```javascript
const user = await prisma.user.findUnique({ where: { id: 1 } });
console.log('user.email', user.email);
```

```typescript
export type UserWhereUniqueInput = {
    id?: number | null;
    email?: string | null;
};
```

???
Причем будут и сгенерированы и типы для параметров которые принимают эти методы.
Для метода `findUnique` будет сгенерирован тип `UserWhereUniqueInput` с полями id и email.
Потому что согласно схеме у нас id - это идентификатор, а email - уникальный.
Т.е. никакой `name` и другие посторонние поля туда передать нельзя - сразу
ошибка при компиляции.

---

class: no-inverse

# Retrieve Partial

`select` specifies which properties to include on the returned object.

```javascript
const user = await prisma.user.findUnique({
    where: { id: 42 },
    select: { id: true, name: true },
});
// Compile time error:
// Property 'email' does not exist on type '{ id: number; name: string; }'
console.log('user.email', user.email);
```

???
Допустим я хочу выбрать не весь объект, а только некоторые его поля.
Я указываю их в свойстве `select`
И если я попытаюсь, обратится к свойству которое я не указал, я сразу же получаю ошибку при компиляции.

---

class: no-inverse

# Nested Objects

`include` specifies which relations should be eagerly loaded on the
returned object.

```javascript
const postsByAuthorWithAuthorInfo = await prisma.post.findMany({
    include: {
        author: true,
    },
});

type postsByAuthorWithAuthorInfo = (Post & {
    author: User,
})[];
```

???

Если необходимо выбрать связные объекты, то можно использовать параметр `include`.
Это выберет автора целиком (все поля), можно вместо `true` использователь объект
со полем `select` и в нем перечислить нужные поля, как в предыдущем случае.
И опять же тут все будет типизировано,
на выходе так и на входе, т.е. никакие посторонние свойства в `include`,
которые не предусмотрены схемой, передать нельзя.  
Возвращаемый объект будет типа объект типа Post + свойство author - вложенный
объект типа User.  
Во всех случаях возвращаются обычные javascript объекты.

---

class: no-inverse

# Find Many

The `findMany` query returns a list of records. You can use the `select`
and `include` options to determine which properties the returned objects should include.
You can also paginate, filter and order the list.

```javascript
const allUsers = await prisma.user.findMany(args);
```

```javascript
/**
 * User findMany
 */
export type FindManyUserArgs = {
    select?: UserSelect | null, // Select specific fields to fetch from the User
    include?: UserInclude | null, // Choose, which related nodes to fetch as well.
    where?: UserWhereInput, // Filter, which Users to fetch.
    orderBy?: UserOrderByInput, // Determine the order of the Users to fetch.
    cursor?: UserWhereUniqueInput, // Sets the position for listing Users.
    take?: number, // The number of Users to fetch. If negative number, it will take Users before the `cursor`.
    skip?: number, // Skip the first `n` Users.
};
```

???
Помимо условий, какие поля выбрать, есть дополнительные параметры,
order by - сортировка,
cursor - для ключи для курсорной пагинации,
take, skip - это длина и смещение (для offset-ной пагинации).

---

class: no-inverse

# Filter

Filter all Post records that contain "prisma" and
id strict greater than 42.

```javascript
const filteredPosts = await prisma.post.findMany({
    where: {
        id: { gt: 42 },
        OR: [
            { title: { contains: 'prisma' } },
            { content: { contains: 'prisma' } },
        ],
    },
});
```

???
Еще про поиск записей, тип параметра `where` будет сгенерирован
в зависимости от типа полей моделей, и можно построить сложный
объект, который похож на оператор в mongodb для `collection.find`.

---

class: no-inverse

# Prisma Supports

-   PostgreSQL
-   MySQL
-   SQLite
-   SQL Server (preview)
-   MongoDB (planned)

???
Есть поддержка популярных БД.

---

class: no-inverse

# Competitors

-   **PgTyped** - Typesafe SQL in TypeScript  
    https://github.com/adelsz/pgtyped
-   **TypeSQL** - Generate Typescript API from raw MySQL queries  
    https://github.com/wsporto/typesql
-   **ts-sql-query** - Type-safe SQL query builder  
    https://github.com/juanluispaz/ts-sql-query
-   **SQLTyped** - typesafe SQL DSL implementation in TypeScript  
    https://github.com/joshdover/sql-typed
-   **Sqlmancer** - Conjure SQL from GraphQL queries  
     https://github.com/danielrearden/sqlmancer

???
Недавно стали появляться...

---

class: no-inverse

# Built with Prisma

-   **RedwoodJS** - Bringing full-stack to the Jamstack https://redwoodjs.com/
-   **Blitz.js** - The Fullstack React Framework — built on Next.js https://blitzjs.com/
