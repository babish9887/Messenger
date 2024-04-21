// import { useParams } from "next/navigation";
// import { useMemo } from "react";

// const useCoversation = ()=>{
//       const params= useParams()
//       const conversationId=useMemo(()=>{
//             if(!params?.conversationId)
//                   return '';
//             return params.conversationId as string
//       },[params?.conversationId])
      
//       const isOpen = useMemo(()=> !!conversationId,[conversationId] );

//       return useMemo(()=>{{
//             isOpen,
//             conversationId
//       }},[isOpen, conversationId])
// }

// export default useCoversation;



import { useParams } from "next/navigation";
import { useMemo } from "react";

const useCoversation = () => {
    const params = useParams();
    const conversationId = useMemo(() => {
        if (!params || !params.conversationId)
            return '';
        return params.conversationId as string;
    }, [params]);

    const isOpen = useMemo(() => !!conversationId, [conversationId]);

    return {
        isOpen,
        conversationId
    };
}

export default useCoversation;
