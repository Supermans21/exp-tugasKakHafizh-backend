import express from "express";
import cors from "cors";
import 'dotenv/config';
import addToWishList from "./api/add-to-wishlist.js"
import removeFromWishList from "./api/remove-from-wishlist.js"
import getWishList from "./api/get-wishlist.js"

const app = express();
const port = 3000
app.use(cors());
app.use(express.json());


app.get("/wishlist", getWishList);
app.post("/wishlist/add", addToWishList);
app.post("/wishlist/remove", removeFromWishList);

app.listen(port, () => {
    console.log(`jalan di http://localhost:${port}`)
})
