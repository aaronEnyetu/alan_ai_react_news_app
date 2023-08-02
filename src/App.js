import React, { useState, useLayoutEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import logo from './images/aaronLogo.jpg';
import NewsCards from './components/NewsCards/NewsCards';

import useStyles from './styles';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
 

  const classes = useStyles();

    useLayoutEffect(() => {
     
        function updateScreen(time) {
            alanBtn({
                key: 'efc63fe002222be6d5cc6457ce709aba2e956eca572e1d8b807a3e2338fdd0dc/stage',
                onCommand: ({ command, articles, number }) => {
                    if (command === 'newHeadlines') {
                        setNewsArticles(articles);
                        setActiveArticle(-1);
                    } else if (command === 'highlight') {
                        setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                    } else if (command === 'open') {
                        const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                        const article = articles[parsedNumber - 1];
        
                        if (parsedNumber > articles.length) {
                            alanBtn().playText('Please try that again...');
                        } else if (article) {
                            window.open(article.url, '_blank');
                            alanBtn().playText('Opening...');
                        } else {
                            alanBtn().playText('Please try that again...');
                        }
                    }
                },
            });
        }

        requestAnimationFrame(updateScreen);
        }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="https://www.intelligentcio.com/me/wp-content/uploads/sites/12/2019/04/AI-1000-web.jpg" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
  
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/aaron-enyetu/"> Aaron Enyetu</a> -
            <a className={classes.link} href="http://www.crimsonarkstudio.com"> Crimson Ark Studio</a>
          </Typography>
          <img className={classes.image} src={logo} height="50px" alt="Aaron Enyetu logo" />
        </div>
      ) : null}
    </div>
  );
};

export default App;

