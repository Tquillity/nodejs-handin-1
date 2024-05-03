import express from 'express';

const PORT = process.argv[2];

const app = express();


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));