CREATE DATABASE shortener_url;

CREATE Table Users(
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE Table Shorter_url(
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_ID INT NOT NULL,
  original_url VARCHAR(500) NOT NULL,
  shorter_url VARCHAR(500) NOT NULL,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER Table Shorter_url ADD constraint fk_user
Foreign Key (user_ID) REFERENCES Users(ID);

insert into Users (username) VALUES ('farid');
insert into Shorter_url(user_ID, Shorter_url, original_url) VALUES (1, 'none', 'none');