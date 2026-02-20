import { Navbar } from "@/components/navbar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-6 py-8">{children}</main>
    </div>
  )
}
