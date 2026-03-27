# Prerekvizity — macOS

Tento průvodce tě provede instalací všech nástrojů na macOS. Na Windows? Použij [`02b-prerequisites-windows.md`](02b-prerequisites-windows.md).

**Co budeš mít po dokončení tohoto průvodce:**
- Příkazovou řádku, kde můžeš zadávat příkazy
- Homebrew — správce balíčků pro macOS
- Git — verzovací systém
- SSH klíč zaregistrovaný na GitHubu
- Cursor — AI editor s Claudem
- Všechno toto nastaveno tak, aby fungovalo po každém restartu bez opakované konfigurace

**Jak dlouho to zabere:** 20–40 minut. Velká část je čekání na instalaci — můžeš mezitím dělat něco jiného.

> **Prerekvizity lze instalovat i bez přístupu k repozitáři.** GitHub účet si vytvoř paralelně — na instalaci nástrojů nijak nečeká.

---

## 1. Terminal — příkazová řádka  `[~2 minuty]`

**Co to je:** Aplikace, která ti umožňuje ovládat počítač textovými příkazy.

**Proč to potřebuješ:** Git, Homebrew a SSH se ovládají výhradně přes příkazovou řádku — grafické rozhraní pro ně neexistuje.

macOS má terminál zabudovaný. Otevři ho:

1. Stiskni `Cmd + mezerník` (otevře Spotlight)
2. Napiš `Terminal` a stiskni Enter

Otevře se okno s výzvou podobnou: `jmeno@MacBook ~ %`

To `%` na konci znamená, že terminál čeká na příkaz. Příkazy zadáváš a potvrzuješ Enterem. Pokud zadáš překlep a chceš začít znovu, stiskni `Ctrl + C` — přeruší to cokoliv, co běží, a vrátí výzvu.

**Základní orientace:**

| Příkaz | Co dělá | Příklad výstupu |
|--------|---------|-----------------|
| `pwd` | Kde jsem? | `/Users/petr` |
| `ls` | Co je v téhle složce? | `Desktop  Documents  Git` |
| `cd nazev` | Přejdi do podsložky | — |
| `cd ..` | Přejdi o úroveň výš | — |
| `cd ~` | Přejdi do domovské složky | vždy funguje jako "jdi domů" |
| `mkdir nazev` | Vytvoř novou složku | — |

> **Tip:** macOS od verze Catalina (2019) používá shell **zsh** (výzva končí `%`). Starší Macy mají **bash** (výzva končí `$`). Pro tento průvodce je rozdíl nepodstatný — všechny příkazy fungují v obou.

---

## 2. Homebrew — správce balíčků  `[~10 minut]`

**Co to je:** Nástroj pro instalaci vývojářských programů jedním příkazem. Podobně jako App Store, ale pro věci v příkazové řádce.

**Proč to potřebuješ:** Přes Homebrew nainstaluješ Git jedním příkazem — bez ruční instalace z webu.

**Instalace** — zkopíruj a vlož celý příkaz do Terminálu (`Cmd+V` nebo pravé tlačítko → Paste):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Co se bude dít:
- Instalátor tě požádá o heslo správce počítače — zadej ho (znaky se nezobrazují, to je normální) a stiskni Enter
- Pravděpodobně se nainstalují i **Xcode Command Line Tools** od Apple — to je v pořádku, nech ho dokončit, může to trvat 5–10 minut
- Před koncem instalátor vypíše instrukce — čti je pozorně

> **Jsi na Macu s čipem Apple Silicon (M1/M2/M3/M4)?**
>
> Na M-series Macích Homebrew instaluje do `/opt/homebrew/` místo `/usr/local/`. Na konci instalace vypíše dvě instrukce, které **musíš spustit ručně** — jinak příkaz `brew` nefunguje. Budou vypadat přibližně takto:
>
> ```bash
> echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
> eval "$(/opt/homebrew/bin/brew shellenv)"
> ```
>
> Zkopíruj a spusť **přesně ty příkazy, které ti vypsal instalátor** (verze se může lišit). Pak pokračuj ověřením níže.
>
> Nevíš, jaký čip máš? Klikni na  → **O tomto Macu**. Pod názvem modelu uvidíš buď "Apple M1/M2/M3" (Silicon) nebo "Intel Core" (Intel).

**Ověření:**

```bash
brew --version
```

**Měl bys vidět:** `Homebrew 4.x.x` nebo novější.

**Pokud vidíš `command not found: brew`:** Zavři Terminal, znovu ho otevři a zkus znovu. Pokud problém přetrvává, pravděpodobně jsi na Apple Silicon a je potřeba spustit PATH příkazy z instalátoru (viz rámeček výše).

---

## 3. Git — verzovací systém  `[~3 minuty]`

**Co to je:** Program, který sleduje každou změnu v souborech — kdo ji udělal, kdy a proč.

**Proč to potřebuješ:** Bez Gitu nemůžeš ukládat ani sdílet práci.

**Instalace:**

```bash
brew install git
```

**Ověření:**

```bash
git --version
```

**Měl bys vidět:** `git version 2.x.x`

**Konfigurace — nastav svoji identitu** (jednou, platí pro vše):

```bash
git config --global user.name "Tvoje Jméno"
git config --global user.email "tvuj.email@example.com"
```

Tyto údaje se zobrazí v historii repozitáře u každé změny, kterou uděláš. Nastavuješ to pouze jednou — platí pro všechny repozitáře na tomto počítači.

---

## 4. SSH klíč pro GitHub  `[~5 minut]`

**Co to je:** Způsob ověření identity bez zadávání hesla — pomocí dvojice kryptografických souborů.

**Proč to potřebuješ:** GitHub odmítá přístup přes heslo. SSH klíč je standardní a bezpečnější alternativa.

Jak to funguje:
- **Soukromý klíč** (`~/.ssh/id_ed25519`) — zůstane pouze na tvém počítači. Nikdy ho nesdílej.
- **Veřejný klíč** (`~/.ssh/id_ed25519.pub`) — nahraješ ho do GitHubu. Bez soukromého klíče je k ničemu, sdílení je bezpečné.
- Při připojení si tvůj počítač a GitHub klíče "porovnají" — pokud souhlasí, přístup je povolen bez hesla.

### 4.1 Vygeneruj klíč

```bash
ssh-keygen -t ed25519 -C "tvuj.email@example.com"
```

Příkaz se tě zeptá na dvě věci:
- `Enter file in which to save the key` → stiskni **Enter** (výchozí umístění je správné)
- `Enter passphrase` → stiskni **Enter** (prázdná přístupová fráze je pro studijní použití v pořádku)

**Měl bys vidět:** Výpis klíče jako ASCII art a potvrzení o uložení do `~/.ssh/id_ed25519`.

### 4.2 Nastav trvalé načítání klíče (macOS Keychain)

Bez tohoto kroku bys musel klíč přidávat ručně po každém restartu.

Přidej konfiguraci do SSH config souboru — zkopíruj a vlož celý blok najednou:

```bash
cat >> ~/.ssh/config << 'EOF'

Host github.com
  UseKeychain yes
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_ed25519
EOF
```

Pak přidej klíč do macOS Keychain:

```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

**Měl bys vidět:** `Identity added: ...` nebo žádný výstup. Obojí znamená úspěch.

### 4.3 Zkopíruj veřejný klíč

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

Klíč je teď ve schránce — jako Cmd+C, ale pro soubor.

### 4.4 Přidej klíč do GitHubu

1. Přejdi na [github.com](https://github.com) a přihlas se (nebo si vytvoř bezplatný účet)
2. Klikni na svůj profilový obrázek (vpravo nahoře) → **Settings**
3. V levém menu → **SSH and GPG keys** → **New SSH key**
4. **Title:** napiš popisek — např. `MacBook Pro 2025`
5. **Key:** vlož klíč ze schránky (`Cmd + V`)
6. Klikni na **Add SSH key**

### 4.5 Ověř, že vše funguje

```bash
ssh -T git@github.com
```

Pokud se zobrazí: `The authenticity of host 'github.com' can't be established... Are you sure you want to continue?` → napiš `yes` a stiskni Enter. Toto varování se zobrazí pouze při prvním připojení.

**Měl bys vidět:** `Hi tvoje-jmeno! You've successfully authenticated...`

**Pokud vidíš `Permission denied (publickey)`:** SSH klíč nebyl správně nastavený. Vrať se ke krokům 4.1–4.4 a zkontroluj, zda jsi přihlášený do správného GitHub účtu.

---

## 5. Přístup k repozitáři

Repozitář je veřejně dostupný ke čtení. Pro nahrávání vlastní práce (`git push`) potřebuješ:
- GitHub účet (bezplatný)
- SSH klíč nastavený podle kroku 4

Pokud máš nastavit přístup pro odevzdávání práce v rámci kurzu, obrať se na **Petra Buchbauera**.

---

## 6. Cursor — AI editor  `[~5 minut]`

**Co to je:** Editor souborů s vestavěným AI asistentem (Claude). Vypadá jako VS Code — ale místo toho abys kopíroval text do ChatGPT, Claude vidí přímo soubory, které máš otevřené.

**Proč to potřebuješ:** Je to prostředí, ve kterém celý workflow běží.

### 6.1 Instalace

1. Přejdi na [cursor.com](https://cursor.com) a klikni na **Download for Mac**
2. Otevři stažený `.dmg` soubor
3. Přetáhni ikonu **Cursor** do složky **Applications**
4. Spusť Cursor z Launchpadu nebo Finder → Applications
5. Při prvním spuštění si vytvoř účet nebo se přihlas (osobní e-mail je v pořádku)

### 6.2 Cursor Free / Pro

Cursor má bezplatný tier s omezeným počtem AI zpráv za měsíc. Pro účely kurzu by měl stačit. Pokud narazíš na limit, Cursor nabídne upgrade na Pro — to není povinné.

> Pokud vyučující poskytuje přístup ke sdílenému API klíči nebo organizační licenci, dostaneš informaci zvlášť.

### 6.3 Aktivace příkazu `cursor` v Terminálu

Aby šlo Cursor otevírat příkazem `cursor .` z Terminálu, potřebuješ jednorázovou registraci:

1. V Cursoru stiskni `Cmd + Shift + P` (otevře se Command Palette)
2. Napiš `shell command`
3. Klikni na **Shell Command: Install 'cursor' command in PATH**
4. **Zavři a znovu otevři Terminal**

**Ověření:**

```bash
cursor --version
```

**Měl bys vidět:** číslo verze, např. `0.4x.x`

---

## Hotovo — co ses nainstaloval

Prošel jsi instalací pěti nástrojů:

| Nástroj | K čemu slouží |
|---------|--------------|
| Terminal | Příkazová řádka pro ovládání Gitu a nástrojů |
| Homebrew | Správce balíčků pro macOS |
| Git | Sledování změn a synchronizace s GitHubem |
| SSH klíč | Ověření identity pro přístup ke GitHubu |
| Cursor | Editor s vestavěným AI asistentem (Claude) |

**Co teď?** Pokračuj v [`03-workflow.md`](03-workflow.md) — tam se naučíš naklonovat repozitář, spustit první session s agentem a ukládat práci.
