import NavBar from "./components/navbar";
import NavbarPhone from "./components/navbar-phone";
import NavbarServer from "./components/navbar-server";

export default function AppLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className=" h-full grow-0 block bg-white dark:bg-black dark:text-white">
      <div className="md:min-h-full max-h-[calc(100%-78px)]  md:ml-auto md:w-[calc(100%-78px)]">
        <section className="min-h-screen flex flex-col grow">
          <main className="flex flex-col  order-4 grow">
            <div className="px-2 md:px-10 lg:mx-[100px]">
              {props.children}
              {props.modal}
            </div>
          </main>
          <NavbarServer />
        </section>
      </div>
    </div>
  );
}
