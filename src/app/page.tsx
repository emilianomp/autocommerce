import { getProducts } from '@/lib/api';
import ProductGrid from '@/components/ProductGrid';
import ContactForm from '@/components/ContactForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default async function Home() {
  const initialProducts = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 border-none bg-transparent shadow-none">
        <CardHeader className="p-0">
          <CardTitle className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Encuentra Tu Próximo Viaje
          </CardTitle>
          <CardDescription className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Explora nuestra colección curada de automóviles premium. El viaje hacia el auto de tus sueños comienza aquí.
          </CardDescription>
        </CardHeader>
      </Card>
      <ProductGrid initialProducts={initialProducts} />

      <Separator className="my-12" />

      <div id="about-us" className="space-y-12">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Quiénes Somos
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            En AutoCommerce, nos apasiona conectar a los entusiastas de los automóviles con vehículos excepcionales. Creemos que comprar un auto debe ser una experiencia emocionante y sin complicaciones. Nuestro equipo selecciona cuidadosamente cada vehículo de nuestro inventario para garantizar la calidad, el rendimiento y el valor. Desde clásicos atemporales hasta los superdeportivos más modernos, nuestra misión es ayudarte a encontrar el auto que no solo te lleve a tu destino, sino que también te inspire en el camino.
          </p>
        </div>

        <Separator className="my-12" />

        <div id="contact" className="mx-auto max-w-3xl">
          <div className="text-center mb-8">
             <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Contáctanos
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              ¿Tienes alguna pregunta? Completa el formulario a continuación y nos pondremos en contacto contigo.
            </p>
          </div>
          <Card>
            <CardContent className="p-6">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
