require("dotenv").config();
const express = require("express");
const { OpenAI } = require("openai");
const cors = require("cors");

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/getResponse", async (req, res) => {
    try {
        const userPrompt = req.body.userPrompt;
        const response = await openai.chat.completions.create({
            messages: [{ role: "user", content: userPrompt }],
            model: "gpt-3.5-turbo",
            max_tokens: 300,
        });
        console.log(response.choices[0].message.content);
        res.status(200).json({
            message: response.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("System error.. self destruct!");
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
