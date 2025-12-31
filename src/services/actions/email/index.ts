import nodemailer from 'nodemailer';
import { SendMessageNotificationParams, EmailResponse } from './type';

// SMTP transporter konfigürasyonu
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: "T4y9c$d83",
  },

});

// Mesaj içeriğini 250 karakterle sınırla
const truncateMessage = (content: string, maxLength: number = 250): string => {
  if (content.length <= maxLength) {
    return content;
  }
  return content.substring(0, maxLength) + '...';
};

// Almanca HTML e-posta şablonu - Dating App Teması (Pembe Tonlar)
const getEmailTemplate = (
  recipientName: string,
  senderFullName: string,
  messagePreview: string,
  dashboardUrl: string
): string => {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Nachricht</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #fce7f3 0%, #fff1f2 100%);">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px 0 20px;">
        <!-- Logo außerhalb der Tabelle -->
        <img src="https://fanly.fun/images/logo.png" alt="Fanly Logo" style="max-width: 180px; height: auto; margin-bottom: 30px; display: block;" />

        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(236, 72, 153, 0.15); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%); text-align: center; position: relative;">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px);"></div>
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: bold; position: relative; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                💌 Sie haben eine neue Nachricht
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #be185d; font-size: 18px; font-weight: 600;">
                Hallo ${recipientName},
              </p>
              <p style="margin: 0 0 25px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                Jemand Besonderes hat Ihnen geschrieben! 💕
              </p>

              <!-- Sender Info -->
              <div style="background: linear-gradient(135deg, #fce7f3 0%, #fff1f2 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #ec4899;">
                <p style="margin: 0 0 12px 0; color: #be185d; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                  Von:
                </p>
                <p style="margin: 0 0 20px 0; color: #ec4899; font-size: 18px; font-weight: 600;">
                  ${senderFullName}
                </p>

                <p style="margin: 0 0 12px 0; color: #be185d; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                  Nachrichtenvorschau:
                </p>
                <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.7; font-style: italic; padding: 15px; background-color: rgba(255, 255, 255, 0.8); border-radius: 8px;">
                  "${messagePreview}"
                </p>
              </div>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin: 35px 0;">
                <tr>
                  <td align="center">
                    <a href="https://fanly.fun/messages" style="display: inline-block; padding: 16px 45px; background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%); color: #ffffff; text-decoration: none; border-radius: 30px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3); transition: all 0.3s ease;">
                      ❤️ Nachricht anzeigen
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 35px 0 0 0; color: #9ca3af; font-size: 14px; line-height: 1.7; text-align: center;">
                Viel Spaß beim Chatten!<br>
                <span style="color: #ec4899; font-weight: 600;">Ihr Fanly-Team</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 25px 30px; background: linear-gradient(to bottom, #fce7f3, #fdf2f8); text-align: center; border-top: 1px solid rgba(236, 72, 153, 0.1);">
              <p style="margin: 0; color: #be185d; font-size: 12px; line-height: 1.6;">
                Dies ist eine automatische Benachrichtigung.<br>
                Bitte antworten Sie nicht auf diese E-Mail.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Mesaj bildirimi gönderme fonksiyonu
export const sendMessageNotification = async (
  params: SendMessageNotificationParams
): Promise<EmailResponse> => {
  try {
    const { recipientEmail, recipientName, senderFullName, messageContent, chatId } = params;
     // Mesaj içeriğini 250 karakterle sınırla
    const messagePreview = truncateMessage(messageContent, 250);

    // Dashboard URL'ini oluştur
    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/chats/${chatId}`;

    // E-posta seçeneklerini ayarla
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipientEmail,
      subject: 'Sie haben eine neue Nachricht',
      html: getEmailTemplate(recipientName, senderFullName, messagePreview, dashboardUrl),
    };

    // E-postayı gönder
    const info = await transporter.sendMail(mailOptions);


    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
    };
  }
};

// Transporter bağlantısını test etme fonksiyonu (opsiyonel)
export const verifyEmailConnection = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('SMTP sunucusu bağlantısı başarılı');
    return true;
  } catch (error) {
    console.error('SMTP sunucusu bağlantı hatası:', error);
    return false;
  }
};
