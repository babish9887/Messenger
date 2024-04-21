import AuthForm from "@/app/components/AuthForm";
import Image from "next/image";
import Link from "next/link";
import MessengerLogo from '../../public/images/messengelogo.png'
import loginpage from '../../public/images/loginpage.png'
import FromMeta from '../../public/images/frommeta.png'


import { HiBars3 } from "react-icons/hi2";

const links:string[]= [
      "https://www.messenger.com/features",
      "https://www.messenger.com/features",
      "https://www.messenger.com/features",
      "https://developers.facebook.com/products/messenger/"
]

const li= "border-b-4 border-transparent hover:border-b-4 hover:border-blue-500 "

export default function Home(){
      return (
        <div className="w-full  flex flex-col min-h-[100%] h-auto bg-gray-100" >
            <header className="w-full flex justify-between  md:justify-center items-center ">
                  <div className="w-auto p-5 sm:m-auto">
                       <Image src={MessengerLogo} alt='logo' height={32} width={32} className=" hover:cursor-pointer "/>
                  </div>
                  <nav className="sm:m-auto">
                  <ul className="hidden sm:flex gap-2 md:gap-4 lg:gap-8 text-md font-semibold mr-10">
                        <li className={li}><Link href={links[0]}>Features</Link></li>
                        <li className={li}><Link href={links[1]}>Desktop App</Link></li>
                        <li  className={li}><Link href={links[2]}>Privacy & Safety</Link></li>
                        <li  className={li}><Link href={links[3]}>For Developers</Link></li>
                        </ul>

                        <HiBars3 className="sm:hidden text-3xl mr-5 hover:cursor-pointer" />
                  </nav>
            </header>
            <main className=" bg-gray-200 flex-1 flex flex-col md:flex-row p-5 justify-center md:h-screen items-center h-auto  gap-12 min-h-[786px]">
                  <div className="h-full max-w-[500px] flex flex-col">
                        <div >
                              <div className="inline-block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-400 text-transparent bg-clip-text font-bold lg:font-bold  text-4xl lg:text-5xl text-center md:text-start w-full mb-4" >
                              Hang out <br/> anytime, <br/> anywhere
                              </div>

                              <h2 className="text-center md:text-start text-2xl  tracking-tight text-gray-900 hidden md:block">
                              Messenger makes it easy and fun to stay close to your favorite people.
                              </h2>
                        </div>
                        <div className="max-w-[400px] h-auto">
                              <AuthForm />
                        </div>
                  </div>
                  <div className="max-w-[500px] h-full flex justify-center items-center">
                        <Image src={loginpage} alt="homepage" height={700} width={700}/>
                  </div>
            </main>
            <footer className="relative w-full bg-white h-20 min-h-12 justify-center items-center gap-5 hidden md:flex text-sm z-50">
                  <div className="w-auto font-bold">
                  © Meta 2024.
                  </div>
                  <div>
                  The Apple and Google Play logos are trademarks of their respective owners.
                  </div>
                  <ul className="flex justify-between items-center gap-4">
                        <li><Link href=''>Privacy Policy</Link></li>
                        <li><Link href=''>Cookie Policy</Link></li>
                        <li><Link href=''>Cookie Settings</Link></li>
                        <li><Link href=''>Terms</Link></li>
                        <Image src={FromMeta} alt='logo' height={100} width={100}/>
                  </ul>

            </footer>
        </div>
      )
}