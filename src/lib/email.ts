import { Resend } from 'resend';
import { generateVerificationCode } from '@/lib/utils';
import prisma from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  to: string,
  requestId: string,
  candidateName: string
) {
  try {
    // Générer un code de vérification unique
    const emailVerificationCode = generateVerificationCode();
    
    // Sauvegarder le code dans la base de données
    await prisma.verification.update({
      where: { id: requestId },
      data: {
        emailVerificationCode,
      },
    });

    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verification/email/${requestId}`;

    const { data, error } = await resend.emails.send({
      from: 'verifio <onboarding@resend.dev>',
      to: [to],
      subject: 'Vérification de votre demande - Code de sécurité',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Code de vérification pour votre demande</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h1 style="color: #1f2937; margin-bottom: 20px;">Bonjour ${candidateName},</h1>
              <p>Une demande de vérification d'antécédents a été initiée pour vous.</p>
              <p>Voici votre code de vérification :</p>
              <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #e5e7eb; padding: 15px; border-radius: 4px; font-size: 24px; letter-spacing: 3px; font-family: monospace;">
                  ${emailVerificationCode}
                </div>
              </div>
              <p>Pour finaliser votre demande, veuillez cliquer sur le lien ci-dessous et entrer ce code :</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationLink}" 
                   style="display: inline-block; 
                          background-color: #4F46E5; 
                          color: white; 
                          padding: 12px 24px; 
                          text-decoration: none; 
                          border-radius: 4px;
                          font-weight: bold;">
                  Vérifier mon email
                </a>
              </div>
              <p style="color: #6b7280; font-size: 14px;">Ce code expire dans 24 heures.</p>
              <p style="color: #6b7280; font-size: 14px;">Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet email.</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="color: #6b7280; font-size: 12px;">Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in sendVerificationEmail:', error);
    throw error;
  }
}

export async function sendSmsVerificationCode(
  phone: string,
  requestId: string
) {
  try {
    // Générer un code de vérification unique pour SMS
    const smsVerificationCode = generateVerificationCode();
    
    // Sauvegarder le code dans la base de données
    await prisma.verification.update({
      where: { id: requestId },
      data: {
        smsVerificationCode,
      },
    });

    // TODO: Intégrer un service SMS (Twilio, Vonage, etc.)
    console.log(`SMS code for ${phone}: ${smsVerificationCode}`);
    
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}

export async function sendEmailToHR(
  to: string,
  subject: string,
  candidateName: string,
  status: string,
  message?: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'verifio <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${subject}</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h1 style="color: #1f2937; margin-bottom: 20px;">Mise à jour de statut</h1>
              <p>Le statut de la demande pour <strong>${candidateName}</strong> a été mis à jour.</p>
              
              <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Nouveau statut :</strong> ${status}</p>
                ${message ? `<p style="margin: 10px 0 0 0;"><strong>Message :</strong> ${message}</p>` : ''}
              </div>
              
              <p>Vous pouvez suivre l'évolution de la demande sur votre tableau de bord.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                   style="display: inline-block; 
                          background-color: #4F46E5; 
                          color: white; 
                          padding: 12px 24px; 
                          text-decoration: none; 
                          border-radius: 4px;
                          font-weight: bold;">
                  Accéder au tableau de bord
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="color: #6b7280; font-size: 12px;">Cet email a été envoyé automatiquement par verifio.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending email to HR:', error);
      throw error;
    }

    console.log('Email sent successfully to HR:', data);
    return data;
  } catch (error) {
    console.error('Error in sendEmailToHR:', error);
    throw error;
  }
} 