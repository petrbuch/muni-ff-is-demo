# ISKB12 — Analýza požadavků a návrh IS

> **PRO AGENTA — PŘEČTI JAKO PRVNÍ.**
>
> Tento README je primární kontextový dokument repozitáře. Importuj ho na začátku každé session před jakýmkoli jiným souborem. Říká ti, co je tento repozitář, co v něm je, jaká jsou pravidla a kde co najdeš.
>
> Před čímkoli jiným:
> 1. Přečti `instructions/agent.md` — účel repozitáře, pravidla, typy dokumentů a pracovní postup
> 2. Přečti `instructions/analyza.md` — jak pracovat na analýzách, požadavcích a user stories
> 3. Přečti relevantní soubor z `analyza/`, pokud uživatel chce pracovat na konkrétním dokumentu
>
> **Nikdy necommituješ, nestaguješ, nevytváříš větve ani nepushuješ. Nikdy nevytváříš nový dokument bez výslovného pokynu uživatele.**

---

Demo repozitář pro předmět ISKB12 na Katedře informačních studií a knihovnictví (FF MU). Slouží k výuce analýzy požadavků, tvorby user stories a návrhu informačních systémů s využitím AI asistenta (Claude v Cursoru) a Gitu.

---

## Jak to funguje

Repozitář je **human + LLM + git** workflow. Žádná automatizace, žádné CI, žádné pipeline. Analýzy a dokumenty píšeš a iteruješ v Markdownu, sledované v Gitu. AI agent (Claude v Cursoru) pomáhá se strukturováním, formulací a identifikací mezer — ale člověk vždy vede a kontroluje všechny git operace.

---

## Typy dokumentů

Repozitář podporuje tři typy analytických výstupů, každý má svůj podadresář:

| Typ | Adresář | Co to je |
|-----|---------|----------|
| Analýza požadavků | `analyza/` | Stakeholdeři, funkční a nefunkční požadavky, MoSCoW prioritizace, nejasnosti |
| User stories | `analyza/` | Požadavky převedené do formátu připraveného pro vývojový tým |
| Návrh řešení / prototyp | `prototypy/` | Hrubé návrhy řešení, wireframy nebo interaktivní prototypy (Next.js) |

---

## Struktura repozitáře

```
muni-ff-is-demo/
├── onboarding/                          # Začni tady, pokud jsi nový — soubory čti v pořadí
│   ├── 01-getting-started.md            # Vstupní bod: koncepty, přehled repozitáře, kam dál
│   ├── 02a-prerequisites-macos.md       # macOS: Terminal, Homebrew, Git, SSH, Cursor
│   ├── 02b-prerequisites-windows.md     # Windows: Windows Terminal, winget, Git Bash, SSH, Cursor
│   ├── 03-workflow.md                   # Průběh session: klonování, kontext agenta, git, tipy
│   └── 04-reference.md                 # Dokumentace, tutoriály, řešení problémů
├── instructions/                        # Instrukce pro agenta (čte Claude automaticky)
│   ├── agent.md                         # Primární vstupní bod: účel, pravidla, pracovní postup
│   ├── analyza.md                       # Jak psát analytické dokumenty a user stories
│   └── prototyping.md                  # Pravidla pro práci s kódem a prototypy
├── templates/                           # Šablony dokumentů
│   └── analyza-template.md             # Šablona pro analýzu požadavků
├── analyza/                            # Analytické dokumenty (obsah v češtině)
│   ├── iskb12-knihovna-budoucnost.md   # Ukázková analýza (případové studie knihovny)
│   └── features/                       # Gherkin / Cucumber specifikace
├── prototypy/
│   └── rezervacni-system/              # Next.js prototyp rezervačního systému (viz `README.md` uvnitř)
├── inputs/                             # Vstupní materiály (případové studie, zadání)
│   ├── iskb12-case-study.md            # Text případové studie (PDF lze převést přes `pdftotext`)
│   └── Iskb12 Case Study požadavky.pdf
├── .gitignore
└── README.md                           # Tento soubor
```

Interaktivní prototyp se spouští z `prototypy/rezervacni-system/` (`npm install` + `npm run dev`). Nasazení na Vercel: nastav **Root Directory** na `prototypy/rezervacni-system`.

---

## Vytvoření nového analytického dokumentu

1. **Zkopíruj šablonu** z `templates/analyza-template.md` do `analyza/<nazev-systemu>.md`.
2. **Vyplň, co víš** — i částečný obsah je dobrý. Použij `*(TBD)*` pro prázdné sekce.
3. **Pracuj s agentem** v Cursoru na doplnění a iteraci. Agent se zeptá na kontext před generováním obsahu; nenaplní sekce bez výzvy.
4. **Commitni a pushni** sám, až bude obsah připravený ke sdílení.

---

## Typy referenčních souborů

Při analýze existujícího systému nebo integraci s okolními systémy jsou zdrojem pravdy tyto typy souborů:

| Soubor | Co agentovi říká |
|--------|-----------------|
| `README.md` (dodávkové repo) | Celý stack, architektura, CI/CD, nasazení |
| `docker-compose.yml` | Lokální dev stack, služby, závislosti |
| API dokumentace / OpenAPI | Dostupné endpointy, datové struktury |
| Exporty z ticketovacího systému | Existující požadavky, backlog, hotové funkce |
| Confluence / wiki exporty | Procesní dokumentace, byznys pravidla |

---

## Přidání nové případové studie (PDF → Markdown)

PDF soubory nelze přímo přidat jako `@` kontext v Cursoru. Pro každý nový vstupní materiál ho nejprve převeď do Markdownu:

```bash
# Instalace (jednorázově, pokud ještě nemáš)
brew install poppler

# Převod PDF na text
pdftotext -layout "inputs/nazev-souboru.pdf" - > inputs/nazev-souboru.md
```

Po převodu ručně zkontroluj a vyčisti výstup — zejména záhlaví stránek, čísla stránek a případné artefakty z layoutu. Výsledný `.md` soubor pak přidávej jako `@inputs/nazev-souboru.md` v Cursoru.

---

## Import obsahu z Confluence

Confluence exportuje stránky jako `.doc` soubory, které jsou ve skutečnosti HTML zabalené v MIME obálce. Nepoužívej Pandoc přímo — kódování bude rozházené.

Použij tento dvoustupňový postup:

```bash
# Krok 1: Extrahuj a dekóduj HTML
python3 - <<'EOF'
import email

with open("your-export.doc", "rb") as f:
    raw = f.read()

msg = email.message_from_bytes(raw)

for part in msg.walk():
    if part.get_content_type() == "text/html":
        payload = part.get_payload(decode=True)
        with open("/tmp/extracted.html", "wb") as out:
            out.write(payload)
        break
EOF

# Krok 2: Převeď do Markdownu
pandoc -f html /tmp/extracted.html -o analyza/output.md --wrap=none
```

Po konverzi ručně vyčisti:
- Odstraň Confluence div markery (`:::`, `::::`)
- Nahraď JIRA makro markup prostými `[TICKET-XX](url)` odkazy
- Odstraň heading anchor atributy
- Odstraň rozbité reference na embedded obrázky
- Nahraď prázdné sekce `*(TBD)*`

---

## Git pravidla

- **Agent nikdy necommituje, nestaguje, nevytváří větve ani nepushuje.** Všechny git operace provádí člověk.
- Commit, když analýza nebo sekce dosáhne recenzovatelného stavu — ne po každé úpravě.
- Commit zprávy piš stručně a popisně, v češtině:
  - `analyza: přidána identifikace stakeholderů`
  - `pozadavky: doplněny nefunkční požadavky na bezpečnost`
  - `user-stories: finalizace pro vývojový tým`

---

## Instrukce pro agenta

Claude čte `instructions/agent.md` jako první (účel, pravidla, kontext), pak `instructions/analyza.md` pro analytickou práci. Klíčová pravidla:
- Nikdy nevytváří nový dokument bez výslovného pokynu
- Nikdy neprovádí git operace
- Vždy čte existující obsah před navrhováním změn
- Ptá se na kontext před generováním obsahu od nuly
- Upozorňuje na nekonzistence, ale neopravuje bez souhlasu

Pro práci s kódem a prototypy viz `instructions/prototyping.md`.
