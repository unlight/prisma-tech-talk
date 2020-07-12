# prisma-tech-talk

-   https://unlight.github.io/prisma-tech-talk/presentation.html

## Contents

-   Comparison of tools
-   What is Prisma Framework
-   How it works
-   Schema.Prisma
-   Example of user.findOne (type safe)
-   Example of write operations (with connect)
-   Aggregation example
-   Integration with TypeGraphQL / NestJS
-   Competitors

## Prisma

-   http://prisma.io/

## Resources

-   https://isprisma2ready.com/
-   https://github.com/prisma/prisma
-   https://www.prisma.io/docs/understand-prisma/why-prisma/
-   https://www.prisma.io/docs/understand-prisma/introduction
-   https://www.prisma.io/docs/getting-started/quickstart-typescript
-   https://www.prisma.io/blog/comparing-sql-query-builders-and-orms-dkuixe3aa5a2 - Comparing SQL, Query Builders, and ORMs
-   https://www.prisma.io/docs/understand-prisma/under-the-hood
-   https://www.prisma.io/blog/prisma-2-beta-b7bcl0gd8d8e/
-   https://softwareengineeringdaily.com/2020/06/04/prisma-modern-database-tooling-with-johannes-schickling/ - Prisma: Modern Database Tooling with Johannes Schickling
    -   https://softwareengineeringdaily.com/wp-content/uploads/2020/06/SED1083-Prisma.pdf
    -   https://hwcdn.libsyn.com/p/0/f/9/0f9e125d938f983a/2020_06_04_Prisma.mp3?c_id=74752949
-   https://www.youtube.com/watch?v=WSyaBOAZFZY - Prisma 2 in Action - Matt Mueller @ PrismaDay 2019
-   https://www.youtube.com/watch?v=NZpawq8eJOc - Founder Keynote - Johannes Schickling @ PrismaDay 2019
-   https://www.youtube.com/watch?v=tw1E9vVYWa8 - Prisma 2 Beta
-   https://www.youtube.com/watch?v=3Pxj-4IrOcs - Should you use Sequelize, TypeORM, or Prisma?
-   https://www.youtube.com/watch?v=OloBAdNCnyQ - Code first GraphQL Server Development with Prisma — Nikolas Burk @ GraphQL Conf 2019
-   https://www.youtube.com/watch?v=eH5mleAvnms - Prisma 2 Sneak Peak
-   https://www.codemochi.com/blog/2019-06-26-prisma-2-sneak-peak
-   https://itnext.io/lets-take-prisma-2-for-a-test-drive-on-aws-lambda-with-graphql-%EF%B8%8F-f4be711e93cc - Lets take Prisma 2 for a test drive on AWS Lambda with GraphQL
-   https://medium.com/@abhiaiyer/prisma-client-101-5eed06eee1fa - About Prisma 1
-   https://www.youtube.com/watch?v=jAxE8z6xpl8 - Prisma 2: Modern database tools for Node.js and TypeScript
-   https://www.youtube.com/watch?v=NSk9NfeJCd8 - Getting Started With Prisma 2
-   https://www.opencrud.org/
-   https://github.com/AhmedElywa/prisma-tools
-   https://github.com/BuildingXwithJS/exploring-prisma
    -   https://www.youtube.com/watch?v=mxUVBde8mDQ - BxJS - What is Prisma.io? Exploring database toolkit
-   https://github.com/catalinmiron/awesome-prisma
-   https://github.com/topics/prisma?o=desc&s=updated
-   https://github.com/topics/prisma2?o=desc&s=updated
-   https://github.com/hexrcs/fullstack-graphql-next-nexus-prisma
-   https://www.prisma.io/blog/announcing-prisma-2-zq1s745db8i5
-   https://www.prisma.io/blog/announcing-prisma-2-zq1s745db8i5#why-prisma-is-not-like-existing-db-tools--orms
-   https://www.youtube.com/watch?v=Bqacj0iOL68 - Building a Backend for React with Next.js, Prisma 2, and Postgres
-   https://youtu.be/BqztLbj_cN4
    00:58:45 - Welcome  
    01:03:05 - Keynote  
    01:15:40 - [Prisma 2.0: Productivity and Confidence for your database](https://www.youtube.com/watch?v=avpNAeWKgtM)
    01:49:50 - Happy Table Friends: Relations in Prisma  
    02:33:37 - Data Discovery with Studio  
    02:40:57 - Showcase: Building a Calendar App with Prisma  
    02:49:20 - Serverless Prisma 2 with GCP Cloud Run  
    3:31:49 - How Prisma Solves the N+1 Problem in GraphQL Resolvers  
    04:07:24 - Showcase: Prisma Admin React Component  
    04:13:37 - Prisma VSCode Extension  
    04:18:50 - Type-Safety Beyond TypeScript  
    04:24:54 - Showcase: Accessing Databases using NestJS with Prisma  
    04:47:30 - RedwoodJS: Bringing Full-Stack to the Jamstack  
    05:22:09 - Blitz: the Full-Stack React Framework  
    05:58:42 - The Jamstack and Your Data  
    06:37:42 - Closing

## FAQ

#### What about dynamic provider?

Currently, when generating a Prisma Client, it is specific to a provider (sqlite, postgres or mysql). You cannot reuse the same client and specify a provider which it wasn't generated for. But there is a feature request to do that.
https://github.com/prisma/prisma/issues/1487#issuecomment-633566370

#### MongoDB support for Prisma 2?

In progress
https://github.com/prisma/prisma/issues/1277

#### Performance

Not a goal for the beta, optimization will be later
https://github.com/prisma/prisma/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+performance

#### Transactions

https://github.com/prisma/prisma-client-js/issues/667
https://github.com/prisma/prisma/issues/1844
Use write operations with `connect`  
Since 2.1.0 available as experimrntal feature (explicit transactions)

#### Multiple schema files

https://github.com/prisma/prisma/issues/2377

#### Atomic operations

https://github.com/prisma/prisma-client-js/issues/655

#### ORM can resolve n + 1 problem too

https://mikro-orm.io/docs/nested-populate
Yes, but no type safety in this example.

https://github.com/typeorm/typeorm/blob/master/docs/eager-and-lazy-relations.md
In this example I must define it as column definition, what if need both lazy and eager...

#### Why ORM is Partial Typesafety

https://sequelize.org/master/manual/typescript.html#usage (bottom)

#### Why middleware as query engine is needed

Possible, to make prisma framework language indepedent, having such query engine allow to create
prisma cient for another language.
