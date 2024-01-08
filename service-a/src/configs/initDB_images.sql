CREATE TABLE
    IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        UNIQUE(name)
    );

CREATE TABLE
    IF NOT EXISTS equipment (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        UNIQUE(name)
    );

CREATE TABLE
    IF NOT EXISTS images (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        url VARCHAR(255) NOT NULL,
        alt VARCHAR(100) NOT NULL,
        description VARCHAR(300) NOT NULL,
        category UUID NOT NULL,
        equipment UUID NOT NULL,
        date VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        lng INT NOT NULL,
        lat INT NOT NULL,
        FOREIGN KEY (category) REFERENCES categories(id),
        FOREIGN KEY (equipment) REFERENCES equipment(id),
        UNIQUE(url)
    );

INSERT INTO categories (name)
VALUES ('Animals'), ('Birds'), ('Reptails'), ('Insects'), ('plants'), ('Landscapes');

INSERT INTO equipment (name)
VALUES ('Canon EOS 70D'), ('Canon EOS 80D'), ('Mavic 2 pro');

INSERT INTO
    images (
        url,
        alt,
        description,
        category,
        equipment,
        date,
        location,
        lng,
        lat
    )
VALUES (
        'http://localhost:8181/public/DJI_0078.jpg',
        'Bitronot Ruhama Fields',
        'Bitronot Ruhama Fields in spring', (
            SELECT id
            FROM categories
            WHERE
                name = 'Landscapes'
        ), (
            SELECT id
            FROM equipment
            WHERE
                name = 'Mavic 2 pro'
        ),
        '2023/04/26',
        'Ruhama vilage, Israel',
        25.34,
        -12.36
    ), (
        'http://localhost:8181/public/DJI_0930.jpg',
        'Brechya fields',
        'Brechya fields look from above', (
            SELECT id
            FROM categories
            WHERE
                name = 'Landscapes'
        ), (
            SELECT id
            FROM equipment
            WHERE
                name = 'Mavic 2 pro'
        ),
        '2022/02/20',
        'Brechya vilage, Israel',
        27.34,
        -18.36
    ), (
        'http://localhost:8181/public/IMG_1776.jpg',
        'Sinai fan-fingered gecko',
        'Sinai fan-fingered gecko on an house enterace gate', (
            SELECT id
            FROM categories
            WHERE
                name = 'Reptails'
        ), (
            SELECT id
            FROM equipment
            WHERE
                name = 'Canon EOS 70D'
        ),
        '2019/09/13',
        'Brechya vilage, Israel',
        27.34,
        -18.36
    ), (
        'http://localhost:8181/public/DJI_0057.jpg',
        'Three Wheat fields',
        'Three harvested wheat fields at spring', (
            SELECT id
            FROM categories
            WHERE
                name = 'Landscapes'
        ), (
            SELECT id
            FROM equipment
            WHERE
                name = 'Mavic 2 pro'
        ),
        '2023/04/11',
        'Brechya vilage, Israel',
        27.34,
        -18.36
    ), (
        'http://localhost:8181/public/hoopoe.jpg',
        'Hoopoe',
        'A hoopoe on the grass', (
            SELECT id
            FROM categories
            WHERE
                name = 'Birds'
        ), (
            SELECT id
            FROM equipment
            WHERE
                name = 'Canon EOS 70D'
        ),
        '16/10/2019',
        'Ashkelon beach, Israel',
        29.34,
        -15.36
    ), (
      'http://localhost:8181/public/IMG_4866.jpg',
        'Crested Lark',
        'Crested Lark on a spine at spring', (
            SELECT id
            FROM categories
            WHERE
                name = 'Birds'
        ), (
            SELECT id
            FROM equipment
            WHERE
                name = 'Canon EOS 80D'
        ),
        '05/04/2022',
        'Brechya vilage, Israel',
        27.34,
        -18.36
    ), (
        'http://localhost:8181/public/IMG_5264.jpg',
        'Nutria eats',
        'Nutria eats at The Agamon Hula', (
            SELECT id
            FROM categories
            WHERE
                name = 'Animals'
        ), (
            SELECT id
            FROM equipment
            WHERE
                name = 'Canon EOS 70D'
        ),
        '08/11/2019',
        'The Agamon Hula, Israel',
        88.34,
        22.36
    );