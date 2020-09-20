create table if not exists "user"
(
	id serial not null
		constraint user_pkey
			primary key,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(255) not null
		constraint user_email_key
			unique,
	password varchar(255) not null,
	created_at timestamp with time zone,
	updated_at timestamp with time zone
);

alter table "user" owner to postgres;