Feature: Opakující se rezervace pro skupiny a školy
  Školy a organizace mohou nastavit opakující se rezervace na celý semestr.
  Systém zobrazí přehled všech vygenerovaných termínů a upozorní uživatele
  pokud některý z termínů nelze potvrdit.

  # OTEVŘENÁ OTÁZKA: Pravidla maximálního blokování termínů (viz Nejasnost č. 1
  # v analyza/iskb12-knihovna-budoucnost.md) nebyla s klientem dořešena.
  # Scénáře pro vynucování limitu jsou zatím označeny jako TODO.

  Background:
    Given učitelka "Markéta Horáčková" je přihlášena jako zástupce školy
    And je přihlášena jako institucionální uživatel (škola / organizace)

  # -----------------------------------------------------------------------
  # Pravidlo 1: Skupiny mohou nastavit opakující se rezervace (F-13)
  # -----------------------------------------------------------------------

  Rule: Školy a organizace mohou rezervovat opakující se sloty na celý semestr

    Scenario: Škola nastaví čtrnáctidenní opakující se rezervaci na celý semestr
      Given laboratoř "Virtuální reality" má volné termíny každý druhý čtvrtek od 9:00 do 11:00
      And k termínům jsou k dispozici experti
      When učitelka vybere termín 2026-04-03 9:00 a zvolí opakování "každé 2 týdny" do 2026-06-25
      And klikne na "Zobrazit přehled termínů"
      Then systém zobrazí přehled 7 vygenerovaných termínů s daty a dostupností expertů
      When učitelka potvrdí celou sérii
      Then systém vytvoří všechny termíny ve stavu "potvrzená"
      And učitelka obdrží souhrnný potvrzovací e-mail se seznamem všech 7 termínů

    Scenario: Učitelka rozezná potvrzené a předběžné termíny v sérii
      Given učitelka má nastavenu sérii opakujících se rezervací
      And termín 2026-05-15 je plně potvrzený (expert k dispozici)
      And termín 2026-05-29 je předběžný (expert zatím nepotvrzen)
      When učitelka zobrazí přehled svých rezervací
      Then termín 2026-05-15 je označen jako "potvrzená"
      And termín 2026-05-29 je označen jako "předběžná — čeká na experta"

    Scenario: Jeden termín v sérii nelze potvrdit z důvodu nedostupnosti experta
      Given učitelka nastavila sérii 7 čtrnáctidenních rezervací
      And pro termín 2026-05-29 není k dispozici žádný expert
      When systém generuje sérii termínů
      Then 6 termínů je vytvořeno ve stavu "potvrzená"
      And termín 2026-05-29 je vytvořen ve stavu "nelze potvrdit"
      And učitelka obdrží e-mail "Termín 2026-05-29 nelze potvrdit z důvodu nedostupnosti experta. Zbývající termíny jsou potvrzeny."

  # -----------------------------------------------------------------------
  # Pravidlo 2: Opakující se rezervace jdou zrušit celé nebo částečně (F-04)
  # -----------------------------------------------------------------------

  Rule: Uživatel může zrušit celou sérii nebo jen jednotlivý termín

    Scenario: Učitelka zruší jeden termín z probíhající série
      Given učitelka má aktivní sérii opakujících se rezervací
      When vybere termín 2026-04-17 a zvolí "Zrušit pouze tento termín"
      Then systém zruší rezervaci 2026-04-17
      And ostatní termíny v sérii zůstávají nezměněny
      And přiřazený expert obdrží upozornění o zrušení termínu 2026-04-17

    Scenario: Učitelka zruší celou zbývající sérii
      Given učitelka má aktivní sérii, přičemž termíny 2026-04-03 a 2026-04-17 proběhly
      When zvolí "Zrušit všechny zbývající termíny"
      Then systém zruší všechny budoucí termíny série
      And každý přiřazený expert obdrží upozornění o hromadném zrušení

  # -----------------------------------------------------------------------
  # TODO: Pravidlo maximálního blokování termínů
  # Dořešit s klientem — viz Nejasnost č. 1
  # -----------------------------------------------------------------------

  # Rule: Jeden subjekt nemůže zablokovat příliš mnoho termínů dopředu
  #
  #   Scenario: Škola se pokusí zarezervovat více termínů než je povolený limit
  #     Given maximální počet dopředu rezervovaných termínů na jeden subjekt je X
  #     When škola se pokusí vytvořit sérii přesahující limit X termínů
  #     Then systém ...
  #     # BLOCKER: Pravidlo nebylo s klientem specifikováno (žádné číslo).
  #     # Tento scénář nelze implementovat bez rozhodnutí klienta.
