import {useEffect,useState, useRef} from 'react'
function DirectMessage(props) { 

    const {recipientName,recipientID,listOfMessages,userHeaders,setListOfMessages, counter2, setCounter2} = props
    const [message,setMessage] = useState("")
    const [value,setValue] = useState(0)
    const [loading,setLoading] = useState()
    const endOfMessages2 = useRef(null)
    
    function handleChange(e){
        setMessage(e.target.value)
    }
    
    async function sendMessage(){
        await fetch(`https://slackapi.avionschool.com/api/v1/messages?receiver_id=${recipientID}&receiver_class=User&body=${message}`,
            {method: "POST",
            headers: userHeaders, 
            mode:"cors"})
        .then(response=>response.json())
        .then(data=>{
            setValue(value=>value+1)
            })
        .catch((error) => {
            console.log(error)
        })
    }
    function handleSentMessage(){
        sendMessage()
        setMessage("")
    }

    function handleSentMessageEnterKey(e){
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSentMessage()
        }
    }

    async function retrieveMessages(){
        await fetch(`https://slackapi.avionschool.com/api/v1/messages?receiver_id=${recipientID}&receiver_class=User`,
        {method: "GET",
        headers: userHeaders, 
        mode:"cors"})
        .then(response=>response.json())
        .then(data=> {
            if(data.data.length!==0){
                const messagesData = data.data
                let tempListOfMessages = []
                messagesData.forEach(message => {
                    tempListOfMessages.push(message)
                })
                setListOfMessages(tempListOfMessages)
            } else {
                console.log("NO MESSAGES")
            }
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        }) 
    }

    useEffect( ()=>{
        retrieveMessages()
    },[recipientName,value])

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter2(counter2 + 1)
            retrieveMessages()
        }, 5000);
        return () => {
          clearInterval(interval);
        };
      }, [counter2, recipientID]);

    const scrollToBottom = () => {
        endOfMessages2.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(()=>{
        scrollToBottom()
    },[listOfMessages])

    return (
        <div className="h-full flex flex-col justify-between max-h-screen">
            <div className="border-solid border-purple-300 border-2 bg-white p-3 flex justify-between">
                <span className="font-bold text-3xl">{recipientName} #{recipientID}</span>
            </div>

            <div className=" p-4 h-screen max-h-90 overflow-y-scroll">
                {loading ? 
                <div className="text-center my-10"> Fetching Messages </div>
                : 
                listOfMessages.map((message) => 
                <div className={message.sender.uid===userHeaders.uid ? "ml-auto mr-0 w-2/6" : "ml-0 mr-auto w-2/6"}>
                    <div className={message.sender.uid===userHeaders.uid ? "m-3 font-semibold text-right" : "m-3 font-semibold"}>{message.sender.uid}</div>
                    <div className={message.sender.uid===userHeaders.uid ? "border-solid rounded-md border-purple-300 border-2 text-lg p-4 m-3 bg-purple-700 text-white" : "bg-purple-800 border-solid rounded-md border-purple-300 border-2 text-lg p-4 m-3 text-white"}>
                            <span>{message.body}</span>
                    </div>
                </div>
                )
                }
                <div className="h-px w-px" ref={endOfMessages2}> </div>
            </div>
                

            <div className="p-4">
                <textarea className="border-solid border-purple-300 border-2 resize-none w-full h-40 p-4" name="message" onChange={handleChange} onKeyPress={handleSentMessageEnterKey} value={message}></textarea>
                <button class="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded" onClick={() => handleSentMessage()}>
                    Send Message
                </button>
            </div>
        </div>
    )
}

export default DirectMessage
