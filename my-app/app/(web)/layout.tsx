import Navbar from "@/components/ui/Navbar";

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full h-auto">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
