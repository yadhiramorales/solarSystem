import express from 'express';
import fetch from 'node-fetch';
const solarSystem = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//root route
app.get('/', async (req, res) => {
    let response = await fetch("https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar system");
    let data = await response.json();
    let randomImgUrl = data.hits[0].largeImageURL;
    console.log(data);
    res.render('home.ejs', {randomImgUrl})
});


app.get('/planet', (req, res) => {
   let planet_name = req.query.planetName;
   let planetInfo = solarSystem[`get${planet_name}`]();
//    console.log(planetInfo);
   res.render('planetInfo.ejs', {planetInfo, planet_name});
});

app.get('/nasaPod', (req, res) => {
//    console.log(planetInfo);
   res.render('nasaPod.ejs');
});


// //mercury route
// app.get('/mercury', (req, res) => {
//    let planetInfo = solarSystem.getMercury();
//    console.log(planetInfo);
//    res.render('mercury.ejs', {planetInfo});
// });

// app.get('/venus', (req, res) => {
//    let planetInfo = solarSystem.getVenus();
//    console.log(planetInfo);
//    res.render('venus.ejs', {planetInfo});
// });


app.listen(3000, () => {
   console.log('server started');
});