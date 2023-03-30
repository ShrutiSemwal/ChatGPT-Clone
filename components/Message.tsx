import { DocumentData } from "firebase/firestore";
import { toast } from "react-hot-toast";

type Props = {
    message: DocumentData;
};

function Message({message} : Props) {
    const isChatGPT = message.user.name === "ChatGPT";

    const downloadImage = (url: string) => {
        fetch(url, { mode: 'no-cors'})
         .then(response => {
             return response.blob()
             })
        .then(blob => {
         const objectUrl = URL.createObjectURL(blob)
         const link = document.createElement('a')
 
         link.href = objectUrl
         link.download = 'image.png'
 
         document.body.appendChild(link)
         link.click()
 
         URL.revokeObjectURL(objectUrl)
         document.body.removeChild(link)
        }).catch(error => {
         console.log('Image download failed:',error)
         toast.error('Image Download failed')
        })
     }
  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
        <div className="flex space-x-5 px-10 max-w-2xl max-auto ">
            <img src={message.user.avatar} 
            alt=""
            className="h-8 w-8"
             />
             {message.user.isImageGenerator && <p className="pt-1 text-sm">
                <img src={message.text} alt=""/>
                <button className="" onClick={() => downloadImage(message.text)}>Download Image</button>
            </p>}
            {!message.user.isImageGenerator && 
                <p className="pt-1 text-sm">
                {message.text}
            </p>
            }
        </div>
    </div>
  )
}

export default Message