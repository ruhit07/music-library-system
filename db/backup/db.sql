PGDMP                       |            music_library_system     16.1 (Ubuntu 16.1-1.pgdg22.04+1)     16.1 (Ubuntu 16.1-1.pgdg22.04+1) '    R           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            S           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            T           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            U           1262    19062    music_library_system    DATABASE     �   CREATE DATABASE music_library_system WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
 $   DROP DATABASE music_library_system;
                postgres    false            �            1259    19112    albums    TABLE        CREATE TABLE public.albums (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    release_year date NOT NULL,
    genre character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.albums;
       public         heap    postgres    false            �            1259    19128    albums_artists    TABLE     �   CREATE TABLE public.albums_artists (
    id integer NOT NULL,
    artist_id integer NOT NULL,
    album_id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
 "   DROP TABLE public.albums_artists;
       public         heap    postgres    false            �            1259    19127    albums_artists_id_seq    SEQUENCE     �   CREATE SEQUENCE public.albums_artists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.albums_artists_id_seq;
       public          postgres    false    222            V           0    0    albums_artists_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.albums_artists_id_seq OWNED BY public.albums_artists.id;
          public          postgres    false    221            �            1259    19111    albums_id_seq    SEQUENCE     �   CREATE SEQUENCE public.albums_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.albums_id_seq;
       public          postgres    false    218            W           0    0    albums_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.albums_id_seq OWNED BY public.albums.id;
          public          postgres    false    217            �            1259    19121    artists    TABLE     �   CREATE TABLE public.artists (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.artists;
       public         heap    postgres    false            �            1259    19120    artists_id_seq    SEQUENCE     �   CREATE SEQUENCE public.artists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.artists_id_seq;
       public          postgres    false    220            X           0    0    artists_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.artists_id_seq OWNED BY public.artists.id;
          public          postgres    false    219            �            1259    19135    songs    TABLE       CREATE TABLE public.songs (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    duration time without time zone NOT NULL,
    album_id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.songs;
       public         heap    postgres    false            �            1259    19134    songs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.songs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.songs_id_seq;
       public          postgres    false    224            Y           0    0    songs_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.songs_id_seq OWNED BY public.songs.id;
          public          postgres    false    223            �            1259    19103    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    19102    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            Z           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            �           2604    19115 	   albums id    DEFAULT     f   ALTER TABLE ONLY public.albums ALTER COLUMN id SET DEFAULT nextval('public.albums_id_seq'::regclass);
 8   ALTER TABLE public.albums ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    19131    albums_artists id    DEFAULT     v   ALTER TABLE ONLY public.albums_artists ALTER COLUMN id SET DEFAULT nextval('public.albums_artists_id_seq'::regclass);
 @   ALTER TABLE public.albums_artists ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    19124 
   artists id    DEFAULT     h   ALTER TABLE ONLY public.artists ALTER COLUMN id SET DEFAULT nextval('public.artists_id_seq'::regclass);
 9   ALTER TABLE public.artists ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    19138    songs id    DEFAULT     d   ALTER TABLE ONLY public.songs ALTER COLUMN id SET DEFAULT nextval('public.songs_id_seq'::regclass);
 7   ALTER TABLE public.songs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    19106    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            I          0    19112    albums 
   TABLE DATA           X   COPY public.albums (id, title, release_year, genre, created_at, updated_at) FROM stdin;
    public          postgres    false    218   I*       M          0    19128    albums_artists 
   TABLE DATA           Y   COPY public.albums_artists (id, artist_id, album_id, created_at, updated_at) FROM stdin;
    public          postgres    false    222   f*       K          0    19121    artists 
   TABLE DATA           C   COPY public.artists (id, name, created_at, updated_at) FROM stdin;
    public          postgres    false    220   �*       O          0    19135    songs 
   TABLE DATA           V   COPY public.songs (id, title, duration, album_id, created_at, updated_at) FROM stdin;
    public          postgres    false    224   �*       G          0    19103    users 
   TABLE DATA           U   COPY public.users (id, name, username, password, created_at, updated_at) FROM stdin;
    public          postgres    false    216   �*       [           0    0    albums_artists_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.albums_artists_id_seq', 1, false);
          public          postgres    false    221            \           0    0    albums_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.albums_id_seq', 1, false);
          public          postgres    false    217            ]           0    0    artists_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.artists_id_seq', 1, false);
          public          postgres    false    219            ^           0    0    songs_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.songs_id_seq', 1, false);
          public          postgres    false    223            _           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    215            �           2606    19133 "   albums_artists albums_artists_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.albums_artists
    ADD CONSTRAINT albums_artists_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.albums_artists DROP CONSTRAINT albums_artists_pkey;
       public            postgres    false    222            �           2606    19119    albums albums_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.albums DROP CONSTRAINT albums_pkey;
       public            postgres    false    218            �           2606    19126    artists artists_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.artists DROP CONSTRAINT artists_pkey;
       public            postgres    false    220            �           2606    19140    songs songs_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.songs DROP CONSTRAINT songs_pkey;
       public            postgres    false    224            �           2606    19110    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            I      x������ � �      M      x������ � �      K      x������ � �      O      x������ � �      G      x������ � �     