import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 items-center justify-center min-h-screen p-5 m-5">
      
      <div className="flex flex-col text-justify items-center justify-center gap-10">
      <h1 className="text-4xl font-bold font-sans text-red-700">Notes Taker</h1>
      <p className="text-md text-blue-700 lg:px-20">Capture your thoughts, organize your ideas, and keep all your important notes in one place. Create, edit, and manage your notes effortlessly anytime, anywhere.</p>
      <Link href={'/login'} className="bg-linear-to-r from-blue-500 to-red-300 rounded-2xl p-3 font-black font-sans hover:transition-transform duration-200 hover:scale-105">Start Taking Notes</Link>
      </div>
      <div className="flex items-center justify-center">
        <Image height={300} width={300} alt="" src={'https://cdn-icons-gif.flaticon.com/17518/17518063.gif'}/>
      </div>
    </div>
   
  );
}
