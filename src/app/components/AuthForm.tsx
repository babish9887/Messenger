"use client"

import { useCallback, useEffect, useState } from "react"
import { FieldValues, Form, SubmitHandler, useForm } from "react-hook-form"
import Input from "@/app/components/inputs/Input"
type Variant= "LOGIN" | 'REGISTER'
import Button from './Button'
import AuthSocialButton from "./AuthSocialButton"
import { BsGithub, BsGoogle } from "react-icons/bs"
import axios from "axios"
import toast from "react-hot-toast"
import {  signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { set } from "lodash"
import getCurrentUser from "../actions/getCurrentUser"

function AuthForm() {

      const session=useSession();
      const router=useRouter();

      useEffect(()=>{
            if(session?.status==='authenticated'){
                  router.push('/users')
            }
      },[session?.status, router])
      const [variant, setVariant]=useState<Variant>('LOGIN')
      const [isLoading, setIsLoading]=useState(false)
      const [forgotPassword, setForgotPassword]=useState(false)
      const [resetPassword, setResetPassword]=useState(true)


      const toggleVariant = useCallback(()=>{
            if(variant==="LOGIN"){
                  setVariant("REGISTER")
            } else      
                  setVariant("LOGIN")
      },[variant])

      const {
            register, 
            handleSubmit, 
            formState:{
                  errors
            }
      }=useForm<FieldValues>({
            defaultValues:{
                  name:"",
                  email:"",
                  password:""
            }
      });

      const onSubmit:SubmitHandler<FieldValues>=async (data)=>{
            setIsLoading(true);
            if(variant==='REGISTER'){
                 await axios.post('/api/register', data)
                 .then(()=>{
                        toast.success("User created Successfully");
                        router.replace('/users')
                  })
                 .catch(()=> toast.error('Something went wrong!'))
                 .finally(()=>setIsLoading(false))
                  
                 
            } else if(variant==='LOGIN'){
                  await signIn('credentials', {...data, redirect: false})
                  .then((res)=>{
                        if(res?.error)
                              toast.error('Invalid credentials')
                        if(res?.ok && !res?.error){
                              toast.success('Logged in!')
                              router.push('/users')


                        }
                  })
                  .finally(()=>{
                        setIsLoading(false)
                  })
            }
      }

      const socialAction=async (action:string)=>{
            setIsLoading(true);

            await signIn(action, {redirect:false})
            .then((res)=>{
                  if(res?.error)
                        toast.error('Invalid credentials')
                  if(res?.ok && !res?.error){
                        toast.success('Logged in!')
                        router.replace('/users')
                  }
            })
            .finally(()=>{
                  setIsLoading(false)
            })
      }

      const handleAccountActions=async ()=>{
            setIsLoading(true)
            try{
            if(forgotPassword && !resetPassword){
                  // @ts-ignore
                  const email:HTMLElement=document.getElementById('email').value
                        // await axios.post('http://localhost:3000/api/forgotpassword',{email})
                        // .then((res)=>{
                        //       if(res.data.success)
                        //             toast.success("Check Your Email")
                        // })

                        const res= await fetch('http://localhost:3000/api/forgotpassword',{
                              method:"POST",
                             headers:{
                              "Content-Type":"application/json"
                             },
                             body: JSON.stringify({email})
                        })
                        if(res.ok){
                              toast.success("Check Your Email")
                        } else{
                              toast.error("Something went wrong!")
                        }
            } else if(forgotPassword && resetPassword){
                  const urlToken = window.location.search.split("%3D")[1];
                  const token = urlToken.replace(/%2524/g, '$')
                  if(!urlToken){
                        setForgotPassword(false)
                        setResetPassword(false)
                        }
                        // @ts-ignore
                  const password=document.getElementById('password')?.value
                  // @ts-ignore
                  const confirmPassword=document.getElementById('email')?.value
                  if(password!==confirmPassword)
                        return toast.error("Password did't match")
                        const res= await fetch('http://localhost:3000/api/resetpassword',{
                              method:"POST",
                             headers:{
                              "Content-Type":"application/json"
                             },
                             body: JSON.stringify({token, password})
                        })
                        if(res.ok){
                              toast.success("Password reset Successfull")
                        } else{
                              toast.error("Something went wrong!")
                        }
            }
      }catch(e:any){
            toast.error(e.message)
      } finally{
            // @ts-ignore
            document.getElementById('password').value=""
            // @ts-ignore
            document.getElementById('email').value=""
            setIsLoading(false)
      }
      }


      useEffect(()=>{
            const urlToken = window.location.search.split("=")[1];
            if(urlToken?.length>60){
                  setForgotPassword(true)
                  setResetPassword(true)
            }
            if(!forgotPassword){
                  // @ts-ignore
                  document.getElementById('password').value=""
                  // @ts-ignore
                  document.getElementById('email').value=""
            }
      },[forgotPassword])
    
  return (
      <>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
      {!forgotPassword ?( 
            <>
                  <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        {variant==="REGISTER" && (
                              <Input id='name' label="name" type="text" register={register} errors={errors} disabled={isLoading}/>
                              )}
                        <Input id='email' label="Email" type="email" register={register} errors={errors} disabled={isLoading}/>

                        <Input id='password' label="Password" type="password" register={register} errors={errors} disabled={isLoading}/>
                        
                        <p className={clsx('text-end underline hover:cursor-pointer',variant ==='LOGIN' ? "block":'hidden')} onClick={()=>{setForgotPassword(true); setResetPassword(false)}}>forgot password?</p>

                        <Button disabled={isLoading} fullWidth type="submit" danger={false}>{variant ==='LOGIN' ? "Sign In":'Register'} </Button>
                  </form>

                  <div className="mt-6">
                        <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                              </div>
                              <div className="relative flex justify-center text-sm ">
                                    <span className="bg-white px-2 text-gray-500">
                                          Or Continue with
                                    </span>
                              </div>
                        </div>
                        
                        <div className="mt-6 flex gap-2">
                              <AuthSocialButton icon={BsGithub} onClick={()=>socialAction('github')}/>
                              <AuthSocialButton icon={BsGoogle} onClick={()=>socialAction('google')}/>
                        </div>

                        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                              <div>{variant ==='LOGIN'? "New to Messenger?":"Already have an account?"}</div>
                              <div onClick={toggleVariant} className="underline cursor-pointer">
                              {variant==='LOGIN'?'Create an account':'Login'}
                              </div>
                        </div>
                  </div>
            </>
            ):(
                  <div className="space-y-6">
                  {resetPassword && (
                        <Input id='password' label="New Password" type="password" register={register} errors={errors} disabled={isLoading}/>
                        )}
                  <Input id='email' label={resetPassword?"Confirm Password":"Email"} type={resetPassword?"password":"email"} register={register} errors={errors} disabled={isLoading}/>

                  
                  <Button disabled={isLoading} fullWidth onCIick={handleAccountActions} danger={false}>{resetPassword?"Reset Password":"Submit"}</Button>

                  <div className="flex gap-2  justify-center text-sm mt-6 px-2 text-gray-500">
                              {/* <div>{variant ==='LOGIN'? "New to Messenger?":"Already have an account?"}</div> */}
                              <div onClick={() => { 
                              setForgotPassword(false); 
                              setResetPassword(false); 
                              router.push('/'); // Redirect to the login page
                              }} className="underline cursor-pointer">
                              Go to Login Page
                              </div>
                  </div>
            </div>
            )}
            </div>
    </div>
    </>

  )
}

export default AuthForm