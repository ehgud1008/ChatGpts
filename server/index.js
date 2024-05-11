import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import openAi from "openai";
import cors from 'cors';
import dialogflowRouter from './routers/dialogflow.js'

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

app.use('/server/dialogflow', dialogflowRouter);

app.get("/", (req, res, next) => {
  res.send("hello world!");
});

app.post("/server/responseBot", async (req, res, next) => {
  try {
    const prompt = req.body.prompt;
    // const response = await openai.createChatCompletion({ //openai v4에서는 이 방식 사용 안 함.
    const response = await openai.chat.completions.create({
        // model: "gpt-3.5-turbo",
        model: "gpt-4-turbo",
        //temperature : 0~무한대, 창의성이 필요한 경우 높은 온도로 설정하여 사용, default-0.7
        //챗봇이라면 temperature은 낮추는걸 추천
        temperature: 1, 
        max_tokens: 2000, //default: 256, max: 2048
        top_p: 1,
        //frequency_penalty : 생성된 텍스트에서 자주 등장하는 단어를 억제함. 
        //1에 가까울 수록 흔히 사용되는 단어를 덜 사용하고, 창의적이거나 독특한 단어 사용.
        frequency_penalty: 0,
        //presence_penalty : 동일 단언아 표현을 반복하는 것을 피함. 
        presence_penalty: 0,
        messages: [ {"role" : "system", "content": "Please tell me only Korean."},
                    // {"role": "assistant", "content": ""},
                    {"role": "user", "content" : prompt}
                  ],
        //role : 'system', 'assistant', 'user', 'function'
        //

        // {"messages": 
        // [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, 
        // {"role": "user", "content": "What's the capital of France?"}, 
        // {"role": "assistant", "content": "Paris, as if everyone doesn't know that already."}]}

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
