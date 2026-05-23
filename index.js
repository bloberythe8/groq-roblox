const express = require('express');
const app = express();
app.use(express.json());

const GROQ_API_KEY = 'your_groq_key_here'; // paste your key

app.post('/ask', async (req, res) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: req.body.message }],
        max_tokens: 200
      })
    });
    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ reply: 'Error!' });
  }
});

app.listen(3000);
