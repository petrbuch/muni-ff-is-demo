Feature: Čekací listina pro obsazené termíny
  Pokud je požadovaný termín plně obsazen, může si uživatel nechtat
  automaticky poslat upozornění jakmile se místo uvolní.

  Background:
    Given uživatelka "Jana Procházková" je přihlášena přes knihovní IS
    And laboratoř "Virtuální reality" má termín 2026-04-07 10:00–12:00 plně obsazený

  # -----------------------------------------------------------------------
  # Pravidlo 1: Přidání na čekací listinu (F-19)
  # -----------------------------------------------------------------------

  Rule: Uživatel se může přidat na čekací listinu obsazeného termínu

    Scenario: Uživatel se přidá na čekací listinu
      When Jana klikne na "Přidat se na čekací listinu" u termínu 2026-04-07 10:00
      Then systém Janu přidá na čekací listinu pro tento termín
      And Jana obdrží potvrzovací e-mail "Byli jste přidáni na čekací listinu. Informujeme vás, jakmile se uvolní místo."

    Scenario: Uživatel se pokusí přidat na čekací listinu termínu u kterého již je
      Given Jana je již na čekací listině pro termín 2026-04-07 10:00
      When znovu klikne na "Přidat se na čekací listinu"
      Then systém zobrazí zprávu "Již jste na čekací listině pro tento termín."
      And nevytvoří duplicitní záznam

  # -----------------------------------------------------------------------
  # Pravidlo 2: Automatické upozornění při uvolnění místa (F-20)
  # -----------------------------------------------------------------------

  Rule: Systém automaticky upozorní prvního uživatele na čekací listině při uvolnění místa

    Scenario: Místo se uvolní a první uživatel na čekací listině dostane upozornění
      Given na čekací listině pro termín 2026-04-07 10:00 jsou uživatelé v pořadí:
        | pořadí | uživatel          |
        | 1      | Jana Procházková  |
        | 2      | Tomáš Nový        |
      And stávající rezervace v termínu je zrušena
      When systém zpracuje zrušení rezervace
      Then systém odešle Janě upozornění "Uvolnilo se místo pro termín 2026-04-07 10:00. Rezervujte do 24 hodin."
      And Tomáš Nový upozornění nedostane (čeká na výsledek Janiny odpovědi)

    Scenario: První uživatel na čekací listině nereaguje a místo přejde na dalšího
      Given Jana dostala upozornění o uvolněném místě
      And uplynulo 24 hodin bez toho, aby Jana rezervaci potvrdila
      When systém spustí kontrolu nevyužitých nabídek z čekací listiny
      Then systém Jana odebere z čekací listiny
      And odešle upozornění Tomáši Novému "Uvolnilo se místo pro termín 2026-04-07 10:00. Rezervujte do 24 hodin."

    Scenario: Uvolní se místo ale čekací listina je prázdná
      Given čekací listina pro termín 2026-04-07 10:00 je prázdná
      And stávající rezervace v termínu je zrušena
      When systém zpracuje zrušení rezervace
      Then systém termín vrátí do stavu "dostupný"
      And neodešle žádné upozornění

  # -----------------------------------------------------------------------
  # Pravidlo 3: Uživatel se může z čekací listiny odhlásit (F-04)
  # -----------------------------------------------------------------------

  Rule: Uživatel může kdykoli odebrat svůj záznam z čekací listiny

    Scenario: Uživatel se odhlásí z čekací listiny
      Given Jana je na čekací listině pro termín 2026-04-07 10:00
      When klikne na "Odebrat se z čekací listiny"
      Then systém Jana odebere z čekací listiny
      And Jana obdrží potvrzovací e-mail "Byli jste odebráni z čekací listiny."
      And uvolní se místo na čekací listině pro Tomáše Nového (posun o jednu pozici)
