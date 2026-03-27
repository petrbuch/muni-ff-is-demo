# Jak začít — průvodce pro nováčky

Vítej v repozitáři ISKB12 IS demo. Tento průvodce tě provede od nulových znalostí až ke schopnosti samostatně pracovat s AI agentem na analytických dokumentech.

**Nevyžaduje žádné předchozí zkušenosti s programováním.** Pokud dokážeš napsat e-mail a otevřít prohlížeč, zvládneš i toto.

---

## Co se naučíš

Po dokončení tohoto průvodce budeš umět:

- Vysvětlit, co je repozitář, Git a Markdown — a proč je používáme místo Wordu
- Nainstalovat všechny potřebné nástroje na svém počítači (jednou, navždy)
- Naklonovat repozitář a otevřít ho v Cursoru
- Spustit session s AI agentem a správně mu předat kontext
- Navrhovat, schvalovat a iterovat změny v dokumentech
- Uložit a nahrát svoji práci přes Git

---

## Kolik času to zabere

| Fáze | Kde to najdeš | Odhadovaný čas |
|------|--------------|----------------|
| Instalace nástrojů | `02a-prerequisites-macos.md` nebo `02b-prerequisites-windows.md` | 20–40 minut (z toho většina čekání) |
| První session s agentem | `03-workflow.md` | 15–20 minut |
| Pochopení Git základů | `03-workflow.md` | 10 minut |

Prerekvizity instaluješ jen jednou. Pak je každá session otázka minut.

---

## Základní pojmy — přečti si dřív, než začneš

Tato sekce vysvětluje čtyři klíčové koncepty. Pokud ti jsou všechny jasné, přeskoč na **Struktura repozitáře** níže.

### Co je repozitář

**Repozitář** (zkráceně "repo") je složka souborů, u které si Git pamatuje každou změnu, která kdy nastala. Představ si ho jako sdílený Google Docs — ale daleko výkonnější a bez rizika, že ti kolega přepíše text, aniž by ses to dozvěděl.

Každá uložená změna (commit) je pojmenovaná, datovaná a přiřazená konkrétní osobě. Nic se nikdy nenávratně nesmaže. Vždy se dá vrátit k libovolné předchozí verzi.

### Proč Markdown místo Wordu

**Markdown** je jednoduchý textový formát — formátování zapisuješ přímo do textu:

```
# Nadpis
**tučně**, *kurzíva*, [odkaz](https://url.cz)

| Sloupec A | Sloupec B |
|-----------|-----------|
| hodnota 1 | hodnota 2 |
```

Proč ne Word? Protože `.docx` soubory jsou binární — Git nedokáže porovnávat dvě verze ani zobrazit, co přesně se změnilo. Markdown soubory jsou prostý text — Git vidí každý přidaný a odebraný řádek, a AI agent s nimi pracuje výrazně lépe.

### Co je Claude a jak funguje

**Claude** je jazykový model (LLM) vyvinutý společností Anthropic. Je to textový asistent, který dokáže číst dokumenty, navrhovat obsah, restrukturovat sekce, hledat mezery a iterovat na základě tvé zpětné vazby — pokud mu dáš správný kontext.

Dvě věci, které je potřeba pochopit hned:

> **Claude si nepamatuje minulé konverzace.** Každý nový chat začíná od absolutní nuly. Musíš mu vždy na začátku sdělit, s čím pracuje — přidat relevantní soubory jako kontext.

> **Claude není vyhledávač.** Nepřistupuje k internetu ani k externím systémům v reálném čase. Pracuje výhradně s tím, co mu předáš v chatu, a se znalostmi ze svého tréninku.

K Claudovi přistupujeme přes editor **Cursor**, který ho integruje přímo do prostředí, kde soubory editujeme.

### Git a GitHub

**Git** je nástroj pro sledování změn a spolupráci. **GitHub** je server, kde je repozitář uložen — funguje jako centrální záloha dostupná všem.

Synchronizace probíhá dvěma příkazy:

```
Tvůj počítač  ←── git pull ──  GitHub (server)
              ──── git push ──→ GitHub (server)
```

Git ovládáš výhradně ty — agent Git nikdy netouche.

---

## Struktura repozitáře

```
muni-ff-is-demo/
├── onboarding/              ← jsi tady
│   ├── 01-getting-started.md   — tento soubor
│   ├── 02a-prerequisites-macos.md
│   ├── 02b-prerequisites-windows.md
│   ├── 03-workflow.md
│   └── 04-reference.md
│
├── instructions/            — pokyny pro agenta (čte Claude)
├── templates/               — šablony analytických dokumentů
├── analyza/                 — analytické dokumenty (požadavky, user stories)
├── prototypy/               — interaktivní prototypy
├── inputs/                  — vstupní materiály (případové studie, zadání)
└── README.md                — vstupní bod pro agenta
```

Soubory, se kterými budeš přímo pracovat, jsou v `analyza/` a `prototypy/`. Ostatní složky jsou buď kontext pro agenta (`instructions/`) nebo navigace (`README.md`).

---

## Jak pokračovat

### Krok 1 — Vyber svou platformu a nainstaluj nástroje

| Platforma | Soubor |
|-----------|--------|
| **macOS** (MacBook, iMac) | [`02a-prerequisites-macos.md`](02a-prerequisites-macos.md) |
| **Windows** (PC) | [`02b-prerequisites-windows.md`](02b-prerequisites-windows.md) |

### Krok 2 — Nauč se pracovat s repozitářem a agentem

Po dokončení instalace pokračuj v [`03-workflow.md`](03-workflow.md). Tam najdeš celý postup od prvního naklonování až po ukládání práce Gitem.

### Krok 3 — Záložní materiály

Dokumentace ke všem nástrojům a řešení běžných problémů je v [`04-reference.md`](04-reference.md). Nemusíš ho číst od začátku — otevři ho, když narazíš na chybu.

---

*Otázky? Obrať se na Petra Buchbauera nebo na ostatní ze skupiny, kteří s tímto repozitářem pracují.*
