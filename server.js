import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import 'dotenv/config';
import process from 'node:process';


const app = express();
app.use(cors());
app.use(express.json({limit: '10mb'})); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/report-issue', async (req, res) => {
  const { name, email, category, description, image } = req.body;

  if (!name || !email || !category || !description) {
    return res.status(400).json({ success: false, error: 'Missing reporting fields.' });
  }

  const msg = {
    to: process.env.FROM_EMAIL,      
    from: process.env.FROM_EMAIL,    
    replyTo: email,                  
    subject: `🚨 [Cyclic Crafting Bug] ${category} from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #333; padding: 20px;">
        <h2 style="color: #384232; border-bottom: 2px solid #e2ead0; padding-bottom: 10px;">
          New Issue Filed
        </h2>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Reported By:</strong> ${name} (${email})</p>
        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #384232; margin-top: 15px;">
          <p style="white-space: pre-wrap; margin: 0;">${description}</p>
        </div>
      </div>
    `,
  };

  if (image && image.base64Data) {
    msg.attachments = [
      {
        content: image.base64Data, // Raw base64 string from the frontend
        filename: image.filename,  // Original filename (e.g., 'screenshot.png')
        type: image.type,          // File mime type (e.g., 'image/png')
        disposition: 'attachment'
      }
    ];
  }

  try {
    await sgMail.send(msg);

    console.log(`\x1b[32m%s\x1b[0m`, `📬 [SendGrid Success] Issue report from ${name} sent to ${process.env.FROM_EMAIL} successfully!`);

    res.status(200).json({ success: true, message: 'Issue sent via SendGrid!' });
  } catch (error) {
    console.error('SendGrid Error:', error.response?.body || error);
    res.status(500).json({ success: false, error: 'SendGrid failed to deliver the message.' });
  }
});


app.listen(3000, () => console.log('SendGrid server active on port 3000'));
