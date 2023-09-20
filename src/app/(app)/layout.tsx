import NavBar from "./components/navbar";

export default function AppLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className=" h-screen bg-white">
      <NavBar />
      <div className="md:min-h-full h-[calc(100%-78px)] mb-auto  md:ml-auto md:w-[calc(100%-78px)]">
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
