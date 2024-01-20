# dev

<https://ui.shadcn.com/docs/installation/next>

pnpm create next-app@latest my-app --typescript --tailwind --eslint .

pnpm dlx shadcn-ui@latest init

<https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql>

pnpm add prisma -D
pnpm prisma init

## setting vscode json 

create file ` .vscode/settings.json`

setup database using postgresql
<https://www.warp.dev/terminus/postgres-docker-compose>

```sql
# https://www.postgresql.org/docs/14/sql-grant.html

CREATE ROLE johndoe WITH
  LOGIN
  NOSUPERUSER
  NOCREATEDB
  NOCREATEROLE
  INHERIT
  NOREPLICATION
  CONNECTION LIMIT -1
PASSWORD 'randompassword';

COMMENT ON ROLE johndoe IS 'ini adalah user untuk johndoe';

create database appointment

grant connect on database appointment to johndoe

GRANT pg_read_all_data TO johndoe;

GRANT pg_write_all_data TO johndoe;


# Commands must be executed while connected to the right database. Make sure of it.


GRANT USAGE ON SCHEMA public TO johndoe;

grant create on schema public to johndoe

GRANT ALL  ON ALL TABLES IN SCHEMA public TO johndoe;

GRANT ALL  ON ALL SEQUENCES IN SCHEMA public TO johndoe;

```
