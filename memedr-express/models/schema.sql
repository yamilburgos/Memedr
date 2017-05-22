DROP DATABASE IF EXISTS memedr_app;
CREATE DATABASE memedr_app;

\c memedr_app;

CREATE TABLE IF NOT EXISTS users(
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    location VARCHAR(255),
    gender VARCHAR(255),
    profile_image TEXT,
    eighteen BOOLEAN,
);

CREATE TABLE IF NOT EXISTS cache(
    id BIGSERIAL PRIMARY KEY,
    meme_link TEXT
);

CREATE TABLE IF NOT EXISTS saves(
    id BIGSERIAL PRIMARY KEY,
);

CREATE TABLE IF NOT EXISTS matches(
    id BIGSERIAL PRIMARY KEY,
);

CREATE TABLE IF NOT EXISTS subtitles(
    id BIGSERIAL PRIMARY KEY,
    subtitle TEXT
);