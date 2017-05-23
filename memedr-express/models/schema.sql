DROP DATABASE IF EXISTS memedr_app;
CREATE DATABASE memedr_app;

\c memedr_app;

CREATE TABLE IF NOT EXISTS users(
    user_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    location VARCHAR(255),
    gender VARCHAR(6),
    profile_image TEXT,
    eighteen BOOLEAN,
    active BOOLEAN
);

CREATE TABLE IF NOT EXISTS subtitles(
    subtitle_id BIGSERIAL PRIMARY KEY,
    subtitle TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS api_cache(
    meme_id BIGSERIAL PRIMARY KEY NOT NULL,
    meme_link TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS save_memes(
    user_id BIGSERIAL PRIMARY KEY NOT NULL,
    meme_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (meme_id) REFERENCES api_cache(meme_id)
);

INSERT into users(username, password, email, location, gender, profile_image, eighteen, active)
    VALUES
            ('GainorB', 'burger', 'gainorbostwick@gmail.com', 'New York', 'Male', 'http://www.google.com', TRUE, TRUE),
            ('RogerB', 'burger', 'rogerbostwick@gmail.com', 'New York', 'Male', 'http://www.amazon.com', TRUE, TRUE);

INSERT into api_cache(meme_link)
    VALUES
            ('http://www.walmart.com/'),
            ('http://www.nike.com/');