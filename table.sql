drop table if exists users;

create table users(
    id serial primary key,
    greeted_names text not null unique,
    greeted_counter int not null
);
