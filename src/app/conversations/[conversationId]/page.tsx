import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface ID_Params{
      conversationId: string;
}

const ConversationId = async ({params}:{params:ID_Params})=>{
      const conversation=await getConversationById(params.conversationId)
      const messages=await getMessages(params.conversationId);
      if(!conversation){
            return(
                  <div className="lg:pl-80 h-full">
                        <div className="h-full flex flex-col">
                              <EmptyState />

                        </div>
                  </div>
            );
      }

      return(
            <div className="lg:pl-80  h-full sm:pl-[100px] lg:w-full ">
                  <div className="h-full flex flex-col" >
                        <Header conversation={conversation} messages={messages} />
                        <Body initialMessages={messages}/>
                        <Form />
                  </div>
            </div>
      )
}
export default ConversationId;