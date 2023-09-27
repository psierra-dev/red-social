import NavBar from "./components/navbar";
import NavbarPhone from "./components/navbar-phone";
import NavbarServer from "./components/navbar-server";

export default function AppLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className=" h-screen bg-white">
      <NavbarServer />
      <div className="md:min-h-full h-[calc(100%-78px)] mb-auto mt-[52px] md:mt-0  md:ml-auto md:w-[calc(100%-78px)]">
        <section className="min-h-screen">
          <main className="flex flex-col min-h-full ">
            <div className="px-2 md:px-10 lg:mx-[100px]">
              {props.children}
              {props.modal}
            </div>
          </main>
        </section>
      </div>
    </div>
  );
}
