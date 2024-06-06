const express = require('express');
const translate = require('translate-google');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.post('/translate', async (req, res) => {
  const { textToTranslate, targetLanguage } = req.body;
  try {
    const translatedText = await translate(textToTranslate, { to: targetLanguage });
    res.json({ translatedText });
  } catch (error) {
    console.error('Error translating text:', error);
    res.status(500).json({ error: 'Error translating text' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
