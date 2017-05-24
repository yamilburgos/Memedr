## QUERIES

#### GRABS USERNAME FROM USERS TABLE AND RETURNS A TABLE WITH USERNAME AND A SPECIFIED MEMEID (USED TO FIND MATCHES)
This query shows the usernames that liked a specific meme (based on memeid).
````
SELECT users.username, users.userid, save_memes.memeid
FROM users
INNER JOIN save_memes ON users.userid = save_memes.userid
WHERE save_memes.memeid = 2;
````

#### GRABS USERNAME FROM USERS TABLE AND RETURNS A TABLE WITH AN USERNAME OF THE MEME'S THAT USER LIKES
This query shows either an username or userid and what the user likes.
Can also sort by user id:
``
WHERE users.userid = '#';
``

````
SELECT users.username, save_memes.memeid
FROM users
INNER JOIN save_memes ON users.userid = save_memes.userid
WHERE users.username = 'GainorB';
````

#### RETURNS A TABLE WITH USERNAME, USERID, GENDER, LOCATION, PROFILE IMAGE, MEMEID OF WHAT THE USERS LIKED
````
SELECT users.username, users.userid, users.gender, users.location, users.profile_image, save_memes.memeid
FROM users
INNER JOIN save_memes ON users.userid = save_memes.userid;
````



````
INSERT into users(username, password, email, location, gender, profile_image, age)
    VALUES
            ('GainorB', 'burger', 'gainorbostwick@gmail.com', 'New York', 'Male', 'http://www.google.com', 27),
            ('RogerB', 'burger', 'rogerbostwick@gmail.com', 'New York', 'Male', 'http://www.amazon.com', 18),
            ('EricS', 'burger', 'ericsanchez@gmail.com', 'New York', 'Male', 'http://www.bestbuy.com', 30);
````
````
INSERT into api_cache(meme_link)
    VALUES
            ('http://www.walmart.com/'),
            ('http://www.nike.com/'),
            ('http://www.adidas.com/');
````
````
INSERT into save_memes(userid, memeid)
    VALUES
            (1, 1),
            (2, 2),
            (3, 1);
````