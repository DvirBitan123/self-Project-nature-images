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
        imageDate VARCHAR(100) NOT NULL,
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
        imageDate,
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



'three fields': 'https://cdn.discordapp.com/attachments/574841205217689613/1190222433102352405/DJI_0057.JPG?ex=65a10405&is=658e8f05&hm=8ffd0c73a063e54a63d39850fdee3599f07256da7aa9c88f675f2ce6a2566370&';
'whoop whoop': 'https://cdn.discordapp.com/attachments/574841205217689613/1190221816246059088/a2d50295ddd7b10f.jpg?ex=65a10372&is=658e8e72&hm=40f64a86fdc5c2330cf41b892fc39ca2d6a3dee88b9881e429052f58cc508c9f&';
'crested lark': 'https://cdn.discordapp.com/attachments/574841205217689613/1190221351341006889/IMG_4866.JPG?ex=65a10303&is=658e8e03&hm=7b0b27b71b38b1094bb75ef70f3f841dcf6cb8672c74cdaefbf444bd48034979&';
'nutria': 'https://cdn.discordapp.com/attachments/574841205217689613/1190221812106281091/IMG_5264.JPG?ex=65a10371&is=658e8e71&hm=26a4b108dac4fbfb6352692ba86b7ceb83336ead41d582db931f04c0c779818a&';
'lemur': 'https://cdn.discordapp.com/attachments/574841205217689613/1190221815172321401/IMG_9287.JPG?ex=65a10371&is=658e8e71&hm=422ebe73edb543261bf1cb676e7c574a733e912d05caa149c41dcf1b88ae33f0&';
'butterfly': 'https://cdn.discordapp.com/attachments/574841205217689613/1190222424051044433/IMG_3978.JPG?ex=65a10403&is=658e8f03&hm=2d9d3e9099088dff2ba16bebf7507b4966910e20145c8e74b195c963430c97cf&';
'dragonfly protrait': 'https://cdn.discordapp.com/attachments/574841205217689613/1190221813674946590/IMG_2946.JPG?ex=65a10371&is=658e8e71&hm=2bd1b873992cad30d5bcca502430f057b4457d0ddedf69343113242896e36f11&';

