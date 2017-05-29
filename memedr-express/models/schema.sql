DROP DATABASE IF EXISTS memedr_app;
CREATE DATABASE memedr_app;

\c memedr_app;

CREATE TABLE IF NOT EXISTS users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    profile_image TEXT NOT NULL,
    age INTEGER NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    CHECK (age>=16),
    CHECK (gender = 'Male' OR gender = 'Female'),
    CHECK (location = 'Queens' OR location = 'Manhattan' 
        OR location = 'Staten Island' OR location = 'Brooklyn' 
        OR location = 'Bronx')
);

CREATE TABLE IF NOT EXISTS subtitles(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    subtitle TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS api_cache(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    meme_link TEXT UNIQUE NOT NULL,
    meme_name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS liked_memes(
    liked_meme_id BIGSERIAL PRIMARY KEY NOT NULL,
    userid INTEGER NOT NULL,
    memeid INTEGER NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (memeid) REFERENCES api_cache(id)
);

CREATE TABLE IF NOT EXISTS users_matches(
    users_matches_id BIGSERIAL PRIMARY KEY NOT NULL,
    userid INTEGER NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    meme_in_common INTEGER NOT NULL,
    gender VARCHAR(6) NOT NULL,
    location VARCHAR(200) NOT NULL,
    profile_image TEXT NOT NULL,
    email VARCHAR(200) NOT NULL,
    age INTEGER NOT NULL,
    who_clicked_matches INTEGER NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (meme_in_common) REFERENCES api_cache(id)
);