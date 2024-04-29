import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import openAi from "openai";
import cors from 'cors';

//.env 설정파일 호출
dotenv.config();


const apiKey = process.env.OPENAI_API_KEY; // apiKey 변수에 저장
const projectId = process.env.OPENAI_PROJECT_ID; // 프로젝트 ID 환경 변수 추가
const orgId = process.env.OPENAI_ORG_ID;    // 조직 ID 환경 변수 추가

const openai = new openAi({
  apiKey: apiKey,
  organization: orgId,
  project: projectId,
});

// mongoose.connect(process.env.MONGODB, { dbName: 'chatGpts'})
//     .then( () => {console.log("DB connected"); })
//     .catch( (error) => { console.error(error)} );

const app = express();
app.use(cors());
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "client/public")));

app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.send("hello world!");
});

app.post("/server/responseBot", async (req, res, next) => {
  console.log("asdfadsf");

  try {
    const prompt = req.body.prompt;
    // const response = await openai.createChatCompletion({
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        prompt: `${prompt}`,
        temperature: 1,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    });
    console.log(response);
    res.status(200).send({
        bot : response.data.choices[0].text.trim() 
    })
    // res.status(200).json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI: ", error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, function () {
  console.log("server on! " + port);
});
