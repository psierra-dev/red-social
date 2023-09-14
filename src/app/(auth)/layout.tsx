export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2>Layout auth</h2>
      <main className="h-full">{children}</main>
    </div>
  );
}
