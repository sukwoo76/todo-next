'use client'

interface Stats {
  total: number
  completed: number
  pending: number
}

interface TodoStatsProps {
  stats: Stats
}

export default function TodoStats({ stats }: TodoStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-sm text-gray-600">Total</div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        <div className="text-sm text-gray-600">Completed</div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
        <div className="text-sm text-gray-600">Pending</div>
      </div>
    </div>
  )
}
