-- 06_messages_seeds.sql

SET TIME ZONE 'US/Pacific';

INSERT INTO messages (sender_id, content, time_stamp, is_active) VALUES
  (1, 'Good morning!', '2022-04-22 07:10:11-07', true),
  (2, 'Hey!', '2022-04-22 07:15:32-07', true),
  (4, 'Macdonalds for breakfast anyone?', '2022-04-22 08:00:32-07', true),
  (1, 'I''ve completed the message board testing', '2022-04-22 13:25:22-07', true),
  (2, 'Awesome I''ll pull your changes from github', '2019-04-22 14:45:22-07', true),
  (1, 'Will do!', '2022-04-22 14:23:22-07', true)
;
