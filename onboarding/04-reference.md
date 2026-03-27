# Reference — dokumentace, tutoriály a časté problémy

Tento soubor je záložní materiál. Nemusíš ho číst od začátku do konce. Otevři ho, když:
- potřebuješ odkaz na dokumentaci nebo video k nějakému nástroji
- narazíš na chybu a nevíš, co s ní
- hledáš klávesovou zkratku nebo git příkaz, který si nepamatuješ

---

## Rychlá pomoc — nejčastější situace

| Situace | Řešení |
|---------|--------|
| `brew` nefunguje po instalaci (Apple Silicon) | Spusť PATH příkazy z konce instalátoru, pak restartuj Terminal |
| Nevím, jak otevřít Git Bash (Windows) | Windows Terminal → šipka `∨` vedle `+` → Git Bash |
| `cursor .` nefunguje | Cursor → `Cmd/Ctrl+Shift+P` → "Install 'cursor' command in PATH" → restart terminálu |
| `Permission denied (publickey)` | `ssh -T git@github.com` — pokud selže, zopakuj SSH nastavení |
| `git push` selhal: "rejected" | `git pull` → `git push` |
| Dostal/a ses do vimu | `Esc`, pak `:q!`, Enter — vrátí tě zpět |
| Agent odpovídá anglicky | Napiš v chatu: „Odpovídej prosím česky." |
| Agent nezná obsah souboru | Přidej ho přes `@` v chatovacím poli |

---

## Dokumentace a tutoriály

### Git

| Zdroj | Typ | Odkaz |
|-------|-----|-------|
| Oficiální dokumentace | Referenční manuál | [git-scm.com/doc](https://git-scm.com/doc) |
| Pro Git | Kompletní kniha online, česky | [git-scm.com/book/cs/v2](https://git-scm.com/book/cs/v2) |
| Interaktivní tutoriál | Vizuální výuka větvení | [learngitbranching.js.org](https://learngitbranching.js.org) |
| Git Cheat Sheet | Přehled příkazů na jedné stránce (PDF) | [education.github.com/git-cheat-sheet](https://education.github.com/git-cheat-sheet-education.pdf) |
| Git Explained in 100 Seconds | Video — rychlý přehled konceptů (EN) | [youtube.com — Fireship](https://www.youtube.com/watch?v=hwP7WQkmECE) |
| Git crash course | Video — delší intro pro začátečníky (EN) | [YouTube: git crash course traversy](https://www.youtube.com/results?search_query=git+crash+course+traversy+media) |

### Homebrew — macOS

| Zdroj | Typ | Odkaz |
|-------|-----|-------|
| Domovská stránka | Instalace + dokumentace | [brew.sh](https://brew.sh) |
| Dokumentace | FAQ, příkazy, konfigurace | [docs.brew.sh](https://docs.brew.sh) |
| Video tutoriál | Instalace a použití (EN) | [YouTube: homebrew mac setup](https://www.youtube.com/results?search_query=homebrew+mac+install+tutorial+2024) |

### winget — Windows

| Zdroj | Typ | Odkaz |
|-------|-----|-------|
| Dokumentace Microsoft | Průvodce wingetem | [learn.microsoft.com/winget](https://learn.microsoft.com/cs-cz/windows/package-manager/winget/) |
| App Installer | Instalace pokud winget chybí | [Microsoft Store](https://apps.microsoft.com/detail/9nblggh4nns1) |

### Cursor

| Zdroj | Typ | Odkaz |
|-------|-----|-------|
| Domovská stránka | Stažení a přihlášení | [cursor.com](https://cursor.com) |
| Dokumentace | Funkce, nastavení, AI workflow | [docs.cursor.com](https://docs.cursor.com) |
| Klávesové zkratky | Přehled všech zkratek | [docs.cursor.com/kbd](https://docs.cursor.com/kbd) |
| Cursor pro začátečníky (EN) | Video — od základů | [YouTube: cursor ai tutorial beginners](https://www.youtube.com/results?search_query=cursor+ai+editor+tutorial+beginners+2024) |
| Cursor + Claude workflow (EN) | Video — efektivní práce s agentem | [YouTube: cursor claude workflow](https://www.youtube.com/results?search_query=cursor+claude+ai+workflow+tutorial) |

### GitHub

| Zdroj | Typ | Odkaz |
|-------|-----|-------|
| GitHub | Přihlášení a správa repozitářů | [github.com](https://github.com) |
| Dokumentace | GitHub Docs | [docs.github.com](https://docs.github.com) |
| SSH keys setup guide | Průvodce SSH na všech platformách | [GitHub: SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) |
| GitHub tutoriál (EN) | Video — přehled UI a workflow | [YouTube: github tutorial beginners](https://www.youtube.com/results?search_query=github+tutorial+beginners+2024) |

### Markdown

| Zdroj | Typ | Odkaz |
|-------|-----|-------|
| Základní syntaxe | Přehled všech prvků | [markdownguide.org/basic-syntax](https://www.markdownguide.org/basic-syntax/) |
| Tabulky a rozšíření | Tabulky, kód, citace, varování | [markdownguide.org/extended-syntax](https://www.markdownguide.org/extended-syntax/) |
| Interaktivní tutoriál | Nauč se Markdown v prohlížeči | [commonmark.org/help/tutorial](https://commonmark.org/help/tutorial/) |

---

## Podrobné řešení problémů

### Instalace a příkazy

| Příznak | Příčina | Řešení |
|---------|---------|--------|
| `command not found: brew` | Homebrew není v PATH (typicky Apple Silicon) | Spusť PATH příkazy, které vypsal instalátor na konci instalace. Pak restartuj Terminal. |
| `command not found: cursor` | Cursor CLI není zaregistrovaný | Cursor → `Cmd/Ctrl+Shift+P` → "Install 'cursor' command in PATH" → restart terminálu |
| `command not found: git` | Git není nainstalovaný | macOS: `brew install git` / Windows: `winget install Git.Git` |
| `winget` nefunguje | App Installer není nainstalovaný | Stáhni z [Microsoft Store](https://apps.microsoft.com/detail/9nblggh4nns1) nebo aktualizuj Windows |
| Git Bash se neobjevil v Windows Terminálu | Git nebyl nainstalován před otevřením Terminálu | Zavři a znovu otevři Windows Terminal. Pokud Git Bash stále chybí, restartuj počítač. |

### SSH a přístup ke GitHubu

| Příznak | Příčina | Řešení |
|---------|---------|--------|
| `Permission denied (publickey)` | SSH klíč není načtený nebo nesouhlasí | Ověř: `ssh -T git@github.com`. Pokud selže, zopakuj celé SSH nastavení v prerekvizitách. |
| `Repository not found` při klonování | Nemáš přístup k repozitáři nebo chybná URL | Zkontroluj URL klonu. Obrať se na Petra Buchbauera pokud potřebuješ přístup pro push. |
| SSH klíč se po restartu "zapomněl" | Keychain/SSH Agent není správně nakonfigurovaný | macOS: zkontroluj `~/.ssh/config` — musí obsahovat `UseKeychain yes`. Windows: PowerShell jako správce → `Set-Service ssh-agent -StartupType Automatic`. |
| `Host key verification failed` | GitHub fingerprint nesouhlasí (vzácné) | `ssh-keygen -R github.com` — smaže starý záznam. Pak zkus znovu. |

### Git problémy

| Příznak | Příčina | Řešení |
|---------|---------|--------|
| `git push` selže: "rejected" | Někdo nahrál změny, zatímco jsi pracoval | `git pull` → `git push` |
| `git pull` hlásí konflikty | Stejný soubor upraven na stejném místě dvěma lidmi | Otevři soubor, ručně vyrež bloky `<<<`, `===`, `>>>`. Pak `git add . && git commit`. |
| `nothing to commit, working tree clean` | Žádné změny nebyly uloženy na disk | Ověř, že jsi soubor v Cursoru uložil (`Cmd/Ctrl+S`). |
| Otevřel se vim místo commitu | Spustil ses `git commit` bez `-m` | `Esc` → `:q!` → Enter → `git commit -m "oblast: zpráva"` |
| Commitoval ses s chybnou zprávou (ještě nepushnutý commit) | Commit je lokálně uložený, ale ještě ne na serveru | `git commit --amend -m "oblast: správná zpráva"` — funguje jen před `git push` |
| `error: Your local changes would be overwritten` | Máš neuložené změny a `git pull` je odmítá přepsat | Buď změny uložíš (`git add . && git commit`), nebo je zahodíš (`git checkout -- .`). Obrať se na Petra, pokud si nejsi jistý. |

### Cursor a agent

| Příznak | Příčina | Řešení |
|---------|---------|--------|
| Agent odpovídá anglicky | Výchozí jazyk agenta | Napiš v chatu: „Odpovídej prosím česky." |
| Agent nezná obsah souboru | Soubor chybí v kontextu | Přidej ho přes `@` v chatovacím poli |
| Agent dává generické odpovědi | Chybí instrukce v kontextu | Přidej `@README.md @instructions/agent.md @instructions/analyza.md` |
| Agent navrhl změny, ale soubor se nezměnil | Zapomněl ses kliknout na Accept/Apply | Podívej se na diff v chatu nebo editor — klikni na Accept nebo Apply |
| Chat se "resetoval" a agent zapomněl kontext | Otevřel ses nový chat | Paměť mezi chaty neexistuje — začni přidáním kontextu od začátku |
| `cursor .` otevřel druhé okno | Cursor byl již otevřený | Normální chování — zavři první okno, pracuj v novém |

---

## Kontakty

| Kdo | Kdy se obrátit |
|-----|---------------|
| **Petr Buchbauer** | Správce repozitáře, otázky k workflow, přístup pro push |
