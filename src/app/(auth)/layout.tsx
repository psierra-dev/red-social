export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-full w-full overflow-hidden">{children}</main>;
}
