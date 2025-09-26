export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <main className="w-full flex items-center justify-center">
                {children}
            </main>
        </div>
    );
}