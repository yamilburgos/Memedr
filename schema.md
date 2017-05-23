## QUERIES

#### GRABS USERNAME FROM USERS TABLE AND RETURNS A TABLE WITH USERNAME AND A SPECIFIED MEMEID (USED TO FIND MATCHES)
````
SELECT users.username, save_memes.memeid
FROM users
INNER JOIN save_memes ON users.userid = save_memes.userid
WHERE save_memes.memeid = 2;
````

