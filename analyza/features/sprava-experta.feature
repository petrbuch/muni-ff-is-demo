Feature: Správa dostupnosti a přiřazení technologického experta
  Technologický expert si nastavuje dostupné časy, dostává přehled o plánovaných
  aktivitách a má možnost rezervaci potvrdit nebo zamítnout. Systém eskaluje
  situaci zaměstnancům knihovny pokud expert nereaguje.

  Background:
    Given expertka "Lucie Vrbová" je přihlášena do systému jako technologický expert

  # -----------------------------------------------------------------------
  # Pravidlo 1: Expert řídí svou dostupnost (F-08)
  # -----------------------------------------------------------------------

  Rule: Expert nastavuje a aktualizuje svou dostupnost

    Scenario: Expert nastaví nové dostupné časové sloty
      Given Lucie v systému zatím nemá nastaveny žádné dostupné časy na příští týden
      When v kalendáři označí časy 2026-04-07 od 9:00 do 12:00 a od 14:00 do 17:00
      And klikne na "Uložit dostupnost"
      Then systém uloží její dostupnost
      And nové sloty se zobrazí uživatelům jako rezervovatelné termíny

    Scenario: Expert odebere dostupný slot který ještě není obsazený
      Given Lucie má volný slot 2026-04-08 od 10:00 do 12:00
      And na tento slot neexistuje žádná rezervace
      When slot odstraní ze svého kalendáře dostupnosti
      Then systém slot zneviditelní pro nové rezervace

    Scenario: Expert se pokusí odebrat slot s existující rezervací
      Given Lucie má volný slot 2026-04-08 od 10:00 do 12:00
      And na tento slot existuje potvrzená rezervace uživatele "Martin Kovář"
      When Lucie se pokusí slot smazat
      Then systém zobrazí varování "Tento termín má existující rezervaci. Zrušením termínu bude rezervace zrušena a uživatel bude informován."
      And Lucie musí zrušení explicitně potvrdit

  # -----------------------------------------------------------------------
  # Pravidlo 2: Expert vidí detaily plánované aktivity (F-09)
  # -----------------------------------------------------------------------

  Rule: Expert dostává podrobné informace o plánované aktivitě při každé rezervaci

    Scenario: Expertka obdrží upozornění s detaily nové rezervace
      Given uživatel "Martin Kovář" vytvořil rezervaci v laboratoři VR na 2026-04-07 10:00
      And ve formuláři uvedl aktivitu "Virtuální prohlídka historického centra Brna, skupinka 5 žáků"
      When systém rezervaci potvrdí
      Then Lucie obdrží e-mailové upozornění obsahující:
        | pole               | hodnota                                               |
        | Uživatel           | Martin Kovář                                          |
        | Datum a čas        | 2026-04-07 10:00–12:00                                |
        | Plánovaná aktivita | Virtuální prohlídka historického centra Brna          |
        | Počet účastníků    | 5 žáků                                                |

  # -----------------------------------------------------------------------
  # Pravidlo 3: Workflow potvrzení přiřazení (F-10, NF-07)
  # -----------------------------------------------------------------------

  Rule: Systém eskaluje nepotvrzenné přiřazení po 24 hodinách

    Scenario: Expert potvrdí přiřazení k rezervaci
      Given Lucii bylo přiřazeno přiřazení k rezervaci 2026-04-07 10:00
      When Lucie klikne na "Potvrdit účast"
      Then rezervace zůstane ve stavu "potvrzená"
      And uživatel obdrží e-mail "Váš technologický expert potvrdil účast."

    Scenario: Expert zamítne přiřazení k rezervaci
      Given Lucii bylo přiřazeno přiřazení k rezervaci 2026-04-07 10:00
      When Lucie klikne na "Zamítnout — nejsem k dispozici"
      Then systém změní stav rezervace na "čeká na náhradního experta"
      And uživatel obdrží e-mail "Váš termín je stále platný, hledáme náhradního experta."
      And systém upozorní zaměstnance knihovny k ručnímu řešení

    Scenario: Expert nereaguje na přiřazení do 24 hodin
      Given Lucii bylo přiřazeno přiřazení k rezervaci 2026-04-07 10:00
      And uplynulo 24 hodin od odeslání upozornění
      And Lucie ani nepotvrdila ani nezamítla přiřazení
      When systém spustí denní kontrolu nereagujících přiřazení
      Then systém odešle zaměstnancům knihovny upozornění "Expert nereagoval na přiřazení k rezervaci 2026-04-07 10:00. Vyžaduje ruční řešení."

  # -----------------------------------------------------------------------
  # Pravidlo 4: Automatické připomínky (F-12)
  # -----------------------------------------------------------------------

  Rule: Expert dostane připomínku 24 hodin před každou rezervací

    Scenario: Systém odešle připomínku den před rezervací
      Given Lucie má potvrzené přiřazení k rezervaci 2026-04-07 10:00
      When aktuální datum a čas dosáhne 2026-04-06 10:00 (přesně 24 hodin před)
      Then systém odešle Lucii připomínku obsahující detaily rezervace a jméno uživatele
