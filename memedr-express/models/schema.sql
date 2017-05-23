DROP DATABASE IF EXISTS memedr_app;
CREATE DATABASE memedr_app;

\c memedr_app;

CREATE TABLE IF NOT EXISTS users(
    userid BIGSERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    location VARCHAR(100) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    profile_image TEXT NOT NULL,
    age INTEGER(5) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    CHECK (age>=18)
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

INSERT into users(username, password, email, location, gender, profile_image, age)
    VALUES
            ('GainorB', 'burger', 'gainorbostwick@gmail.com', 'New York', 'Male', 'http://www.google.com', 27),
            ('RogerB', 'burger', 'rogerbostwick@gmail.com', 'New York', 'Male', 'http://www.amazon.com', 18),
            ('EricS', 'burger', 'ericsanchez@gmail.com', 'New York', 'Male', 'http://www.bestbuy.com', 30);

INSERT into api_cache(meme_link)
    VALUES
            ('http://www.walmart.com/'),
            ('http://www.nike.com/'),
            ('http://www.adidas.com/');

INSERT into save_memes(userid, memeid)
    VALUES
            (1, 1),
            (2, 2),
            (3, 1);