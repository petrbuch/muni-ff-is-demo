# Rezervační systém — Knihovna Budoucnost

Interaktivní prototyp rezervačního systému pro technologické laboratoře komunitní knihovny.  
Vytvořen jako výstup analýzy požadavků v rámci kurzu ISKB12 na FF MUNI.

## Co prototyp ukazuje

| Strana | Popis |
|--------|-------|
| `/` | Přehled tří laboratoří s kartami, kapacitami a expertem |
| `/rezervace` | Výběr laboratoře → mřížka volných/obsazených termínů → formulář → potvrzení |
| `/expert` | Pohled expertky (Lucie Vrbová) — přijaté a čekající rezervace, dostupnost |
| `/admin` | Pohled zaměstnance — statistiky, filtr podle lab/stavu, tabulka všech rezervací |

### Demo přepínač rolí

V pravém horním rohu je přepínač **Demo: Uživatel / Expert / Zaměstnanec**. Mění zobrazený pohled — simuluje přihlášeného uživatele bez nutnosti skutečné autentizace.

### Implementované požadavky

- **FR-01** Kalendářní mřížka s barevnými stavy (volný / obsazeno)
- **FR-02** Formulář rezervace s výběrem typ uživatele (jednotlivec / skupina)
- **FR-03** Potvrzovací obrazovka s přiřazeným expertem
- **FR-06** Pohled experta — přijmout / odmítnout rezervaci
- **FR-07** Správa dostupnosti experta (tab „Moje dostupnost")
- **FR-09** Admin přehled s filtry a statistikami
- **NFR-03** Přístupný popis aktivity pro experta (vidí při potvrzení)
- **Ambiguita #2** Individuální uživatelé mají omezený horizont (7 dní) s informační hláškou

## Lokální spuštění

```bash
# Z kořene repozitáře
cd prototypy/rezervacni-system

npm install
npm run dev
```

Otevřete http://localhost:3000.

## Nasazení na Vercel

Doporučujeme **Vercel** — nativní podpora Next.js, zero-config deploy.

### Kroky

1. Ujistěte se, že je repozitář nahraný na GitHubu.
2. Přihlaste se na [vercel.com](https://vercel.com) (lze přes GitHub účet).
3. Klikněte **Add New → Project** a vyberte tento repozitář.
4. Nastavte **Root Directory** na `prototypy/rezervacni-system`.
5. Klikněte **Deploy** — Vercel vše ostatní zjistí automaticky.

Po deployi dostanete veřejnou URL ve tvaru `https://nazev-projektu.vercel.app`.  
Každý push na `main` branch automaticky spustí nový deploy.

## Struktura projektu

```
rezervacni-system/
├── app/
│   ├── layout.tsx          # Root layout — AppProvider + navigace
│   ├── Nav.tsx             # Navigace s přepínačem rolí
│   ├── page.tsx            # Domovská stránka (3 lab karty)
│   ├── rezervace/
│   │   └── page.tsx        # Booking flow (výběr → formulář → potvrzení)
│   ├── expert/
│   │   └── page.tsx        # Expert dashboard
│   └── admin/
│       └── page.tsx        # Zaměstnanecký přehled
├── lib/
│   ├── types.ts            # TypeScript typy
│   ├── mockData.ts         # Mock data + helper funkce pro data
│   └── context.tsx         # React context — sdílený stav (role, rezervace, sloty)
├── next.config.mjs         # Next.js konfigurace
└── README.md
```

## Technologie

- [Next.js 14](https://nextjs.org/) — App Router, React 18
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styly
- [Lucide React](https://lucide.dev/) — ikony
- Žádný backend — veškerá data jsou mock, stav žije v React context
