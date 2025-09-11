# 📸 Portfolio Photos

Acest folder conține toate fotografiile culinare profesionale pentru pagina de portofoliu.

## Structura Folder-ului:

```
src/assets/portfolio/
├── README.md           # Acest fișier
├── story-14.jpg        # Fotografie culinară 1
├── story-25.jpg        # Fotografie culinară 2  
├── story-3.jpg         # Fotografie culinară 3
└── story-6.jpg         # Fotografie culinară 4
```

## Cum să Adaugi Noi Poze:

1. **Copiază pozele noi** în acest folder
2. **Redenumește-le** cu nume descriptive (ex: `burger-premium.jpg`)
3. **Actualizează** `src/pages/Portfolio.tsx` pentru a importa noile poze:
   ```typescript
   import newPhoto from '../assets/portfolio/burger-premium.jpg';
   ```
4. **Adaugă-le** în array-ul `portfolioImages` cu detalii:
   ```typescript
   {
     id: 5,
     src: newPhoto,
     title: "Burger Premium",
     category: "Gourmet Burgers"
   }
   ```

## Format Recomandat:
- **Format:** JPG sau PNG
- **Rezoluție:** Minim 1920x1080px pentru calitate optimă
- **Aspect ratio:** 4:3 sau 16:9 pentru grid consistent
- **Dimensiune:** Sub 2MB per imagine pentru performanță

## Note:
- Pozele sunt folosite și în componenta `Performance3DShowcase.tsx`
- Orice modificare în acest folder va afecta ambele pagini
- Pentru cele mai bune rezultate, folosește imagini de înaltă calitate