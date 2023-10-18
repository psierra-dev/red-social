export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full w-full overflow-hidden bg-black text-white">
      {children}
    </main>
  );
}
