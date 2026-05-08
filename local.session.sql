-- SELECT datname FROM pg_database;
-- CREATE DATABASE portfolio;

-- all 7 tables listed
-- SELECT table_name 
-- FROM information_schema.tables 
-- WHERE table_schema = 'public';

-- SELECT * FROM profile;
-- SELECT * FROM profile
-- WHERE role = 'admin';
SELECT * FROM profile
WHERE role = 'user';

-- UPDATE profile SET "name" = 'Sakshi Markal' WHERE role = 'user';

-- UPDATE profile
-- SET "profilePic" = NULL
-- WHERE role = 'user';

-- SELECT * FROM project;
-- SELECT * FROM stats;
-- SELECT * FROM skills;

-- UPDATE skills
-- SET "icon" = 'https://img.icons8.com/?size=100&id=20909&format=png&color=000000'
-- WHERE id = 2;

-- SELECT * FROM experience;
-- SELECT * FROM education;
-- SELECT * FROM contact;