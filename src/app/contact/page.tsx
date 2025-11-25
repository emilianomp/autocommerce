import ContactForm from '@/components/ContactForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
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
  );
}
