Feature: Rezervace termínu v laboratoři
  Registrovaný uživatel si chce rezervovat termín v jedné ze tří technologických
  laboratoří. Systém ověří identitu přes existující knihovní IS a zajistí, že
  k termínu je vždy přiřazen technologický expert.

  Background:
    Given uživatelka "Jana Procházková" je přihlášena přes knihovní IS
    And systém zobrazuje dostupné termíny pro všechny tři laboratoře

  # -----------------------------------------------------------------------
  # Pravidlo 1: Každá rezervace musí mít přiřazeného experta (F-06, NF-07)
  # -----------------------------------------------------------------------

  Rule: Rezervace musí mít přiřazeného technologického experta

    Scenario: Úspěšná rezervace dostupného termínu
      Given laboratoř "Virtuální reality" má volný termín 2026-04-02 od 10:00 do 12:00
      And k termínu je k dispozici expertka "Lucie Vrbová"
      When uživatelka vybere termín a potvrdí rezervaci
      Then systém vytvoří rezervaci ve stavu "potvrzená"
      And uživatelka obdrží potvrzovací e-mail s detaily rezervace a jménem přiřazené expertky

    Scenario: Rezervace není možná pokud není k dispozici žádný expert
      Given laboratoř "Makerspace" má volný termín 2026-04-03 od 14:00 do 16:00
      But žádný expert není v daném termínu k dispozici
      When uživatelka se pokusí rezervovat termín
      Then systém zamítne vytvoření rezervace
      And zobrazí zprávu "Pro tento termín není k dispozici technologický expert. Zkuste jiný termín nebo se přidejte na čekací listinu."

  # -----------------------------------------------------------------------
  # Pravidlo 2: Individuální uživatelé mohou rezervovat max. 7 dní dopředu (F-02)
  # -----------------------------------------------------------------------

  Rule: Individuální uživatelé mohou rezervovat maximálně 7 dní dopředu

    Scenario: Individuální uživatel rezervuje termín v povoleném horizontu
      Given dnešní datum je 2026-03-27
      And uživatelka je přihlášena jako individuální uživatel (ne škola ani organizace)
      When se pokusí rezervovat termín na 2026-04-02 (6 dní dopředu)
      Then systém umožní vytvořit rezervaci

    Scenario: Individuální uživatel se pokusí rezervovat termín mimo povolený horizont
      Given dnešní datum je 2026-03-27
      And uživatelka je přihlášena jako individuální uživatel
      When se pokusí rezervovat termín na 2026-04-10 (14 dní dopředu)
      Then systém zobrazí zprávu "Individuální rezervace lze vytvořit pouze na nejbližších 7 dní."
      And termín 2026-04-10 je zobrazen jako nedostupný pro individuální uživatele

  # -----------------------------------------------------------------------
  # Pravidlo 3: Přihlášení je podmínkou rezervace (F-05, NF-01)
  # -----------------------------------------------------------------------

  Rule: Nepřihlášený uživatel nemůže vytvořit rezervaci

    Scenario: Nepřihlášený uživatel se pokusí rezervovat
      Given uživatel není přihlášen do systému
      When klikne na tlačítko "Rezervovat" u dostupného termínu
      Then systém ho přesměruje na přihlašovací stránku knihovního IS
      And po úspěšném přihlášení ho vrátí zpět na výběr termínu

  # -----------------------------------------------------------------------
  # Scenario Outline: různé laboratoře sdílí stejný základní rezervační tok
  # -----------------------------------------------------------------------

  Rule: Základní rezervační tok je totožný pro všechny tři laboratoře

    Scenario Outline: Úspěšná rezervace ve všech typech laboratoří
      Given laboratoř "<laboratoř>" má volný termín a k dispozici je expert "<expert>"
      When uživatelka vybere termín a vyplní rezervační formulář
      Then systém vytvoří rezervaci
      And uživatelka obdrží potvrzovací e-mail obsahující název laboratoře "<laboratoř>" a jméno experta "<expert>"

      Examples:
        | laboratoř                    | expert          |
        | Digitální multimediální lab  | Eva Nováková    |
        | Makerspace                   | Jakub Horák     |
        | Laboratoř virtuální reality  | Lucie Vrbová    |
