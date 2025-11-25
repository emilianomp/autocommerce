import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Quiénes Somos
          </CardTitle>
          <CardDescription className="mx-auto mt-4 max-w-3xl text-lg !text-muted-foreground">
            En ZeusCar, nos apasiona conectar a los entusiastas de los automóviles con vehículos excepcionales. Creemos que comprar un auto debe ser una experiencia emocionante y sin complicaciones. Nuestro equipo selecciona cuidadosamente cada vehículo de nuestro inventario para garantizar la calidad, el rendimiento y el valor. Desde clásicos atemporales hasta los superdeportivos más modernos, nuestra misión es ayudarte a encontrar el auto que no solo te lleve a tu destino, sino que también te inspire en el camino.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
