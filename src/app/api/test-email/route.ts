import { NextResponse } from 'next/server';
import { verifyEmailConnection, sendMessageNotification } from '@/services/actions/email';

export async function GET() {
  try {
    // SMTP bağlantısını test et
    const isConnected = await verifyEmailConnection();

    if (!isConnected) {
      return NextResponse.json(
        {
          success: false,
          message: 'SMTP sunucusuna bağlanılamadı. Lütfen SMTP ayarlarınızı kontrol edin.',
          details: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            user: process.env.SMTP_USER,
            secure: process.env.SMTP_PORT === '465' ? 'SSL/TLS' : 'STARTTLS'
          }
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'SMTP sunucusu bağlantısı başarılı!',
      details: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        secure: process.env.SMTP_PORT === '465' ? 'SSL/TLS' : 'STARTTLS'
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'SMTP test başarısız',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { testEmail } = body;

    if (!testEmail) {
      return NextResponse.json(
        { success: false, message: 'Test e-posta adresi gerekli' },
        { status: 400 }
      );
    }

    // Test e-postası gönder
    const result = await sendMessageNotification({
      recipientEmail: testEmail,
      recipientName: 'Test User',
      senderFullName: 'System Test',
      messageContent: 'Dies ist eine Test-Nachricht, um die E-Mail-Konfiguration zu überprüfen. Wenn Sie diese Nachricht erhalten, funktioniert das System korrekt.',
      chatId: 1,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Test e-postası gönderilemedi',
          error: result.error
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Test e-postası başarıyla gönderildi: ${testEmail}`,
      messageId: result.messageId
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Test e-postası gönderimi başarısız',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}
