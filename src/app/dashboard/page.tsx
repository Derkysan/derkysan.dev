
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Briefcase, Mail, Code, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Proyectos',
      value: '12',
      icon: <Briefcase className="h-8 w-8" />,
      trend: '+2 este mes',
      color: 'text-blue-500',
    },
    {
      title: 'Mensajes',
      value: '48',
      icon: <Mail className="h-8 w-8" />,
      trend: '+12 nuevos',
      color: 'text-green-500',
    },
    {
      title: 'Tecnologías',
      value: '24',
      icon: <Code className="h-8 w-8" />,
      trend: '+3 este año',
      color: 'text-purple-500',
    },
    {
      title: 'Visitas',
      value: '1.2k',
      icon: <TrendingUp className="h-8 w-8" />,
      trend: '+18% este mes',
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido de nuevo, aquí está tu resumen
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </div>
              <div className={stat.color}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Actividad Reciente</h2>
        <div className="space-y-4">
          {[
            {
              action: 'Nuevo proyecto creado',
              time: 'Hace 2 horas',
              description: 'Portfolio Website v2',
            },
            {
              action: 'Mensaje recibido',
              time: 'Hace 5 horas',
              description: 'Consulta sobre proyecto React',
            },
            {
              action: 'Actualización de perfil',
              time: 'Hace 1 día',
              description: 'Nuevas habilidades agregadas',
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start justify-between border-b last:border-0 pb-4 last:pb-0"
            >
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Acciones Rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Nuevo Proyecto</Button>
          <Button variant="outline">Ver Mensajes</Button>
          <Button variant="outline">Editar Perfil</Button>
          <Button variant="outline">Configuración</Button>
        </div>
      </Card>
    </div>
  )
}
