const express = require('express');
const path = require('path');


const app = express();

//Logic for server routes goes above the webpack configuration below logic

if (process.env.NODE_ENV !== 'production') {
    console.log('Development');
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    app.use(webpackMiddleware(webpack(webpackConfig)));
    //this middleware is used for the development environment, webpack takes the config file on how to configure the webpack process
    //webpackMiddelware takes webpack whenever a request is made
    //Dont need to manually keep running npm run build anymore since its running on the node express server
}else {
    console.log('Production');
    app.use(express.static('dist')); //everything in dist directory is freely available to the user, its static files
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
    //Any get request to any route on server, send them the index.html file used for react router
    //In production, our application is being served solely through static assets that we specified above
}
app.listen(process.env.PORT || 3050, () => {
    console.log(`Server on PORT ${process.env.PORT || 3050}`);
});