

-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" ("username", "hashedPassword", "dogId")
values ('anonymous', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA',0);

-- insert into "dogs" ("dogName")
-- values ('doge');

-- insert into "owners" ("userId", "dogId")
-- values (1, 1)
