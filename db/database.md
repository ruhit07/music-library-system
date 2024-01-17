# Music Library System Database

## Tables

- [x] users
- [x] albums
- [x] artists
- [x] albums_artists
- [x] songs

## users

```sql

CREATE TABLE users(
  id                      SERIAL NOT NULL,
  name                    VARCHAR(255) NOT NULL,
  username                VARCHAR(255) NOT NULL,
  password                VARCHAR(255) NOT NULL,

  created_at              TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT users_pkey PRIMARY KEY (id));

```

## albums

```sql

CREATE TABLE albums(
  id                      SERIAL NOT NULL,
  title                   VARCHAR(255) NOT NULL,
  release_year            INTEGER NOT NULL,
  genre                   VARCHAR(255) NOT NULL,

  created_at              TIMESTAMP WITH TIME ZONE,

  CONSTRAINT albums_pkey PRIMARY KEY (id));
  
```

## artists

```sql

CREATE TABLE artists(
  id                      SERIAL NOT NULL,
  name                    VARCHAR(255) NOT NULL,

  created_at              TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT artists_pkey PRIMARY KEY (id));
  
```

## albums_artists

```sql

CREATE TABLE albums_artists(
  id                      SERIAL NOT NULL,
  artist_id               INTEGER NOT NULL,
  album_id                INTEGER NOT NULL,

  created_at              TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT albums_artists_pkey PRIMARY KEY (id));
  
```

## songs

```sql

CREATE TABLE songs(
  id                      SERIAL NOT NULL,
  title                   VARCHAR(255) NOT NULL,
  duration                TIME NOT NULL,
  album_id                INTEGER NOT NULL,
  
  created_at              TIMESTAMP WITH TIME ZONE,

  CONSTRAINT songs_pkey PRIMARY KEY (id));
  
```