const nodemailer = require("nodemailer");
const Template = require("../models/Template");
const { OpenAI } = require("openai");

exports.sendEmails = async (req, res) => {
  try {
    const { emails, subject, body } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const email of emails) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: body,
      });
    }

    res.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error sending emails" });
  }
};

exports.createEmailTemplate = async (req, res) => {
  try {
    const { name, subject, body } = req.body;
    const existingTemplate = await Template.findOne({ name });

    if (existingTemplate) {
      return res.status(400).json({ error: "Template name must be unique" });
    }

    const template = new Template({ userId: req.user.id, name, subject, body });
    await template.save();
    res
      .status(201)
      .json({ message: "Template created successfully", template });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY,
});

exports.createEmailContentOpenAi = async (req, res) => {
  try {
    console.log("inside");

 
    const prompt = `
          Write a professional email regarding email outreach platform.
          Keep it polite, concise, and professional.
        `;

 
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 300,
    });

    const emailContent = response.choices[0].message.content;

    res.json({ email: emailContent });
  } catch (error) {
    console.error("Error generating email:", error);
    res.status(500).json({ error: "Failed to generate email" });
  }
};
