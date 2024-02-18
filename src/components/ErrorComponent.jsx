import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <Alert position={"fixed"} status='error' bottom={"4"} left={"0"} w={"fit-content"} transform={"translateX(50%)"}>
      <AlertIcon/>
      {message}
    </Alert>
  )
}

export default ErrorComponent