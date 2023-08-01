import React, { useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'


const alanKey = 'efc63fe002222be6d5cc6457ce709aba2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command }) => {
                if (command === 'testCommand') {
                    alert('This code was executed')
                }
            }
        })
    }, [])


    return (
        
        <div>
            <h1>AI News Application</h1>
        </div>
    )
}

export default App