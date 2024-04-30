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
        //0~무한대, 창의성이 필요한 경우 높은 온도로 설정하여 사용, default-0.7
        //챗봇이라면 temperature은 낮추는걸 추천
        temperature: 1, 
        max_tokens: 2000, //default: 256, max: 2048
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        messages: [ {"role" : "system", "content": "넌 초등학교 선생님이야. "} ],
        messages: [ {"role": "user", "content" : prompt}]
        //role : 'system', 'assistant', 'user', 'function'
        //
    });
    console.log(response);
    console.log(response.choices[0].message);
    res.status(200).send({
        bot : response.choices[0].message, 
    })
    // res.status(200).json({ response: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).send({ error: error.message });
    if(error  instanceof openAi.APIError){
      console.error("Error calling OpenAI: ", error);
      console.error(error.status);
      console.error(error.message);
      console.error(error.code);
      console.error(error.type);
    }else{
      console.log(error);
    }
  }
});

app.listen(port, function () {
  console.log("server on! " + port);
});
