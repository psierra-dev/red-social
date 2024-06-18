import logo from  "../assets/NextGram.png"
import  Image  from "next/image"
 
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full bg-gradient-to-b from-[#000000] to-[#000722] w-full overflow-hidden bg-black text-white">
      <div className="absolute top-[2%] md:top-[5%] left-[50%] translate-x-[-50%]">
        <Image src={logo} width={200} height={100} alt="logo"/>
      </div>
      {children}
    </main>
  );
}
