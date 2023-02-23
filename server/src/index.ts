import express from "express";

const app = express();

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`);
});
