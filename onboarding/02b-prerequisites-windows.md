# Prerekvizity — Windows

Tento průvodce tě provede instalací všech nástrojů na Windows. Na macOS? Použij [`02a-prerequisites-macos.md`](02a-prerequisites-macos.md).

**Co budeš mít po dokončení tohoto průvodce:**
- Windows Terminal — moderní příkazová řádka
- Git + Git Bash — verzovací systém a unixové příkazové prostředí
- SSH klíč zaregistrovaný na GitHubu
- Cursor — AI editor s Claudem
- Vše nastaveno tak, aby fungovalo po každém restartu bez opakované konfigurace

**Jak dlouho to zabere:** 20–40 minut. Velká část je čekání na instalaci.

> **Prerekvizity lze instalovat i bez přístupu k repozitáři.** GitHub účet si vytvoř paralelně — na instalaci nástrojů nijak nečeká.

---

## Orientace: kde co spouštět

Windows má více různých "příkazových řádek". Tento průvodce vždy explicitně říká, kde má příkaz běžet:

| Prostředí | Jak ho poznáš | Kdy ho použiješ |
|-----------|--------------|-----------------|
| **PowerShell** | Výzva začíná `PS C:\...>` | Jednorázové nastavení SSH agenta (krok 4.2) |
| **Git Bash** | Výzva začíná `jmeno@PC MINGW64 ~` | Vše ostatní: SSH klíče, git, cursor |

Git Bash se nainstaluje spolu s Gitem v kroku 3. Jak ho otevřít je popsáno tamtéž. Pokud průvodce explicitně neřekne "PowerShell", předpokládej Git Bash.

---

## 1. Windows Terminal  `[~5 minut]`

**Co to je:** Moderní příkazová řádka s podporou záložek, nahrazuje starý `cmd`.

**Proč to potřebuješ:** Po instalaci Gitu (krok 3) ho otevřeš jako záložku uvnitř Windows Terminálu — přehledné a snadno přepínatelné.

**Instalace:**

1. Otevři **Microsoft Store** (najdeš ho v nabídce Start)
2. Vyhledej `Windows Terminal`
3. Klikni na **Získat** (je zdarma)
4. Po instalaci spusť Windows Terminal z nabídky Start

Otevře se okno s výchozím profilem — pravděpodobně PowerShell. Záložky přidáváš kliknutím na `+` vedle existující záložky.

**Ověření — že se otevřel:**

Vidíš okno s textovým kurzorem a výzvou podobnou `PS C:\Users\petr>` nebo `C:\Users\petr>`? Skvěle, funguje.

---

## 2. winget — správce balíčků  `[~2 minuty]`

**Co to je:** Správce balíčků zabudovaný do Windows 10 a 11. Instaluje programy jedním příkazem, jako App Store ale pro terminálové nástroje.

**Ověření, že ho máš** — v Windows Terminálu (výchozí profil, PowerShell nebo cmd):

```bash
winget --version
```

**Měl bys vidět:** `v1.x.x` nebo novější.

**Pokud příkaz nefunguje:**
- Windows 11 — aktualizuj Windows přes Nastavení → Windows Update
- Windows 10 — stáhni [App Installer z Microsoft Store](https://apps.microsoft.com/detail/9nblggh4nns1) (zdarma)

---

## 3. Git + Git Bash  `[~5 minut]`

**Co to je:** Git sleduje změny v souborech. Git Bash je unixové příkazové prostředí, které se nainstaluje společně s Gitem — dává ti na Windows stejné příkazy jako na macOS.

**Proč Git Bash a ne PowerShell?** SSH funguje v Git Bashi spolehlivě a příkazy jsou identické s macOS — průvodce a návody jsou pak přenositelné bez úprav.

**Instalace** — v Windows Terminálu (výchozí profil):

```bash
winget install Git.Git
```

Instalátor poběží automaticky. Až skončí, **zavři a znovu otevři Windows Terminal** — nové příkazy se aktivují až po restartu.

**Jak otevřít Git Bash:**

Po instalaci Gitu přibyde Git Bash jako nový profil v Windows Terminálu:

1. Klikni na šipku **`∨`** (chevron) vedle tlačítka `+` v záložkovém pruhu nahoře
2. V rozbalovací nabídce vyber **Git Bash**
3. Otevře se nová záložka

**Poznáš ho** podle výzvy: `jmeno@PC MINGW64 ~`

> **Alternativa:** Git Bash lze otevřít i jako samostatnou aplikaci z nabídky Start — vyhledej "Git Bash". Funguje stejně.

**Od tohoto bodu používej výhradně Git Bash**, pokud průvodce explicitně neřekne jinak.

**Ověření (v Git Bash):**

```bash
git --version
```

**Měl bys vidět:** `git version 2.x.x`

**Konfigurace — nastav svoji identitu** (jednou, platí pro vše):

```bash
git config --global user.name "Tvoje Jméno"
git config --global user.email "tvuj.email@example.com"
```

---

## 4. SSH klíč pro GitHub  `[~8 minut]`

**Co to je:** Způsob ověření identity bez zadávání hesla — pomocí dvojice kryptografických souborů.

**Proč to potřebuješ:** GitHub odmítá přístup přes heslo. SSH klíč je standardní a bezpečnější alternativa.

- **Soukromý klíč** (`~/.ssh/id_ed25519`) — zůstane pouze na tvém počítači. Nikdy ho nesdílej.
- **Veřejný klíč** (`~/.ssh/id_ed25519.pub`) — nahraješ ho do GitHubu. Sdílení je bezpečné.

### 4.1 Vygeneruj klíč  `[Git Bash]`

Otevři **Git Bash** a zadej:

```bash
ssh-keygen -t ed25519 -C "tvuj.email@example.com"
```

Příkaz se tě zeptá na dvě věci:
- `Enter file in which to save the key` → stiskni **Enter** (výchozí umístění je správné)
- `Enter passphrase` → stiskni **Enter** (prázdná fráze je pro studijní použití v pořádku)

**Měl bys vidět:** Výpis klíče jako ASCII art a potvrzení o uložení do `~/.ssh/id_ed25519`.

### 4.2 Nastav trvalé načítání klíče (Windows OpenSSH Agent)  `[PowerShell jako správce]`

Bez tohoto kroku by se SSH klíč po restartu počítače "zapomněl".

Otevři **PowerShell jako správce:**
- Klikni na Start → vyhledej `PowerShell`
- Klikni pravým tlačítkem → **Spustit jako správce**
- Potvrď UAC dialog

V PowerShellu zadej (oba příkazy za sebou):

```powershell
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
```

**Měl bys vidět:** Žádný výstup — to je správně. Zavři PowerShell.

### 4.3 Přidej klíč do SSH agenta  `[Git Bash]`

Vrať se do **Git Bash** a zadej:

```bash
ssh-add ~/.ssh/id_ed25519
```

**Měl bys vidět:** `Identity added: /c/Users/tvoje-jmeno/.ssh/id_ed25519`

### 4.4 Přidej SSH config pro GitHub  `[Git Bash]`

```bash
cat >> ~/.ssh/config << 'EOF'

Host github.com
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_ed25519
EOF
```

### 4.5 Zkopíruj veřejný klíč  `[Git Bash]`

```bash
clip < ~/.ssh/id_ed25519.pub
```

Klíč je teď ve schránce — jako Ctrl+C, ale pro soubor.

### 4.6 Přidej klíč do GitHubu

1. Přejdi na [github.com](https://github.com) a přihlas se (nebo si vytvoř bezplatný účet)
2. Klikni na svůj profilový obrázek (vpravo nahoře) → **Settings**
3. V levém menu → **SSH and GPG keys** → **New SSH key**
4. **Title:** napiš popisek — např. `Work PC 2025`
5. **Key:** vlož klíč ze schránky (`Ctrl + V`)
6. Klikni na **Add SSH key**

### 4.7 Ověř, že vše funguje  `[Git Bash]`

```bash
ssh -T git@github.com
```

Pokud se zobrazí: `The authenticity of host 'github.com' can't be established... Are you sure you want to continue?` → napiš `yes` a stiskni Enter.

**Měl bys vidět:** `Hi tvoje-jmeno! You've successfully authenticated...`

**Pokud vidíš `Permission denied (publickey)`:** Vrať se ke krokům 4.1–4.6 a zkontroluj, zda jsi přihlášen do správného GitHub účtu.

---

## 5. Přístup k repozitáři

Repozitář je veřejně dostupný ke čtení. Pro nahrávání vlastní práce (`git push`) potřebuješ:
- GitHub účet (bezplatný)
- SSH klíč nastavený podle kroku 4

Pokud máš nastavit přístup pro odevzdávání práce v rámci kurzu, obrať se na **Petra Buchbauera**.

---

## 6. Cursor — AI editor  `[~5 minut]`

**Co to je:** Editor souborů s vestavěným AI asistentem (Claude). Místo kopírování textu do ChatGPT vidí Claude přímo soubory, které máš otevřené.

### 6.1 Instalace

1. Přejdi na [cursor.com](https://cursor.com) a klikni na **Download for Windows**
2. Spusť stažený `.exe` instalátor
3. Postupuj podle průvodce (výchozí nastavení jsou správná)
4. Po instalaci spusť Cursor z nabídky Start nebo z plochy
5. Při prvním spuštění si vytvoř účet nebo se přihlas (osobní e-mail je v pořádku)

### 6.2 Cursor Free / Pro

Cursor má bezplatný tier s omezeným počtem AI zpráv za měsíc. Pro účely kurzu by měl stačit. Pokud narazíš na limit, Cursor nabídne upgrade na Pro — to není povinné.

> Pokud vyučující poskytuje přístup ke sdílenému API klíči nebo organizační licenci, dostaneš informaci zvlášť.

### 6.3 Aktivace příkazu `cursor` v Git Bash  `[Git Bash]`

Aby šlo Cursor otevírat příkazem `cursor .` z Git Bashe:

1. V Cursoru stiskni `Ctrl + Shift + P` (otevře se Command Palette)
2. Napiš `shell command`
3. Klikni na **Shell Command: Install 'cursor' command in PATH**
4. **Zavři a znovu otevři Git Bash**

**Ověření:**

```bash
cursor --version
```

**Měl bys vidět:** číslo verze, např. `0.4x.x`

**Pokud příkaz nefunguje ani po restartu:** Cursor musí být v systémové proměnné PATH. Cursor je obvykle nainstalovaný v `C:\Users\tvoje-jmeno\AppData\Local\Programs\cursor\resources\app\bin`. Obrať se na Petra, pokud si nejsi jistý.

---

## Hotovo — co ses nainstaloval

| Nástroj | K čemu slouží |
|---------|--------------|
| Windows Terminal | Moderní příkazová řádka s podporou záložek |
| Git + Git Bash | Sledování změn, synchronizace a unixové příkazy na Windows |
| SSH klíč | Ověření identity pro přístup ke GitHubu |
| Cursor | Editor s vestavěným AI asistentem (Claude) |

**Co teď?** Pokračuj v [`03-workflow.md`](03-workflow.md) — tam se naučíš naklonovat repozitář, spustit první session s agentem a ukládat práci.
