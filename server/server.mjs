import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sgMail from "@sendgrid/mail";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const app = express();
const port = Number(process.env.PORT || 8787);
const isProduction = process.env.NODE_ENV === "production";

const sendgridApiKey = process.env.SENDGRID_APIKEY;

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
} else {
  console.warn("SENDGRID_APIKEY is not defined. /api/contact will fail.");
}

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body ?? {};

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    if (!sendgridApiKey) {
      return res.status(500).json({ error: "No se pudo enviar el mensaje" });
    }

    const emailMessage = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contacto Derkysan.dev </title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px;">
          <img src="https://blog.pemjeanluces.com/wp-content/uploads/2025/03/san-logo.png" alt="san" style="max-width: 80px; margin-bottom: 5px;">
          <h2 style="padding-left: 10px; color: #333;">Nuevo Contacto</h2>
          <div style="margin: 15px 0; padding: 10px; border-bottom: 1px solid #ddd;"><strong>Nombre:</strong> ${name}</div>
          <div style="margin: 15px 0; padding: 10px; border-bottom: 1px solid #ddd;"><strong>Correo Electrónico:</strong> <a href="mailto:${email}">${email}</a></div>
          <div style="margin: 15px 0; padding: 10px; border-bottom: 1px solid #ddd;"><strong>Teléfono:</strong> <a href="tel:${phone}">${phone}</a></div>
          <div style="margin: 15px 0; padding: 10px;"><strong>Mensaje:</strong><br>${message}</div>
          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">Este mensaje fue enviado desde el formulario de contacto en derkysan.dev.</div>
        </div>
      </body>
      </html>
    `;

    const content = {
      to: ["derkysan19@gmail.com"],
      from: "derkysan19@gmail.com",
      subject: "Contacto Derkysan.dev",
      text: emailMessage.replace(/<br>/g, "\r\n"),
      html: emailMessage,
    };

    await sgMail.send(content);
    return res.status(200).json({ message: "Mensaje enviado con exito" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "No se pudo enviar el mensaje" });
  }
});

if (isProduction) {
  app.use(express.static(distDir));
  app.get("*", (_, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
