-- 01_users_seeds.sql

INSERT INTO users (first_name, last_name, password, email, avatar, text_alert, is_active) VALUES
  ('Dylan', 'Pirrotta', '1234', 'test1@test.com', 'https://avatars.githubusercontent.com/u/83779291?v=4', true, true),
  ('Pablo', 'Tack', '1234', 'test2@test.com', 'https://avatars.githubusercontent.com/u/93554557?v=4', true, true),
  ('Vince', 'Emond', '1234', 'test3@test.com', 'https://i.ibb.co/4WXcywP/Screenshot-of-maya-photo-of-me-35mm.png', true, true),
  ('Andy', 'Lindsay', '1234', 'test4@test.com', 'https://avatars.githubusercontent.com/u/16171227?v=4', false, true)
;
