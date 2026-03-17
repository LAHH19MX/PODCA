import type { LucideIcon } from "lucide-react"

export function StatCard({ icon: Icon, label, value, sub }: { icon: LucideIcon; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-[#fff] border border-[#e8e4df] p-6 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-[#faf5e4] flex items-center justify-center rounded-[4px]">
          <Icon className="w-[18px] h-[18px] text-[#c9a227]" />
        </div>
      </div>
      <p className="text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-[#9a9a9a] mb-1">{label}</p>
      <p className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">{value}</p>
      {sub && <p className="text-[0.75rem] text-[#6b6b6b] mt-1">{sub}</p>}
    </div>
  )
}
