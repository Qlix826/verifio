import { toast } from 'sonner';
import { sendVerificationEmail, sendEmailToHR } from './email';
import prisma from './prisma';

type VerificationStatus = 'pending' | 'completed' | 'failed';

export async function notifyStatusChange(
  verificationId: string,
  newStatus: VerificationStatus,
  message?: string
) {
  try {
    // Récupérer les informations de la vérification
    const verification = await prisma.verification.findUnique({
      where: { id: verificationId },
      include: {
        company: {
          include: {
            users: {
              where: { role: 'ADMIN' }
            }
          }
        }
      }
    });

    if (!verification) {
      throw new Error('Vérification non trouvée');
    }

    // Message par défaut selon le statut
    const statusMessages = {
      pending: 'Votre demande est en attente de traitement',
      completed: 'Votre demande a été complétée avec succès',
      failed: 'Votre demande a été rejetée',
    };

    const statusMessage = message || statusMessages[newStatus];

    // Notifier les administrateurs de l'entreprise
    for (const admin of verification.company.users) {
      if (admin.email) {
        // Notification toast pour l'administrateur
        toast.success(`Statut de la vérification mis à jour: ${statusMessage}`, {
          description: `Vérification pour ${verification.firstName} ${verification.lastName}`,
        });

        // Envoyer un email à l'administrateur
        await sendEmailToHR(
          admin.email,
          `Mise à jour du statut de la vérification - ${verification.firstName} ${verification.lastName}`,
          `${verification.firstName} ${verification.lastName}`,
          newStatus,
          message
        );
      }
    }

    // Si la vérification est complétée, notifier le candidat
    if (newStatus === 'completed' && verification.email) {
      // Envoyer un email au candidat
      await sendVerificationEmail(
        verification.email,
        verificationId,
        `${verification.firstName} ${verification.lastName}`
      );

      toast.success('Email de confirmation envoyé au candidat', {
        description: `Un email a été envoyé à ${verification.email}`,
      });
    }

    return true;
  } catch (error) {
    console.error('Error in notifyStatusChange:', error);
    toast.error('Erreur lors de la notification', {
      description: error instanceof Error ? error.message : 'Une erreur est survenue',
    });
    return false;
  }
}

export function showNotification(
  type: 'success' | 'error' | 'info' | 'warning',
  title: string,
  description?: string
) {
  switch (type) {
    case 'success':
      toast.success(title, { description });
      break;
    case 'error':
      toast.error(title, { description });
      break;
    case 'info':
      toast.info(title, { description });
      break;
    case 'warning':
      toast.warning(title, { description });
      break;
  }
} 