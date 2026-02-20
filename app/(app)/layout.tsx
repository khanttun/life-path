import { Navbar } from "@/components/navbar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mesh-bg min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-6 py-8">{children}</main>
    </div>
  )
}
