create table roles (id  serial not null, name varchar(20), primary key (id));
insert into roles (id, name) values (1, 'ROLE_USER'),(2, 'ROLE_ADMIN');

create table users (id  bigserial not null, email varchar(50), password varchar(120), username varchar(20), primary key (id));

insert into users (id, email, password, username) values (1, 'marcin@gmail.com', '$2a$10$zYiW81YAOor0.PpTcFCdkOjIM3ixo7rlKanZxyJ216b1K0GycE4Va', 'admin');
insert into users (id, email, password, username) values (2, 'user@gmail.com', '$2a$10$VSghk/XAtw6GpoH.FO8AmeSXr2qQehsFFOgqQHtQ9K10LPFQoyFWy', 'user');

create table user_roles (user_id int8 not null, role_id int4 not null, primary key (user_id, role_id));
insert into user_roles (user_id, role_id) values (1,1);
insert into user_roles (user_id, role_id) values (1,2);
insert into user_roles (user_id, role_id) values (2,1);

