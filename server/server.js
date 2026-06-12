import express from "express";



const app = express();

const PORT = process.env.PORT || 3000; //default it 3000
app.use(express())



// API that accept the audio file and questions that I have selected from the user end side
app.use('/audio-passer', audioParsser); // Pass the Audio file to Audio Route 

app.listen(PORT, (req, res)=>{
    console.log(`Server is Running on ${PORT}`);
})