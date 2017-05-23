## QUERIES

#### GRABS USERNAME FROM USERS TABLE AND RETURNS A TABLE WITH USERNAME AND A SPECIFIED MEMEID (USED TO FIND MATCHES)
This query shows the usernames that liked the same meme (based on memeid).
````
SELECT users.username, save_memes.memeid
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

