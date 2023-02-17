// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../lib/queryAPI';
import admin from "firebase-admin";
import { adminDb } from '../../firebaseAdmin';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

   const {prompt, chatId, model, session} = req.body;
     
   if(!prompt) {
    res.status(400).json({answer: "Please provide a prompt!"});
   }

   if(!chatId) {
    res.status(400).json({answer: "Please provide a valid chat ID!"});
   }

//ChatGPT Query
  const response = await query(prompt,chatId,model)

  const message: Message = {
    text: response || "ChatGPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
        _id: "ChatGPT",
        name: "ChatGPT",
        avatar: "https://links.papareact.com/89k",
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