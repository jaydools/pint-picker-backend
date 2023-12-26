require("dotenv").config();
const express = require("express");
const { OpenAI } = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.get("/getResponse", async (req, res) => {
    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: "user", content: "What's the best beer?" }],
            model: "gpt-3.5-turbo",
            max_tokens: 100,
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("System error.. self destruct!");
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
