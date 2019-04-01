CREATE TABLE users(
    firstname VARCHAR(25) NOT NULL,
    lastname VARCHAR(25) NOT NULL,
    username VARCHAR(25) NOT NULL,
    email VARCHAR(25),
    t_consumed DOUBLE DEFAULT 0,
    CONSTRAINT PK_user PRIMARY KEY (username)
    );
