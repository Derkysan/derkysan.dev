'use client'

import React from "react";
import { useTheme } from "next-themes";

import { CustomContact, CustomCopyTextBtn, CustomGradientText, CustomLogo, CustomSplitText } from "./components";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { FiGithub } from "react-icons/fi";
import { CgDarkMode } from "react-icons/cg";
import { SiNestjs } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaAngular, FaWordpressSimple } from "react-icons/fa6";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function Page() {
  const [isContactOpen, setisContactOpen] = React.useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      return
    }
    setTheme('light');
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  

  React.useEffect(() => {
    console.log('isContactOpen:', isContactOpen)
  }, [isContactOpen]);

  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
      setIsClient(true); // Establece el estado después de que se haya renderizado en el cliente
    }, []);
  
  if (!isClient) return <div className="w-screen h-screen flex flex-1 items-center justify-center">Loading...</div>;

  return (
    <div className="w-full h-screen flex flex-col ">

      <AlertDialog open={isContactOpen} onOpenChange={setisContactOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <Button type="submit">Submit</Button> */}
                </form>
              </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="">
        <div className="container mx-auto">    
          <div className="flex items-center justify-between h-28 px-5">
            <span>
              <CustomLogo />
            </span>
            <div className="flex gap-10">
              <div className="flex items-center gap-5 text-xs tracking-widest">
                <a href="https://www.linkedin.com/in/derkysan/" target="_blank" className="cursor-pointer text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110">LinkedIn</a>
                <span>/</span>
                <a href="https://github.com/Derkysan" target="_blank"  className="cursor-pointer text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110">Github</a>
              </div>
              
              <div className="bg-dark z-10 right-5 top-5 flex gap-2">
                <button onClick={handleTheme} className={`flex items-center justify-center text-lg p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110`}>
                  <CgDarkMode />
                </button>
              </div>
            </div>
            
          </div>
        </div>
        {/* <div className="w-full h-[0.5px] border-none bg-gradient-to-r from-[#f8af00]/20 to-[#ee7d00]/40"></div> */}
      </div>      
      <div className="flex flex-grow">        
        <div className="flex flex-col container mx-auto">
          <div className="w-full flex flex-grow items-center gap-28 justify-center px-5 h-[calc(100vh-7rem)]">
            <div className="lg:w-[45%]">
              <h1 className="flex gap-2 text-3xl uppercase mb-5">
                Hola, Soy <CustomGradientText>Derky</CustomGradientText>
              </h1>
              <div className="lg:text-left text-lg font-light mb-10 leading-loose">
                <CustomSplitText text={"Soy un desarrollador Front-end con sede en Santiago de Chile, enfocado en crear soluciones digitales que mejoren la experiencia del usuario y generen valor real para los negocios. Con experiencia en el desarrollo de interfaces personalizadas, me dedico a entregar resultados efectivos que se alineen con los objetivos y necesidades de cada proyecto."} />                
              </div>

              <div className="flex flex-wrap gap-8 items-center mb-10">
                <span className={`text-sm uppercase tracking-wide`}>
                  <CustomGradientText>Tech Stack</CustomGradientText>
                </span>
                <ul className="flex gap-5 text-3xl border-l text-gray-600 xl:ps-6">
                  <li><FaHtml5 /></li>
                  <li><FaCss3Alt /></li>
                  <li><FaJs /></li>
                  <li><FaReact /></li>
                  <li><FaAngular /></li>
                  <li><FaWordpressSimple /></li>
                  <li><SiNestjs /></li>
                </ul>
              </div>
            {/* <div className="border">Contactar</div> */}
            </div>
          </div>
          {/* <div className="w-full h-[0.5px] border-none bg-gradient-to-r from-[#f8af00]/20 to-[#ee7d00]/40"></div> */}
        </div>
      </div>

      <div className="">
        <div className="container mx-auto">            
          <div className="grid grid-cols-1 xl:grid-cols-2 items-center justify-center h-80 px-5 py-5 xl:gap-10">
            <div className="text-center xl:text-end">
              <h3 className={`text-4xl font-thin uppercase`}>Tienes algún <br/>proyecto en mente, <br/><CustomGradientText>conversemos</CustomGradientText>!</h3>
            </div>
            <div className="flex justify-center xl:justify-start">
              <div className="flex items-center h-14 border border-gray-600 p-5 pr-2 rounded-full gap-1">
                <span className="dark:text-gray-400 text-lg mr-10">derkysan19@gmail.com</span>
                <CustomCopyTextBtn textToCopy="derkysan19@gmail.com" />
                <CustomContact onClick={() => setisContactOpen(true)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-gray-400 dark:border-gray-700 border-t">
          <div className="container mx-auto">   
            <div className="flex items-center justify-between h-28 px-5">
              <span className="text-xs text-gray-600 dark:text-gray-400 italic">© {new Date().getFullYear()} All rights reserved.</span>

              <div className="flex items-center gap-6 text-gray-600">
                <button className="flex items-center justify-center hover:border-2 w-8 h-8 rounded-full text-gray-500 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-all duration-300 ease-in-out transform hover:scale-125 text-sm">
                  <FaLinkedinIn />
                </button>
                <button className="flex items-center justify-center hover:border-2 w-8 h-8 rounded-full text-gray-500 hover:border-[#6e5494] hover:text-[#6e5494] transition-all duration-300 ease-in-out transform hover:scale-125 text-sm">
                  <FiGithub />
                </button>
              </div>
            </div>         
        </div>
      </div>

    </div>
  );
}
