import { Alert } from 'flowbite-react';
import React from 'react'


const Message = ({message,type}) => {
if(message){
    return  <Alert color={type}>{message}</Alert>
}
}

export default Message
