
-- CREATE SCHEMA "BMS" ;

-- "BMS".book definition

-- Drop table

-- DROP TABLE "BMS".book;

CREATE TABLE "BMS".book (
	bookid serial4 NOT NULL,
	book_title varchar(400) NOT NULL,
	book_description varchar(500) NOT NULL,
	book_author varchar(80) NOT NULL,
	book_publisher varchar(70) NOT NULL,
	book_pages int4  NULL,
	store_code varchar(50) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT pk_book PRIMARY KEY (bookid)
);

-- "BMS".store definition

-- Drop table

-- DROP TABLE "BMS".store;

CREATE TABLE "BMS".store (
	storeid serial4 NOT NULL,
	store_name varchar(100) NOT NULL,
	store_code varchar(100) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	address varchar(200) NOT NULL DEFAULT 200,
	CONSTRAINT pk_store PRIMARY KEY (storeid)
);

-- app_audit
CREATE TABLE "BMS".app_audit (
	audit_id serial NOT NULL,
	audit_action varchar(100) NOT NULL,
	audit_data json NULL,
	audit_by varchar(50) NOT NULL,
	audit_on timestamp NOT NULL,
	audit_status varchar(50) NULL,
	audit_error json NULL,
	CONSTRAINT app_audit_pkey PRIMARY KEY (audit_id)
);

CREATE TABLE "BMS".app_user (
	user_id serial NOT NULL,
	username varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	email varchar(355) NOT NULL,
	user_type_code varchar(10) NOT NULL,
	full_name varchar(500) NOT NULL,
	active int2 NULL DEFAULT 1,
	created_on timestamp NULL,
	created_by varchar(100) NULL,
    updated_on timestamp NULL,
	updated_by varchar(100) NULL,
	CONSTRAINT user_email_key UNIQUE (email),
	CONSTRAINT user_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_username_key UNIQUE (username)
);

CREATE TABLE "BMS".app_group (
	group_id serial NOT NULL,
	group_name varchar(100) NOT NULL,
	CONSTRAINT group_group_name_key UNIQUE (group_name),
	CONSTRAINT group_pkey PRIMARY KEY (group_id)
);

CREATE TABLE "BMS".app_role (
	role_id serial NOT NULL,
	role_name varchar(100) NOT NULL,
	CONSTRAINT role_pkey PRIMARY KEY (role_id),
	CONSTRAINT role_role_name_key UNIQUE (role_name)
);

CREATE TABLE "BMS".user_group (
	user_group_id serial NOT NULL,
	user_id int4 NULL,
	group_id int4 NULL,
	CONSTRAINT user_group_pkey PRIMARY KEY (user_group_id)
);

CREATE TABLE "BMS".group_role (
	group_role_id serial NOT NULL,
	group_id int4 NULL,
    role_id int4 null,
	CONSTRAINT group_role_pkey PRIMARY KEY (group_role_id)
);

CREATE TABLE "BMS".user_type (
	user_type_id serial NOT NULL,
	user_type_name varchar(500) NOT NULL,
	user_type_code varchar(10) NOT NULL,
	CONSTRAINT user_type_pkey PRIMARY KEY (user_type_id)
);