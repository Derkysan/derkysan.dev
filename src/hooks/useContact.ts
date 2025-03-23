import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export const useContact = () => {

  const sendContactMutation = useMutation({
    mutationFn: async (values: { name: string; email: string; phone: string; message: string }) => {
      const response = await fetch(`/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "No se pudo enviar el mensaje.");
      }
      return data;
    },
    onSuccess() {
      // console.log('CORREO ENVIADO');
      toast({
        variant: 'primary',
        title: "Mensaje recibido",
        description: "Gracias por contactarnos. Revisaremos su mensaje y le responderemos lo antes posible.",
        duration: 3500
      });
    },
    onError() {
      // console.log('CORREO NO ENVIADO');
      toast({
        variant: "destructive",
        title: "Error al enviar el mensaje",
        description: "No se pudo procesar su solicitud en este momento. Por favor, inténtelo nuevamente más tarde.",
        duration: 3000
      });
      
    },

  });

  return {
    // sendEmail
    sendContactMutation
  }
};
