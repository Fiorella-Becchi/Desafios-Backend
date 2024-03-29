import express from "express";
import { Router } from "express";

const router = express.Router();

const viajes = [
    {name:"Paris", price: "100"},
    {name:"Lisboa", price: "20"},
    {name:"Bruselas", price: "40"},
    {name:"Amsterdam", price: "120"},
    {name:"Roma", price: "150"}
];

router.get("/", (req, res) => {
    const testUser = {
        name: "Hilda",
        lastName: "Martinez",
        role: "admin"
    }

    res.render(
        "index",
        {
            title: "Cuarto Desafio",
            style: "index.css",
            user: testUser,
            isAdmin: testUser.role === "admin",
            viajes
        }
    )
});

export default router;