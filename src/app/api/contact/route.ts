import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_APIKEY!);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !phone || !message) {
      return new Response(JSON.stringify({ error: "Todos los campos son requeridos" }), { status: 400 });
    }

    const emailMessage = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contacto Derkysan.dev </title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .logo {
            max-width: 80px;
            margin-bottom: 5px;
          }
          h2 {
            color: #333;
          }
          .info {
            margin: 15px 0;
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
          .info:last-child {
            border-bottom: none;
          }
          strong {
            color: #555;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="http://blog.pemjeanluces.com/wp-content/uploads/2025/03/san-logo.png" clas="logo" alt="san" class="logo">
          <h2 style="padding-left: 10px">Nuevo Contacto</h2>
          <div class="info"><strong>Nombre:</strong> ${name}</div>
          <div class="info"><strong>Correo Electrónico:</strong> <a href="mailto:${email}">${email}</a></div>
          <div class="info"><strong>Teléfono:</strong> <a href="tel:${phone}">${phone}</a></div>
          <div class="info"><strong>Mensaje:</strong><br>${message}</div>
          <div class="footer">Este mensaje fue enviado desde el formulario de contacto en derkysan.dev.</div>
        </div>
      </body>
      </html>
    `;

    const content = {
      to: ['derkysan19@gmail.com',],
      from: 'derkysan19@gmail.com',
      subject: 'Contacto Derkysan.dev',
      text: emailMessage.replace(/<br>/g, '\r\n'),
      html: emailMessage,
    };

    // const resp = 
    await sgMail.send(content);
    // console.log('Email sent successfully:', resp);

    return new Response(JSON.stringify({ message: 'Mensaje enviado con éxito' }), { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'No se pudo enviar el mensaje' }), { status: 500 });
  }
}
