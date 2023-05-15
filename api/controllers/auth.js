import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//registracija novih usera, prvo provjerimo postoji li user s danim emailom ili usernamemom u bazi, ako ne postoji radimo insertanje novog korisnika u bazu, lozinku hash obavezno!, ako postoji vraćamo da user već postoji
export const register = (req, res) => {
    
    //CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists!");

        //Hash password and create a user
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
                const values = [
                    req.body.username,
                    req.body.email,
                    hash,
                ]
                console.log(values);
                db.query(q, [values], (err, data) => {
                    if(err) return res.json(err);
                    return res.status(200).json("User has been created!")
                });
            });
        });
    });
}
//provjeravamo postoji li username u bazi, ako ne postoji kazemo da ne postoji, ako postoji moramo provjeriti podudara li se poslani password sa passwordom u bazi, ako da korisnik je logiran ako ne vracamo da je krivi username ili password
//koristimo json web token //https://jwt.io/introduction kako bi kasnije mogli identificirati je li korisnik logiran i ako je koji je korisnik logiran
export const login = (req, res) => {
    //CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User not found!");

        bcrypt.compare(req.body.password, data[0].password, function(err, result) {
            if(err) return res.status(500).json(err);
            if(!result) return res.status(400).json("Wrong username or password");
            
            const token = jwt.sign({id : data[0].id}, "jwtkey");

            const {password, ...other} = data[0]

            res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json(other);
        });
    })
}


//brisemo acces_token i odlogiramo korisnika 
export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
}