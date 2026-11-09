CREATE DATABASE plantcare;

USE plantcare;

CREATE TABLE plantas (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    especie VARCHAR(100) NOT NULL,

    ambiente VARCHAR(50) NOT NULL,

    frequencia_rega VARCHAR(100) NOT NULL,

    ativo TINYINT(1) DEFAULT 1

);
