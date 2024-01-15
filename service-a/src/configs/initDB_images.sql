CREATE TABLE
    IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        UNIQUE(name)
    );

INSERT INTO categories (name)
VALUES ('Animals'), ('Birds'), ('Reptails'), ('Insects'), ('plants'), ('Landscapes');

CREATE TABLE
    IF NOT EXISTS equipment (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        UNIQUE(name)
    );

INSERT INTO equipment (name)
VALUES ('Canon EOS 70D'), ('Canon EOS 80D'), ('Mavic 2 pro');

CREATE TABLE IF NOT EXISTS users_ids (user_id UUID PRIMARY KEY);

INSERT INTO users_ids (user_id)
VALUES (
        '7a8fa447-dd33-4231-8e8d-55250a3358cf'
    ), (
        '04cea7c6-96fd-4470-9f0c-b7fa9ce3115f'
    ), (
        "cb17769f-b7e3-4ea4-821a-71280d14acbe"
    )

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
        lng FLOAT NOT NULL,
        lat FLOAT NOT NULL,
        FOREIGN KEY (category) REFERENCES categories(id),
        FOREIGN KEY (equipment) REFERENCES equipment(id),
        UNIQUE(url)
    );

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
        34.723,
        31.492
    ), (
        'http://localhost:8181/public/DJI_0930.jpg',
        'Brechya fields',
        'Brechya fields view from above', (
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
        34.618,
        31.673
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
        34.621,
        31.668
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
        34.620,
        31.673
    ), (
        'http://localhost:8181/public/hoopoe.jpg',
        'Hoopoe',
        'A hoopoe swallows an insect', (
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
        34.562,
        31.687
    ), (
        'http://localhost:8181/public/IMG_4866.jpg',
        'Crested Lark',
        'Crested Lark on a spotted golden thistle', (
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
        34.622,
        31.670
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
        35.619,
        33.099
    ), (
        'http://localhost:8181/public/IMG_5154.jpg',
        'mountain gazelle',
        'mountain gazelle in the Gazelle Valley', (
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
        '27/07/2021',
        'Gazelle Valley, Jerusalem, Israel',
        35.195,
        31.760
    ), (
        'http://localhost:8181/public/IMG_9287.jpg',
        'Ring-tailed lemur',
        'Ring-tailed lemur yawning in The Biblical zoo', (
            SELECT id
            FROM categories
            WHERE
                name = 'Animals'
        ), (
            SELECT id
            FROM equipment
            WHERE
                name = 'Canon EOS 80D'
        ),
        '18/09/2022',
        'The Biblical zoo, Jerusalem, Israel',
        35.176,
        31.746
    );