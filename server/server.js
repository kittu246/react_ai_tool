import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const app = express();
app.use(cors());
app.use(express.json());


app.post("/ask", async (req,res)=>{

    try{

        console.log("backedn hits")
        console.log("HEADERS:", req.headers);
  console.log("BODY:", req.body);
         const {question} =req.body;
    console.log(question);

    const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: question,
  });

  console.log(response.text);

  res.json({answer: response.text })






    }

    catch(error){
        console.error("ERROR:",error.message);
        res.status(500).json({error:error.message});
    }

   



})

app.listen(5000,()=>{
    console.log("Server running on port 5000");
})