DROP DATABASE IF EXISTS memedr_app;
CREATE DATABASE memedr_app;

\c memedr_app;

CREATE TABLE IF NOT EXISTS users(
    userid BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    profile_image TEXT NOT NULL,
    eighteen BOOLEAN NOT NULL,
    active BOOLEAN
);

CREATE TABLE IF NOT EXISTS subtitles(
    subtitleid BIGSERIAL PRIMARY KEY NOT NULL,
    subtitle TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS api_cache(
    memeid BIGSERIAL PRIMARY KEY NOT NULL,
    meme_link TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS save_memes(
    userid INTEGER NOT NULL,
    memeid INTEGER NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (memeid) REFERENCES api_cache(memeid)
);

INSERT into users(username, password, email, location, gender, profile_image, eighteen, active)
    VALUES
            ('GainorB', 'burger', 'gainorbostwick@gmail.com', 'New York', 'Male', 'http://www.google.com', TRUE, TRUE),
            ('RogerB', 'burger', 'rogerbostwick@gmail.com', 'New York', 'Male', 'http://www.amazon.com', TRUE, TRUE),
            ('EricS', 'burger', 'ericsanchez@gmail.com', 'New York', 'Male', 'http://www.bestbuy.com', TRUE, TRUE);

INSERT into api_cache(meme_link)
    VALUES
            ('http://www.walmart.com/'),
            ('http://www.nike.com/');

INSERT into save_memes(userid, memeid)
    VALUES
            (1, 2),
            (2, 2),
            (3, 1);