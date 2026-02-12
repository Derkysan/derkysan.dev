import sgMail from "@sendgrid/mail";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

type VercelRequest = {
  method?: string;
  body?: ContactPayload | string;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

const sendgridApiKey = process.env.SENDGRID_APIKEY;

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

const parseBody = (body: VercelRequest["body"]): ContactPayload => {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body) as ContactPayload;
    } catch {
      return {};
    }
  }
  return body;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metodo no permitido" });
  }

  const { name, email, phone, message } = parseBody(req.body);

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  if (!sendgridApiKey) {
    return res.status(500).json({ error: "No se pudo enviar el mensaje" });
  }

  try {
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

    await sgMail.send({
      to: ["derkysan19@gmail.com"],
      from: "derkysan19@gmail.com",
      subject: "Contacto Derkysan.dev",
      text: emailMessage.replace(/<br>/g, "\r\n"),
      html: emailMessage,
    });

    return res.status(200).json({ message: "Mensaje enviado con exito" });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return res.status(500).json({ error: "No se pudo enviar el mensaje" });
  }
}
