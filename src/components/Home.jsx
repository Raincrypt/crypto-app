import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import {motion} from "framer-motion"

import HomeImage from "../assets/crypto_home.png"

const Home = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}
    >
      <motion.div style={{
          height: "80vh",
          }}
          animate={{
            translateY: "50px",
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
        <Image w={"full"} h={"full"} objectFit={"contain"} src={HomeImage} alt={'Home Image'}/>
      </motion.div>
      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={"-20"}
      >
        Xcrypto
      </Text>
    </Box>
  )
}

export default Home