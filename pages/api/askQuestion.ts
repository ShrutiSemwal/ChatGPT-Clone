// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {textQuery, imageQuery} from '../../lib/queryAPI';
import admin from "firebase-admin";
import { adminDb } from '../../firebaseAdmin';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

   const {prompt, chatId, model, session, isImageGenerator} = req.body;
     
   if(!prompt) {
    res.status(400).json({answer: "Please provide a prompt!"});
   }

   if(!chatId) {
    res.status(400).json({answer: "Please provide a valid chat ID!"});
   }

   let response

   if(isImageGenerator) {
    response = await imageQuery(prompt)
   } else {
    response = await textQuery(prompt,model)
   }

   const imageGeneratorValue: boolean = model === 'ImageGenerator' ? true : false

  const message: Message = {
    text: response || "ChatGPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
        _id: "ChatGPT",
        name: "ChatGPT",
        avatar: "https://links.papareact.com/89k",
        isImageGenerator: imageGeneratorValue
    },

  };

  await adminDb
  .collection("users")
  .doc(session?.user?.email)
  .collection("chats")
  .doc(chatId)
  .collection("messages")
  .add(message);

  res.status(200).json({answer: message.text});
}