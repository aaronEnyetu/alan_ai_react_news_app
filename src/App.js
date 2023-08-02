import React, { useState, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';


const alanKey = 'efc63fe002222be6d5cc6457ce709aba2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

    const [newsArticles, setNewsArticles] = useState([])


    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles }) => {
                if (command === 'newHeadlines') {
                    alert('This code was executed')
                    setNewsArticles(articles)
                    console.log(articles)
                }
            }
        })
    }, [])


    return (
        
        <div>
            <div className={classes.logoContainer}>
            <img src="https://www.intelligentcio.com/me/wp-content/uploads/sites/12/2019/04/AI-1000-web.jpg" className={classes.alanLogo} alt="logo" />
              </div>
            <NewsCards articles={newsArticles} />
        </div>
    )
}

export default App