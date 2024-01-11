CREATE TABLE
    IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

INSERT INTO users (email, password)
VALUES (
  'mr.shab@gmail.com',
  'Mr.Shab#12345'
);

