create table if not exists account
(
	id serial not null
		constraint account_pkey
			primary key,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(255) not null
		constraint account_email_key
			unique,
	password varchar(255) not null,
	"createdAt" timestamp with time zone,
	"updatedAt" timestamp with time zone
);