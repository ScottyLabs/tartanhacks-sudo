import React, { useState, useEffect } from 'react';  
import Card from "../components/Card";
import {
    VStack
  } from '@chakra-ui/react'
function Sidebar(categories: Array<any>)
{
    return(
        <div>
            <VStack h = "100%">
                {categories.map(item => 
                {
                    return Card(item, []);
                })}
            </VStack>
        </div>
    )
}

export default Sidebar;