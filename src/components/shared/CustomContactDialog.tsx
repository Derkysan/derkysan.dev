'use client'

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CustomGradientText } from "./CustomGradientText";
import { Button } from "@/components/ui/button";
import { useContact } from "@/hooks";

const formSchema = z.object({
  name: z.string().min(2, { message: "Campo requerido.",}),
  email: z.string().email({ message: "Campo requerido." }),
  phone: z.string().optional(),
  message: z.string().min(2, { message: "Campo requerido.",}),
})

interface Props {
  isContactOpen: boolean;
  setIsContactOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomContactDialog = ({
  isContactOpen,
  setIsContactOpen
}: Props) => {

  const { sendContactMutation } = useContact();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })  

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const contactData = {
      ...values,
      phone: values.phone || '',  // Si `phone` es `undefined`, lo convierte en una cadena vacía
    };

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await sendContactMutation.mutateAsync(contactData)
    setIsContactOpen(false)
    form.reset()

  }

  return (
    <AlertDialog open={isContactOpen} onOpenChange={setIsContactOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={`text-4xl font-thin uppercase`}>
          <CustomGradientText>¡Hablemos!</CustomGradientText><br/> y demos el primer paso.
          {/* Tienes algún <br/>proyecto en mente, <br/><CustomGradientText>conversemos</CustomGradientText>! */}
          </AlertDialogTitle>
          <AlertDialogDescription>Completa el formulario y conversemos.</AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Form {...form}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500">Nombre y Apellido <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa nombre y apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500">Correo electrónico <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresa correo electrónico" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500">Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresa teléfono (Opcional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500">¿Qué tienes en mente? <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mensaje..."
                        className="resize-none"
                        rows={8}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* <Button type="submit">Submit</Button> */}
          </Form>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => form.reset()}>Cancel</AlertDialogCancel>
            <Button type="submit">{sendContactMutation.isPending ? 'Enviando' : 'Enviar'}</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
