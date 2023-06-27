CREATE DATABASE TimesTableApp;

USE TimesTableApp;

CREATE TABLE Difficulty(
DifficultyID int NOT NULL AUTO_INCREMENT,
DifficultyName varchar(20) NOT NULL UNIQUE,
DifficultyDescription varchar(512) NOT NULL,
PRIMARY KEY (DifficultyID)
);

CREATE TABLE Score(
ScoreID int NOT NULL AUTO_INCREMENT,
Username int NOT NULL,
ScoreValue float NOT NULL,
PRIMARY KEY (ScoreID)
);

ALTER TABLE Score
ADD FOREIGN KEY (Username)
REFERENCES User(Username);