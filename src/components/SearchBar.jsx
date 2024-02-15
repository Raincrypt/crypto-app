import React from 'react'

import { Input } from '@chakra-ui/react'

const SearchBar = ({placeholder, onKeyDown}) => {
  return (
    <div>
        <Input variant='filled' placeholder={placeholder} onKeyUp={onKeyDown} />
    </div>
  )
}

export default SearchBar