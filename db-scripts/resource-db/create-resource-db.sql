CREATE DATABASE TimesTableApp;

USE TimesTableApp;

CREATE TABLE User(
UserID int NOT NULL AUTO_INCREMENT,
DifficultyID int NOT NULL,
Username varchar(64) NOT NULL UNIQUE,
FirstName varchar(128) NOT NULL,
PasswordHash varchar(256) NOT NULL,
Salt varchar(64) NOT NULL,
PRIMARY KEY (UserID)
);

CREATE TABLE Difficulty(
DifficultyID int NOT NULL AUTO_INCREMENT,
DifficultyName varchar(20) NOT NULL UNIQUE,
DifficultyDescription varchar(512) NOT NULL,
PRIMARY KEY (DifficultyID)
);

CREATE TABLE Score(
ScoreID int NOT NULL AUTO_INCREMENT,
UserID int NOT NULL,
DifficultyID int NOT NULL,
ScoreDate datetime NOT NULL,
ScoreValue float NOT NULL,
PRIMARY KEY (ScoreID)
);

ALTER TABLE User
ADD FOREIGN KEY (DifficultyID)
REFERENCES Difficulty(DifficultyID);

ALTER TABLE Score
ADD FOREIGN KEY (UserID)
REFERENCES User(UserID);

ALTER TABLE Score
ADD FOREIGN KEY (DifficultyID)
REFERENCES Difficulty(DifficultyID);