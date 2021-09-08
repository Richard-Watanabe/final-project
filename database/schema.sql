set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "public"."users" (
  "userId" serial NOT NULL,
  "username" TEXT NOT NULL UNIQUE,
  "hashedPassword" TEXT NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."dogs" (
  "dogId" serial NOT NULL,
  CONSTRAINT "dogs_pk" PRIMARY KEY ("dogId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."logs" (
  "logId" serial NOT NULL,
  "userId" integer NOT NULL,
  "dogId" integer NOT NULL,
  "content" TEXT NOT NULL,
  "count" integer NOT NULL,
  "createdAt" timestamp(6) with time zone NOT NULL default now(),
  "updatedAt" timestamp(6) with time zone NOT NULL default now(),
  CONSTRAINT "logs_pk" PRIMARY KEY ("logId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."owners" (
  "userId" integer NOT NULL,
  "dogId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."photos" (
  "photoId" serial NOT NULL,
  "userId" integer NOT NULL,
  "dogId" integer NOT NULL,
  "url" TEXT NOT NULL,
  CONSTRAINT "photos_pk" PRIMARY KEY ("photoId")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "logs" ADD CONSTRAINT "logs_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "logs" ADD CONSTRAINT "logs_fk1" FOREIGN KEY ("dogId") REFERENCES "dogs"("dogId");

ALTER TABLE "owners" ADD CONSTRAINT "owners_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "owners" ADD CONSTRAINT "owners_fk1" FOREIGN KEY ("dogId") REFERENCES "dogs"("dogId");

ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "photos" ADD CONSTRAINT "photos_fk1" FOREIGN KEY ("dogId") REFERENCES "dogs"("dogId");
