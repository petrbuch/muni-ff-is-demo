# Workflow — práce s agentem a Gitem

Tento průvodce navazuje na prerekvizity. Předpokládá, že máš nainstalované všechny nástroje z [`02a-prerequisites-macos.md`](02a-prerequisites-macos.md) nebo [`02b-prerequisites-windows.md`](02b-prerequisites-windows.md).

**Co se naučíš:**
1. Naklonovat repozitář (jednorázově)
2. Správně předat agentovi kontext, aby věděl, s čím pracuje
3. Navrhovat, schvalovat a iterovat změny v dokumentech
4. Uložit a nahrát práci přes Git

---

## 1. Klonování repozitáře  `(jednorázově)`

"Klonování" znamená stáhnout celou kopii repozitáře — všechny soubory i kompletní historii změn — na tvůj počítač. Děláš to právě jednou. Pak jen synchronizuješ změny příkazy `git pull` a `git push`.

Otevři terminál **(macOS: Terminal / Windows: Git Bash)** a vytvoř složku pro repozitáře:

```bash
mkdir -p ~/Git
cd ~/Git
```

Naklonuj repozitář:

```bash
git clone git@github.com:petrbuch/muni-ff-is-demo.git
```

Git stáhne soubory a vytvoří složku `muni-ff-is-demo`. Přejdi do ní:

```bash
cd muni-ff-is-demo
```

Otevři repozitář v Cursoru:

```bash
cursor .
```

*(Tečka = "aktuální složka". Cursor otevře nové okno zaměřené na `muni-ff-is-demo`.)*

> **Máš Cursor už otevřený?** Příkaz `cursor .` otevře nové okno. Předchozí okno (z instalace) můžeš zavřít — pro tuto práci ho nepotřebuješ.

V Cursoru uvidíš v levém panelu (Explorer) celou strukturu repozitáře. Soubory otevíráš kliknutím.

**Důležité:** Všechny git příkazy musíš zadávat uvnitř složky `muni-ff-is-demo`. Pokud otevřeš nové okno terminálu, přesuň se tam:

```bash
cd ~/Git/muni-ff-is-demo
```

---

## 2. Začátek každé session

### 2.1 Stáhni nejnovější verzi

Než začneš, vždy spusť:

```bash
cd ~/Git/muni-ff-is-demo
git pull
```

`git pull` stáhne změny, které od tvé poslední synchronizace přibyly. Pokud tento krok přeskočíš a pak se pokusíš nahrát vlastní změny, Git je s velkou pravděpodobností odmítne (chyba "rejected") — a budeš muset situaci řešit zpětně. Je jednodušší vždy začínat `pull`em.

| Co vidíš | Co to znamená |
|----------|--------------|
| `Already up to date.` | Žádné nové změny — pracuješ s nejnovější verzí |
| Výpis souborů a commitů | Stáhly se nové změny — dobře, žes to udělal |
| `error: Your local changes...` | Máš neuložené změny — viz sekci 4 níže |

### 2.2 Otevři Cursor a spusť chat

```bash
cursor .
```

Otevři chat s agentem:
- **macOS:** `Cmd + L`
- **Windows:** `Ctrl + L`

Panel chatu se otevře zpravidla vpravo. Zkontroluj, že je vybraný správný model — klikni na rozbalovací menu v horní části chatu a ověř, že vidíš **Claude** (např. `claude-3.5-sonnet` nebo novější). Pokud vidíš GPT nebo jiný model, přepni ho.

### 2.3 Předej agentovi kontext

Claude na začátku každého chatu neví nic — ani co je v repozitáři, ani na čem pracuješ. Kontext mu předáváš přidáním souborů do chatovacího pole pomocí znaku `@`.

**Jak přidat soubor přes `@`:**
- Klikni do pole pro psaní zpráv v chatu (ne do editoru souborů)
- Napiš `@` a začni psát název souboru
- Cursor zobrazí nabídku — vyber soubor a potvrď Enterem
- Soubor se přidá jako "příloha" k tvé zprávě

**Povinný základ pro každou session:**

```
@README.md @instructions/agent.md
```

Pokud děláš analytickou práci, přidej i:

```
@instructions/analyza.md
```

Pak přidej dokument, se kterým chceš pracovat:

```
@analyza/knihovna-budoucnost.md
```

Proč tento základ?

| Soubor | Co agentovi říká |
|--------|-----------------|
| `README.md` | Struktura repozitáře, pravidla, kde co je |
| `instructions/agent.md` | Účel repozitáře, typy dokumentů, kritická pravidla |
| `instructions/analyza.md` | Jak pracovat na analýzách a user stories |

Bez těchto souborů agent pracuje "naslepo" — dává generické odpovědi, které nerespektují strukturu ani pravidla. Pokud zjistí, že mu jeden chybí, sám to oznámí.

---

## 3. Typická session — celý průběh

Ukázka: chceš pracovat na analýze požadavků pro rezervační systém knihovny.

---

**Krok 1 — Před otevřením Cursoru:**

```bash
cd ~/Git/muni-ff-is-demo && git pull
cursor .
```

---

**Krok 2 — V Cursoru, otevři chat (`Cmd/Ctrl+L`) a napiš:**

```
@README.md @instructions/agent.md @instructions/analyza.md @analyza/knihovna-budoucnost.md

Přečetl/a jsem si rozhovor s ředitelem knihovny. Chci strukturovat 
funkční požadavky z jeho odpovědí. Zde je přepis:

[vlož přepis rozhovoru nebo přidej soubor přes @]

Navrhni první verzi seznamu funkčních požadavků.
```

---

**Krok 3 — Přečti si návrh agenta.**

Cursor zobrazí navrhované změny jako **diff** — zelené řádky jsou nový obsah (`+`), červené jsou odebrané (`-`). Změny se do souboru nepropíší automaticky. Potvrzuješ je explicitně:

- **Apply** — tlačítko nad diff blokem v chatu; propíše navrhované změny do souboru
- **Accept** / **Accept All** — tlačítko v horní liště otevřeného souboru
- **Reject** — odmítne změny; soubor zůstane beze změny

> Pokud se ti změny nelíbí, klikni na Reject a řekni agentovi, co upravit. Není třeba začínat nový chat.

---

**Krok 4 — Iteruj.**

Agent si v rámci jedné session pamatuje celý dosavadní kontext. Stačí říct, co chceš změnit:

```
Dobrý základ. Požadavek F-03 je příliš obecný — přeformuluj ho tak,
aby bylo jasné, co přesně systém zobrazí a kdy.
```

nebo:

```
Přidej požadavek na čekací listinu — ředitel to zmínil, ale není to
zatím v seznamu.
```

---

**Krok 5 — Ulož práci** (viz sekce 4).

---

## 4. Ukládání práce pomocí Gitu

Git funguje ve třech krocích: **přidat změněné soubory → pojmenovat snímek → nahrát na server.**

Musíš být v terminálu uvnitř složky `muni-ff-is-demo`. Pokud si nejsi jistý, ověř nebo se přesuň:

```bash
pwd          # zobrazí aktuální cestu
cd ~/Git/muni-ff-is-demo
```

### 4.1 Zkontroluj, co ses změnilo

```bash
git status
```

Uvidíš seznam souborů ve dvou skupinách:
- **červeně** — soubory změněné na disku, ale ještě nepřidané ke commitu
- **zeleně** — soubory připravené ke commitu (po `git add`)

Pokud nevidíš žádné změněné soubory a víš, že jsi v Cursoru něco upravoval: ověř, zda jsi soubor **uložil** (`Cmd/Ctrl + S`). Cursor někdy neukládá automaticky.

### 4.2 Prohlédni si přesné změny (doporučeno)

Před přidáním ke commitu se podívej, co přesně ses změnil:

```bash
git diff
```

Zobrazí se výpis řádek po řádku: `+` jsou přidané řádky, `-` odebrané. Výstup opustíš stisknutím `q`.

Po `git add` si zobraz, co jde do commitu:

```bash
git diff --staged
```

### 4.3 Přidej změny ke commitu

Přidat konkrétní soubor:

```bash
git add analyza/knihovna-budoucnost.md
```

Přidat všechno najednou (tečka = "vše v aktuální složce a podsložkách"):

```bash
git add .
```

### 4.4 Vytvoř commit — pojmenuj změnu

**Commit** je pojmenovaný snímek stavu souborů. Každý commit se trvale zapíše do historie — kdokoliv si může kdykoliv zobrazit, co bylo změněno, kdy a kým.

```bash
git commit -m "analyza: přidány funkční požadavky z rozhovoru s ředitelem"
```

**Konvence pro zprávy commitů:**
- Začni oblastí, které se týká změna: `analyza:`, `user-stories:`, `template:`, `prototyp:`
- Stručně popiš, co ses změnil — ne jak, ale co
- Piš v češtině

Příklady:
- `analyza: první verze identifikace stakeholderů`
- `user-stories: přepsány klíčové požadavky pro vývojový tým`
- `analyza: doplněny nejasnosti a konflikty v sekci 5`

> **Spustil ses `git commit` bez `-m` a vidíš černou obrazovku s tildy `~`?**
>
> Dostal ses do textového editoru **vim**. Nedotýkej se ničeho. Stiskni `Esc`, pak napiš `:q!` a stiskni Enter. Vim se zavře. Pak spusť commit správně: `git commit -m "oblast: zpráva"`.

### 4.5 Nahraj změny na GitHub

```bash
git push
```

Hotovo. Změny jsou bezpečně uložené na serveru.

**Pokud `git push` selže s "rejected" nebo "non-fast-forward":**

Někdo jiný nahrál změny, zatímco jsi pracoval. Vyřeš to:

```bash
git pull   # stáhne a sloučí jejich změny s tvými
git push   # teď proběhne úspěšně
```

**Pokud `git pull` hlásí konflikty:**

Ty i někdo jiný jste editovali stejný soubor na stejném místě. Git označí problematické místo v souboru takto:

```
<<<<<<< HEAD
tvůj text
=======
text kolegy
>>>>>>> abc1234
```

Otevři soubor v Cursoru, ručně vyber správný obsah (nebo spoj obojí), smaž označení (`<<<<`, `====`, `>>>>`), ulož soubor, pak:

```bash
git add .
git commit -m "vyřešení konfliktu v analyza/..."
git push
```

---

## 5. Co agent dělá a co nedělá

| Dělá ✓ | Nedělá ✗ |
|--------|---------|
| Strukturuje požadavky z rozhovorů | Nevymýšlí požadavky, které nejsou v zadání |
| Navrhuje formulace a přeformulace | Neprovádí žádné git operace |
| Upozorňuje na nekonzistence a konflikty | Neopravuje bez tvého souhlasu — vždy čeká na Accept |
| Pomáhá přepsat požadavek jako user story | Neodesílá e-maily ani jinak nekomunikuje navenek |
| Iteruje na základě tvé zpětné vazby | Nerozhoduje za tebe — finální slovo máš vždy ty |
| Pamatuje kontext v rámci jedné session | Nepamatuje předchozí sessions — každý chat = čistý štít |
| Oznámí, pokud mu chybí kontext | Neplatí za externí API, tokeny ani SaaS služby |

---

## 6. Tipy pro dobré prompty

Kvalita výstupu agenta přímo závisí na kvalitě zadání. Čím konkrétnější jsi, tím použitelnější bude výsledek.

### Uváděj soubor, sekci a cíl

**Špatně:**
> „Pomoz mi s analýzou."

Agent neví, který soubor, která sekce, co chceš dosáhnout.

**Dobře:**
> „Podívej se na sekci Funkční požadavky v `analyza/knihovna-budoucnost.md`. Chybí tam požadavek na čekací listinu — ředitel to zmínil v rozhovoru. Navrhni 1–2 nové řádky."

---

### Říkej, pro koho je výstup

**Špatně:**
> „Přepiš sekci stakeholdeři."

**Dobře:**
> „Přepiš sekci stakeholdeři — je příliš obecná. Výstup bude číst vývojový tým, který nezná kontext knihovny."

---

### Používej agenta jako recenzenta

Agent nemusí jen psát — může i kontrolovat:

> „Zkontroluj sekci Nejasnosti a konflikty. Identifikoval jsem tři body — jsou dostatečně konkrétní? Chybí mi tam ještě něco?"

---

### Kratší iterace, ne jeden velký prompt

Místo jednoho promptu s pěti požadavky iteruj po jedné věci. Pokud agent udělá něco špatně, oprav ho přirozenou větou:

> „Dobrý základ, ale druhý požadavek je příliš technický. Přeformuluj ho z pohledu uživatele, ne z pohledu implementace."

---

### Zeptej se, co chybí

> „Přečti si sekci Funkční požadavky. Co tam podle tebe chybí, pokud porovnám s tím, co zaznělo v rozhovorech?"

---

## Denní rutina — cheat sheet

```bash
# Před každou session
cd ~/Git/muni-ff-is-demo   # přejdi do repozitáře
git pull                    # stáhni změny
cursor .                    # otevři editor

# V Cursoru (Cmd+L / Ctrl+L):
# @README.md @instructions/agent.md @instructions/analyza.md @analyza/<soubor>.md
# ... pracuj s agentem, používej Apply / Accept / Reject ...

# Po dokončení práce
git status                  # co ses změnilo?
git diff                    # jak přesně? (q pro výstup)
git add .                   # přidej vše
git diff --staged           # ověř, co jde do commitu
git commit -m "oblast: stručný popis změny"
git push                    # nahraj na GitHub
```

**Klávesové zkratky Cursor:**

| Akce | macOS | Windows |
|------|-------|---------|
| Otevřít chat | `Cmd + L` | `Ctrl + L` |
| Command palette | `Cmd + Shift + P` | `Ctrl + Shift + P` |
| Přepnout soubor | `Cmd + P` | `Ctrl + P` |
| Uložit soubor | `Cmd + S` | `Ctrl + S` |

---

Narazíš-li na chyby nebo potřebuješ odkaz na dokumentaci, přejdi do [`04-reference.md`](04-reference.md).
