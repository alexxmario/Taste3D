# 📧 Configurarea EmailJS pentru Email Automat

## De ce EmailJS?

EmailJS permite trimiterea de email-uri direct din browser, fără backend server. Perfect pentru site-uri statice!

## Pașii de configurare:

### 1. Instalează dependența
```bash
npm install @emailjs/browser
```

### 2. Creează cont EmailJS

1. **Mergi pe [emailjs.com](https://www.emailjs.com)**
2. **Creează cont gratuit** (100 email-uri/lună gratis)

### 3. Configurează Gmail Service

1. **Email Services → Add New Service**
2. **Selectează Gmail**
3. **Service ID:** `service_taste3d`
4. **Conectează contul Gmail** (contact.taste3d@gmail.com)

### 4. Creează Template-ul Email

1. **Email Templates → Create New Template**
2. **Template ID:** `template_contact`
3. **To Email:** `contact.taste3d@gmail.com`
4. **Subject:** `🍽️ Cerere Nouă de Proiect 3D de la {{restaurant}}`

**Template HTML:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #2563eb;">🍽️ Cerere Nouă de Proiect Meniu 3D</h2>
  
  <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
    <h3>Informații Client:</h3>
    <p><strong>👤 Nume:</strong> {{from_name}}</p>
    <p><strong>📧 Email:</strong> {{from_email}}</p>
    <p><strong>📞 Telefon:</strong> {{phone}}</p>
    <p><strong>🏪 Restaurant:</strong> {{restaurant}}</p>
  </div>
  
  <div style="background-color: #fefefe; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
    <h3>📝 Detalii Proiect:</h3>
    <p>{{message}}</p>
  </div>
  
  <p style="text-align: center; color: #6b7280; font-size: 14px;">
    <em>Trimis de pe site-ul Meniu 3D Pro</em>
  </p>
</div>
```

### 5. Obține Public Key

1. **Account → API Keys**
2. **Copiază Public Key**

### 6. Actualizează .env

```env
VITE_EMAILJS_SERVICE_ID=service_taste3d
VITE_EMAILJS_TEMPLATE_ID=template_contact
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

### 7. Actualizează codul

În `ContactSection.tsx`, înlocuiește:
```typescript
const serviceID = 'service_taste3d';
const templateID = 'template_contact';
const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';
```

cu:
```typescript
const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

## Testare

1. **Restart development server:** `npm run dev`
2. **Completează formularul pe site**
3. **Verifică inbox-ul la contact.taste3d@gmail.com**

## Beneficii

- ✅ **Fără backend server** - funcționează direct din browser
- ✅ **100% automat** - nu se mai deschide aplicația de email
- ✅ **Template personalizabil** - email frumos formatat
- ✅ **Gratuit** - 100 email-uri/lună
- ✅ **Sigur** - credențialele rămân pe serverele EmailJS

## Depanare

Dacă nu funcționează:
- Verifică key-urile în .env
- Verifică Template ID și Service ID
- Controlează console-ul pentru erori
- Verifică quota EmailJS (100/lună gratis)