DROP DATABASE IF EXISTS memedr_app;
CREATE DATABASE memedr_app;

\c memedr_app;

CREATE TABLE IF NOT EXISTS users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    location VARCHAR(200) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    profile_image TEXT NOT NULL,
    age INTEGER NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    CHECK (age>=18),
    CHECK (gender = 'male' OR gender = 'female')
);

CREATE TABLE IF NOT EXISTS subtitles(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    subtitle TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS api_cache(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    meme_link TEXT UNIQUE NOT NULL,
    meme_name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS save_memes(
    save_meme_id BIGSERIAL PRIMARY KEY NOT NULL,
    userid INTEGER NOT NULL,
    memeid INTEGER NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (memeid) REFERENCES api_cache(id)
);

CREATE TABLE IF NOT EXISTS users_matches(
    users_matches_id BIGSERIAL PRIMARY KEY NOT NULL,
    userid INTEGER NOT NULL,
    username TEXT NOT NULL,
    gender TEXT NOT NULL,
    location TEXT NOT NULL,
    profile_image TEXT NOT NULL,
    email TEXT NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id)
);