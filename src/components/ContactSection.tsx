import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurant: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Configurare EmailJS - folosește variabilele din .env
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_taste3d';
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Template parameters pentru EmailJS
      const templateParams = {
        to_name: 'Taste3D Team',
        to_email: 'contact.taste3d@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        restaurant: formData.restaurant,
        message: formData.message,
        subject: `🍽️ Cerere Nouă de Proiect 3D de la ${formData.restaurant}`
      };

      // Trimite email prin EmailJS
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );

      console.log('Email sent successfully:', response);
      toast.success("Mesaj trimis cu succes! Vă vom contacta în 24 de ore.");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        restaurant: '',
        message: ''
      });

    } catch (error) {
      console.error('Error sending email:', error);
      
      // Fallback temporar - afișează instrucțiuni pentru configurare
      toast.error("EmailJS nu este încă configurat. Verifică README_EMAIL_SETUP.md pentru instrucțiuni.");
      
      // Pentru testare, trimite email manual
      const mailtoLink = `mailto:contact.taste3d@gmail.com?subject=${encodeURIComponent(`🍽️ Cerere Nouă de Proiect 3D de la ${formData.restaurant}`)}&body=${encodeURIComponent(
        `👤 Nume: ${formData.name}\n` +
        `📧 Email: ${formData.email}\n` +
        `📞 Telefon: ${formData.phone}\n` +
        `🏪 Restaurant: ${formData.restaurant}\n\n` +
        `📝 Detalii Proiect:\n${formData.message}\n\n` +
        `📅 Trimis la: ${new Date().toLocaleString('ro-RO')}`
      )}`;
      
      window.open(mailtoLink);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 px-4 bg-card/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Să Creăm Ceva Extraordinar
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Gata să revoluționezi prezența digitală a restaurantului tău? 
            Contactează-ne și să discutăm proiectul tău de meniu 3D.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Începe Proiectul Tău</CardTitle>
              <CardDescription>
                Spune-ne despre restaurantul tău și viziunea pentru experiența ta de meniu 3D.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Numele Tău
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ion Popescu"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Adresa de Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ion@restaurant.ro"
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Numărul de Telefon
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+40 123 456 789"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="restaurant" className="block text-sm font-medium mb-2">
                      Numele Restaurantului
                    </label>
                    <Input
                      id="restaurant"
                      name="restaurant"
                      type="text"
                      value={formData.restaurant}
                      onChange={handleInputChange}
                      placeholder="Restaurantul Tău"
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>


                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Detaliile Proiectului
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Povestește-ne despre restaurantul tău, preparatele pe care le-ai dori să le prezinți în 3D și orice cerințe specifice..."
                    rows={5}
                    required
                    className="bg-background/50"
                  />
                </div>

                <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                  {isLoading ? 'Se trimite...' : 'Trimite Mesajul'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-card border-border/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Intră în Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      📧
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">contact.taste3d@gmail.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      📱
                    </div>
                    <div>
                      <div className="font-medium">Telefon</div>
                      <div className="text-muted-foreground">+40 749 064 910</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      🌍
                    </div>
                    <div>
                      <div className="font-medium">Disponibil</div>
                      <div className="text-muted-foreground">Servicii în Toată Țara</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">De Ce Să Ne Alegi?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-sm">Expertiză în optimizarea 3D de înaltă performanță</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-sm">Experiență în industria restaurantelor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-sm">Livrare rapidă și suport continuu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-sm">ROI dovedit și angajament al clienților</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;