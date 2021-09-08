

-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" ("username", "hashedPassword")
values ('anonymous', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA');

insert into "dogs"
default values;

insert into "photos" ("userId", "dogId", "url")
values (1, 1, 'https://thejapantry.com/wp-content/uploads/2019/05/Cutest-Shiba-Inu-Puppy-e1559327476333.jpg');

insert into "owners" ("userId", "dogId")
values (1, 1)
