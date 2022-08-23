create table roles (id  serial not null, name varchar(20), primary key (id));
insert into roles (id, name) values (1, 'ROLE_USER'),(2, 'ROLE_ADMIN');