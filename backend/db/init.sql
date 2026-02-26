--
-- Tables
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

CREATE TABLE public.workspaces (
    id integer NOT NULL,
    user_id integer,
    name text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

CREATE TABLE public.ledger (
    id integer NOT NULL,
    workspace_id integer,
    customer_name text NOT NULL,
    month text NOT NULL,
    total_bill integer DEFAULT 0,
    balance integer DEFAULT 0
);

CREATE TABLE public.payments (
    id integer NOT NULL,
    ledger_id integer,
    amount integer NOT NULL,
    date date NOT NULL
);

CREATE TABLE public.documents (
    id integer NOT NULL,
    workspace_id integer,
    file_name text NOT NULL,
    file_path text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

--
-- Sequences
--

CREATE SEQUENCE public.users_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE public.workspaces_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE public.ledger_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE public.payments_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE public.documents_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

--
-- Attach sequences to columns
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
ALTER SEQUENCE public.workspaces_id_seq OWNED BY public.workspaces.id;
ALTER SEQUENCE public.ledger_id_seq OWNED BY public.ledger.id;
ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;
ALTER SEQUENCE public.documents_id_seq OWNED BY public.documents.id;

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.workspaces ALTER COLUMN id SET DEFAULT nextval('public.workspaces_id_seq'::regclass);
ALTER TABLE ONLY public.ledger ALTER COLUMN id SET DEFAULT nextval('public.ledger_id_seq'::regclass);
ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);
ALTER TABLE ONLY public.documents ALTER COLUMN id SET DEFAULT nextval('public.documents_id_seq'::regclass);

--
-- Constraints
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY public.workspaces
    ADD CONSTRAINT workspaces_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.ledger
    ADD CONSTRAINT ledger_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);

--
-- Foreign Keys
--

ALTER TABLE ONLY public.workspaces
    ADD CONSTRAINT workspaces_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.ledger
    ADD CONSTRAINT ledger_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspaces(id);

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_ledger_id_fkey FOREIGN KEY (ledger_id) REFERENCES public.ledger(id);

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspaces(id);