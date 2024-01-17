PGDMP      "                 |            music_library_system     16.1 (Ubuntu 16.1-1.pgdg22.04+1)     16.1 (Ubuntu 16.1-1.pgdg22.04+1) *    R           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            S           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            T           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            U           1262    19062    music_library_system    DATABASE     �   CREATE DATABASE music_library_system WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
 $   DROP DATABASE music_library_system;
                postgres    false                        2615    19211    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            V           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            W           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    19213    albums    TABLE     �   CREATE TABLE public.albums (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    release_year integer NOT NULL,
    genre character varying(255) NOT NULL,
    created_at timestamp with time zone
);
    DROP TABLE public.albums;
       public         heap    postgres    false    5            �            1259    19238    albums_artists    TABLE     �   CREATE TABLE public.albums_artists (
    id integer NOT NULL,
    artist_id integer NOT NULL,
    album_id integer NOT NULL,
    created_at timestamp with time zone
);
 "   DROP TABLE public.albums_artists;
       public         heap    postgres    false    5            �            1259    19237    albums_artists_id_seq    SEQUENCE     �   CREATE SEQUENCE public.albums_artists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.albums_artists_id_seq;
       public          postgres    false    222    5            X           0    0    albums_artists_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.albums_artists_id_seq OWNED BY public.albums_artists.id;
          public          postgres    false    221            �            1259    19212    albums_id_seq    SEQUENCE     �   CREATE SEQUENCE public.albums_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.albums_id_seq;
       public          postgres    false    216    5            Y           0    0    albums_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.albums_id_seq OWNED BY public.albums.id;
          public          postgres    false    215            �            1259    19222    artists    TABLE     �   CREATE TABLE public.artists (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone
);
    DROP TABLE public.artists;
       public         heap    postgres    false    5            �            1259    19221    artists_id_seq    SEQUENCE     �   CREATE SEQUENCE public.artists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.artists_id_seq;
       public          postgres    false    5    218            Z           0    0    artists_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.artists_id_seq OWNED BY public.artists.id;
          public          postgres    false    217            �            1259    19245    songs    TABLE     �   CREATE TABLE public.songs (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    duration time without time zone NOT NULL,
    album_id integer NOT NULL,
    created_at timestamp with time zone
);
    DROP TABLE public.songs;
       public         heap    postgres    false    5            �            1259    19244    songs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.songs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.songs_id_seq;
       public          postgres    false    224    5            [           0    0    songs_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.songs_id_seq OWNED BY public.songs.id;
          public          postgres    false    223            �            1259    19229    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false    5            �            1259    19228    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    220    5            \           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    219            �           2604    19216 	   albums id    DEFAULT     f   ALTER TABLE ONLY public.albums ALTER COLUMN id SET DEFAULT nextval('public.albums_id_seq'::regclass);
 8   ALTER TABLE public.albums ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    19241    albums_artists id    DEFAULT     v   ALTER TABLE ONLY public.albums_artists ALTER COLUMN id SET DEFAULT nextval('public.albums_artists_id_seq'::regclass);
 @   ALTER TABLE public.albums_artists ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    19225 
   artists id    DEFAULT     h   ALTER TABLE ONLY public.artists ALTER COLUMN id SET DEFAULT nextval('public.artists_id_seq'::regclass);
 9   ALTER TABLE public.artists ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    19248    songs id    DEFAULT     d   ALTER TABLE ONLY public.songs ALTER COLUMN id SET DEFAULT nextval('public.songs_id_seq'::regclass);
 7   ALTER TABLE public.songs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    19232    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            G          0    19213    albums 
   TABLE DATA           L   COPY public.albums (id, title, release_year, genre, created_at) FROM stdin;
    public          postgres    false    216   �+       M          0    19238    albums_artists 
   TABLE DATA           M   COPY public.albums_artists (id, artist_id, album_id, created_at) FROM stdin;
    public          postgres    false    222   �+       I          0    19222    artists 
   TABLE DATA           7   COPY public.artists (id, name, created_at) FROM stdin;
    public          postgres    false    218   �+       O          0    19245    songs 
   TABLE DATA           J   COPY public.songs (id, title, duration, album_id, created_at) FROM stdin;
    public          postgres    false    224    ,       K          0    19229    users 
   TABLE DATA           I   COPY public.users (id, name, username, password, created_at) FROM stdin;
    public          postgres    false    220   ,       ]           0    0    albums_artists_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.albums_artists_id_seq', 1, false);
          public          postgres    false    221            ^           0    0    albums_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.albums_id_seq', 1, false);
          public          postgres    false    215            _           0    0    artists_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.artists_id_seq', 1, false);
          public          postgres    false    217            `           0    0    songs_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.songs_id_seq', 1, false);
          public          postgres    false    223            a           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    219            �           2606    19243 "   albums_artists albums_artists_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.albums_artists
    ADD CONSTRAINT albums_artists_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.albums_artists DROP CONSTRAINT albums_artists_pkey;
       public            postgres    false    222            �           2606    19220    albums albums_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.albums DROP CONSTRAINT albums_pkey;
       public            postgres    false    216            �           2606    19227    artists artists_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.artists DROP CONSTRAINT artists_pkey;
       public            postgres    false    218            �           2606    19250    songs songs_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.songs DROP CONSTRAINT songs_pkey;
       public            postgres    false    224            �           2606    19236    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    220            G      x������ � �      M      x������ � �      I      x������ � �      O      x������ � �      K      x������ � �     