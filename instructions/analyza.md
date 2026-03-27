# Analyza — instrukce pro agenta

Tento soubor doplňuje `instructions/agent.md` a upřesňuje, jak pracovat na analytických dokumentech: analýzách požadavků, user stories a podkladech pro návrh systému.

---

## Typy analytických výstupů a jejich účel

### 1. Analýza požadavků

Cílem analýzy požadavků je **srozumitelně popsat, co by měl systém dělat a za jakých podmínek**, tak aby vývojový tým mohl začít navrhovat a implementovat.

Analýza požadavků není:
- detailní návrh obrazovek ani technická architektura
- seznam toho, co si stakeholdeři přejí, aniž by bylo ověřeno, zda jde o skutečný požadavek
- finální zadání do nejmenšího detailu

Analýza požadavků je:
- strukturovaný přehled potřeb identifikovaných ze stakeholderských rozhovorů
- rozlišení mezi potřebou, požadavkem a konkrétním návrhem řešení
- identifikace nejasností a konfliktů, které je třeba dořešit

---

## Sekce analytického dokumentu

Šablona je v `templates/analyza-template.md`. Níže je popsáno, co má každá sekce obsahovat.

### Stakeholdeři a jejich cíle

Pro každého stakeholdera uveď:
- **Roli / název** (např. ředitel, expertka na VR, učitelka ze školy)
- **Primární cíl** — co od systému potřebuje (1–2 věty)
- **Klíčová omezení nebo obavy** — co nechce, čeho se bojí, jaká má omezení

**Nezapomeň na stakeholdery, kteří nebyli dotázáni.**
Pokud zadání zmiňuje relevantní osoby nebo role, se kterými rozhovor proveden nebyl, explicitně je v dokumentu uveď a označ jako „rozhovor neproběhl". Absence jejich pohledu je sama o sobě analyticky důležitá informace — znamená, že požadavky za jejich část systému chybí nebo jsou odvozené od jiných stakeholderů, nikoli přímé.

> Tip pro agenta: Pokud student přidá přepis rozhovoru, extrahuj potřeby explicitně zmíněné stakeholderem — ale odliš je od přání a návrhů řešení. Stakeholder, který říká „chci mít tlačítko na…", ve skutečnosti vyjadřuje potřebu, nikoli požadavek.

### Funkční požadavky

Funkční požadavek popisuje **co systém dělá** — jakou akci provede nebo jakou informaci zobrazí.

Formát: stručná věta nebo dvě. Začínej slovy „Systém umožní…", „Systém zobrazí…", „Systém odešle…" apod.

Příklady dobrých funkčních požadavků:
- Systém umožní uživateli zobrazit dostupné termíny rezervace v kalendářním pohledu.
- Systém odešle automatické e-mailové potvrzení po úspěšné rezervaci.
- Systém umožní technologickému expertovi aktualizovat svoji dostupnost.

Příklady špatných zápisů (jsou to návrhy řešení, ne požadavky):
- ~~Tlačítko „Rezervovat" bude zelené a v levém rohu.~~
- ~~Systém použije Google Calendar API.~~

### Nefunkční požadavky

Nefunkční požadavek popisuje **jak systém funguje** — jeho vlastnosti, nikoli funkce.

Kategorie:
- **Použitelnost** — snadnost ovládání, přístupnost (WCAG), jazyková lokalizace
- **Bezpečnost** — autentizace, autorizace, ochrana osobních dat (GDPR)
- **Výkon** — odezva systému, dostupnost, kapacita
- **Integrace** — kompatibilita se stávajícími systémy
- **Spolehlivost** — zálohování, obnova po výpadku

### MoSCoW prioritizace

Každý požadavek ohodnoť jednou ze čtyř kategorií:

| Kategorie | Anglicky | Meaning |
|-----------|---------|---------|
| Musí mít | Must have | Bez toho systém nefunguje nebo nesplňuje základní účel |
| Měl by mít | Should have | Důležité, ale systém bez toho funguje — patří do první verze pokud možno |
| Mohl by mít | Could have | Příjemné přidání, ale není prioritou — jen pokud zbyde kapacita |
| Nebude mít (zatím) | Won't have | Vědomě odloženo na pozdější verze |

> Tip pro agenta: Pokud student nechce prioritizovat, připomeň mu, že ne všechno musí být součástí první verze. Pomoz identifikovat, co je nutné pro „viable product" vs. co je rozšíření.

### Nejasnosti a konflikty

Uveď konkrétní body, které:
- nejsou dostatečně specifikované (např. „snadné ovládání" bez měřitelného kritéria)
- jsou v potenciálním konfliktu (např. požadavek na anonymitu vs. požadavek na audit log)
- závisí na rozhodnutí, které nebylo učiněno (např. integrace se stávajícím systémem — kdy, jak, co přesně)

Pro každý bod stručně popiš, **proč je to problém** a **co je třeba dořešit**.

---

## User stories

User story popisuje požadavek z pohledu uživatele v jednoduchém formátu:

```
Jako [role uživatele],
chci [co chci udělat],
abych [jaký mám z toho užitek / proč to potřebuji].
```

### Akceptační kritéria

Každá user story by měla mít akceptační kritéria — podmínky, za nichž lze říct, že story je splněna. Formát:

```
Splněno, když:
- [ ] Uživatel vidí dostupné termíny v kalendářním pohledu
- [ ] Po výběru termínu obdrží e-mailové potvrzení do 1 minuty
- [ ] Zrušení rezervace je možné nejpozději 24 hodin předem
```

### Příklady

**Dobrá user story:**
> Jako učitelka ze střední školy, chci nastavit opakující se rezervaci pro celý semestr, abych nemusela rezervovat každý týden zvlášť.
>
> Splněno, když:
> - [ ] Systém umožňuje vybrat den v týdnu a čas pro opakující se rezervaci
> - [ ] Opakující se termíny jsou zobrazeny v kalendáři jako potvrzené nebo předběžné
> - [ ] Učitelka dostane souhrnné potvrzení pro celý semestr

**Špatná user story (příliš technická, není z pohledu uživatele):**
> ~~Jako systém, chci uložit rezervaci do databáze, abych ji mohl zobrazit.~~

---

## Co agent dělá a co nedělá

| Dělá ✓ | Nedělá ✗ |
|--------|---------|
| Strukturuje obsah z přepisů rozhovorů | Nevymýšlí potřeby, které nejsou v rozhovoru |
| Navrhuje formulace požadavků | Nerozhoduje, co je must/should/could za studenta |
| Upozorňuje na konflikty a mezery | Neopravuje bez souhlasu studenta |
| Pomáhá přepsat požadavek jako user story | Nepíše finální dokument bez studentova vstupu |
| Ptá se, pokud chybí kontext | Nepředpokládá kontext, který nebyl sdílen |

---

## Otázky pro hosta z praxe (vs. otázky pro klienta)

Analytický dokument může obsahovat dva odlišné typy otázek — student je nesmí míchat:

| Typ | Komu směřuje | Příklady |
|-----|-------------|---------|
| **Otázky pro klienta** | Zadavatel systému, stakeholdeři | „Jaké jsou přesné podmínky pro opakované rezervace?" „Kdo schvaluje přístup pro školy?" |
| **Otázky pro hosta z praxe** | Ředitel / senior z IT firmy | „Jak ve vašich projektech řešíte situaci, kdy klient nemá jasno v prioritách?" „Jak přistupujete k integraci s legacy systémy v první verzi?" |

Otázky pro hosta z praxe **nesměřují na konkrétní detaily případové studie**, ale na obecné přístupy, rozhodovací rámce a zkušenosti z reálné praxe — tedy na věci, které klient nemůže zodpovědět, ale praktik ano.

---

## Doporučená sekvence promptů pro první session

Při zahájení analytické práce na novém zadání postupuj tímto pořadím — buď to tak sám navrhni, pokud student neví, kde začít:

**1. Identifikace stakeholderů** (vždy jako první)
```
Přečti si případovou studii (@inputs/...). Identifikuj všechny stakeholdery —
jak ty, se kterými byl proveden rozhovor, tak ty, kteří jsou v zadání zmíněni
ale rozhovor s nimi neproběhl. Pro každého stručně popiš, co od systému
potřebuje a jaká má omezení nebo obavy.
```

**2. Extrakce požadavků**
```
Na základě rozhovorů navrhni seznam funkčních požadavků. Odliš přitom:
- skutečné požadavky (co systém musí dělat)
- návrhy řešení (jak by to mohlo být implementováno)
- přání, která nejsou dostatečně specifikovaná
```

**3. Nefunkční požadavky**
```
Jaké nefunkční požadavky vyplývají z rozhovorů? Rozděl je do kategorií:
použitelnost, bezpečnost/GDPR, výkon, integrace.
```

**4. Prioritizace**
```
Ohodnoť každý požadavek pomocí MoSCoW. Kde si nejsi jistý, vysvětli proč
a navrhni, co by bylo potřeba dořešit s klientem.
```

**5. Nejasnosti a konflikty**
```
Identifikuj alespoň 3 body, které jsou nejasné nebo potenciálně konfliktní.
Pro každý vysvětli, proč je to problém a co je třeba dořešit.
```

**6. User stories**
```
Vyber 2–3 klíčové požadavky a přepiš je jako user stories s akceptačními
kritérii, tak aby je mohl použít vývojový tým.
```

---

## Minimální kontext pro analytickou session

```
@README.md @instructions/agent.md @instructions/analyza.md @analyza/<soubor>.md
```

Pokud existuje textová verze zadání nebo přepis rozhovorů, přidej ho jako dalším kontext:

```
@inputs/iskb12-case-study.md
```

Bez vstupních dat generuj jen strukturu a prázdnou šablonu — nikdy nevymýšlej obsah.
