export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <main className="">{children}</main>
    </div>
  );
}
