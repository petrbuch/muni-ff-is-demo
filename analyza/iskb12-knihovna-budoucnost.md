# Analýza požadavků — Rezervační systém Komunitní knihovny Budoucnost

## Kontext

**Systém:** Rezervační a správní systém pro technologické laboratoře  
**Klient / organizace:** Komunitní knihovna Budoucnost  
**Datum analýzy:** 2026-03-27  
**Autor analýzy:** ISKB12 — ukázkový výstup

**Stručný popis situace:**
Komunitní knihovna Budoucnost plánuje nabízet tři technologické služby — Digitální multimediální laboratoř, Dílnu pro tvůrce (Makerspace) a Laboratoř virtuální reality. Pro tyto služby zatím neexistuje žádná IS/ICT infrastruktura. Rezervační systém musí vzniknout jako první krok, aby se mohly služby začít nabízet. Knihovna provozuje stávající knihovní IS se správou uživatelů a výpůjček — nový systém se s ním musí minimálně propojit na úrovni autentizace uživatelů.

---

## 1. Stakeholdeři a jejich cíle

| Stakeholder | Role | Primární cíl | Omezení / obavy |
|-------------|------|-------------|-----------------|
| **Marek Dvořák** | Ředitel knihovny | Systém efektivně obsluhuje skupiny i jednotlivce, minimalizuje manuální administrativu zaměstnanců, podporuje plánování a rozvoj služeb | Nechce, aby jeden subjekt blokoval příliš mnoho termínů; systém musí být přístupný i pro osoby s handicapem |
| **Lucie Vrbová** | Specialistka na VR | Spravovat vlastní dostupnost, vidět detaily plánovaných aktivit uživatelů, minimalizovat čas strávený rutinní administrativou | Nechce příliš dlouhý formulář, který by odrazoval uživatele od rezervace; systém musí být jednoduchý na ovládání |
| **Učitelka ze SŠ** | Zástupkyně skupinových / institucionálních uživatelů | Snadno rezervovat pravidelné termíny pro celý semestr, mít přehled o dostupných technologiích a přiřazeném expertovi | Musí fungovat bez technické zdatnosti; potřebuje jasné rozlišení potvrzených vs. předběžných termínů |
| **Eva Nováková** | Expertka na digitální multimédia | *(rozhovor neproběhl)* | Neznámé — požadavky pro multimediální laboratoř nelze bez rozhovoru odvozovat od VR laboratoře |
| **Jakub Horák** | Vedoucí Makerspace | *(rozhovor neproběhl)* | Neznámé — Makerspace pracuje s fyzickými zařízeními (3D tiskárny, laserové řezačky), správa vybavení může mít specifické požadavky |
| **Individuální uživatel** | Příležitostný návštěvník | Rychle zjistit dostupnost a zarezervovat termín | Může rezervovat jen 7 dní dopředu; přístup až po skupinách a organizacích |

> **Analytická poznámka:** Rozhovory s Evou Novákovou a Jakubem Horákem neproběhly. Požadavky pro multimediální laboratoř a Makerspace jsou v tuto chvíli pokryty pouze generickými požadavky od ředitele. Před finalizací dokumentu je nutné provést doplňkové rozhovory s oběma specialisty.

---

## 2. Funkční požadavky

| ID | Požadavek | Zdroj | MoSCoW |
|----|-----------|-------|--------|
| F-01 | Systém umožní uživateli zobrazit dostupné termíny v jednotlivých laboratořích | Dvořák, učitelka | M |
| F-02 | Systém umožní registrovanému uživateli vytvořit rezervaci vybraného termínu | Dvořák | M |
| F-03 | Systém zašle uživateli potvrzení po úspěšném vytvoření rezervace | Dvořák | M |
| F-04 | Systém umožní uživateli zrušit nebo změnit existující rezervaci | Dvořák, Vrbová | M |
| F-05 | Systém ověří identitu uživatele při rezervaci na základě dat z existujícího knihovního IS | Dvořák | M |
| F-06 | Systém automaticky přiřadí technologického experta k rezervaci na základě jeho aktuální dostupnosti | Dvořák | M |
| F-07 | Systém zobrazí zaměstnancům přehled všech nadcházejících rezervací | Dvořák | M |
| F-08 | Systém umožní technologickému expertovi aktualizovat svou dostupnost | Vrbová | M |
| F-09 | Systém umožní expertovi zobrazit detailní informace o plánované aktivitě uživatele při dané rezervaci | Vrbová | M |
| F-10 | Systém umožní expertovi potvrdit nebo zrušit přiřazení k rezervaci | Vrbová | M |
| F-11 | Systém zašle automatické připomínky uživatelům před rezervací | Vrbová, učitelka | S |
| F-12 | Systém zašle automatické připomínky přiřazenému expertovi před rezervací | Vrbová | S |
| F-13 | Systém umožní školám a organizacím nastavit opakující se rezervace (týdenní slot na celý semestr) | Dvořák, učitelka | S |
| F-14 | Systém zobrazí potvrzené a předběžné rezervace odlišně (vizuálně nebo popiskem) | Učitelka | S |
| F-15 | Systém zobrazí uživateli přehled dostupných technologií v každé laboratoři | Učitelka | S |
| F-16 | Systém zobrazí uživateli, který expert je přiřazen k dané rezervaci | Učitelka | S |
| F-17 | Systém umožní uživateli při rezervaci vyplnit formulář s požadavky pro session | Vrbová | S |
| F-18 | Systém umožní zaměstnancům spravovat a upravovat rezervace přes dashboard | Dvořák | S |
| F-19 | Systém umožní uživateli přidat se na čekací listinu pro obsazený termín | Učitelka | C |
| F-20 | Systém automaticky upozorní uživatele z čekací listiny, pokud se uvolní místo | Učitelka | C |
| F-21 | Systém umožní uživateli odeslat zprávu přiřazenému expertovi před rezervací | Učitelka | C |
| F-22 | Systém umožní sběr zpětné vazby od uživatelů po využití laboratoře | Dvořák | C |
| F-23 | Systém generuje reporty o využití jednotlivých laboratoří a zařízení | Dvořák | C |
| F-24 | Systém zobrazí v rezervačním formuláři instruktážní materiály a zdroje k přípravě | Učitelka | C |

---

## 3. Nefunkční požadavky

| ID | Kategorie | Požadavek | Zdroj | MoSCoW |
|----|-----------|-----------|-------|--------|
| NF-01 | Bezpečnost | Systém musí implementovat autentizaci a autorizaci; neregistrovaní uživatelé nesmí moci vytvářet rezervace | Dvořák, Vrbová | M |
| NF-02 | GDPR | Systém musí chránit osobní údaje uživatelů v souladu s GDPR; přístup k datům musí být řízen oprávněními | Dvořák, Vrbová | M |
| NF-03 | Integrace | Systém musí být v první verzi propojen s existujícím knihovním IS minimálně pro ověření identity uživatele | Dvořák | M |
| NF-04 | Použitelnost | Systém musí být ovladatelný bez technické zdatnosti; kritické úkony (vyhledání termínu, rezervace, zrušení) nesmí vyžadovat více než 3 kroky | Dvořák, učitelka | S |
| NF-05 | Přístupnost | Systém musí splňovat standardy WCAG 2.1 úroveň AA pro osoby s handicapem | Dvořák | S |
| NF-06 | Výkon formuláře | Rezervační formulář (vč. sekce požadavků pro session) nesmí obsahovat více polí než je nezbytné — aby neodrazoval od dokončení rezervace | Vrbová | S |
| NF-07 | Spolehlivost | Každá potvrzená rezervace musí mít přiřazeného experta; systém nesmí potvrdit rezervaci bez dostupného experta | Dvořák, Vrbová | S |

---

## 4. Nejasnosti a konflikty

| # | Popis | Proč je to problém | Co je třeba dořešit |
|---|-------|--------------------|---------------------|
| 1 | **Konflikt: horizont rezervací pro skupiny vs. jednotlivce** — Ředitel říká, že skupiny mohou rezervovat opakované sloty na celý semestr, ale zároveň „nechceme, aby si jeden subjekt zablokoval příliš mnoho termínů". Jednotlivci jsou omezeni na 7 dní dopředu. | Tyto politiky nejsou číselně specifikované. Systém nemůže vynucovat pravidla, která nejsou definována — je nutné rozhodnout: jaký je maximální počet dopředu rezervovaných termínů pro organizace? Jak systém rozhodne, kdo má prioritu, pokud škola i jednotlivec chtějí stejný slot? | Definovat konkrétní pravidla kapacity: maximální horizont pro skupiny, maximální počet souběžných rezervací na jeden subjekt, pravidlo priority skupiny vs. jednotlivce. |
| 2 | **Nejasnost: rozsah integrace s existujícím IS** — Ředitel říká „minimálně registrace a ověření uživatele", Lucie zmiňuje i správu technologického vybavení. Není jasné, jaká data přesně sdílí nový systém s existujícím IS. | Rozsah integrace zásadně ovlivňuje architektonická rozhodnutí a cenu vývoje. Pokud se v budoucnu ukáže, že je potřeba oboustranná synchronizace dat, bude retrofit dražší než správný návrh od začátku. | Upřesnit: jednosměrné ověření identity (SSO/token), nebo i synchronizace rezervací do hlavního IS? Integrace správy zařízení — kdy a jak? |
| 3 | **Chybí pohled expertů pro dvě ze tří laboratoří** — Eva Nováková (multimedia) a Jakub Horák (Makerspace) nebyli dotázáni. Veškeré provozní požadavky jsou od Lucie Vrbové (VR). | Není zaručeno, že provozní potřeby jsou pro všechny laboratoře totožné. Makerspace pracuje s fyzickými zařízeními (3D tisk, laser), která mohou mít specifické požadavky na správu (stav stroje, fronta tisku, bezpečnostní protokoly). Multimediální lab má nahrávací kabinku — může potřebovat jiný typ rezervace (kratší sloty, specifický setup). | Doplnit rozhovory s Evou Novákovou a Jakubem Horákem před finalizací požadavků. |
| 4 | **Konflikt: automatické přiřazení experta vs. jeho konfirmace** — Ředitel předpokládá automatické přiřazení experta systémem. Lucie chce mít možnost potvrdit nebo zrušit přiřazení, ale nechce trávit čas potvrzováním každé maličkosti. | Není jasné, který tok je primární: (a) systém přiřadí automaticky a expert je pouze informován, nebo (b) systém navrhne přiřazení a expert ho musí potvrdit. Varianta (a) snižuje zátěž, ale expert nemá kontrolu; varianta (b) dává kontrolu, ale přidává krok, který Lucie nechce. Co se stane, pokud expert odmítne nebo je nedostupný? | Rozhodnout o workflow přiřazení experta a definovat fallback: co systém udělá, pokud přiřazený expert potvrzení neprovede do X hodin? |
| 5 | **Vágní nefunkční požadavky bez měřitelných kritérií** — „Dostatečně uživatelsky přívětivý" (Dvořák), „bezpečný" (Dvořák, Vrbová), „silná bezpečnostní opatření" (Vrbová) nejsou testovatelné požadavky. | Vývojový tým nemůže ověřit splnění požadavku, který nelze změřit. Bez konkrétních kritérií hrozí spory při akceptaci. | Definovat měřitelná kritéria: např. pro použitelnost — úspěšné dokončení rezervace do 3 minut bez asistence; pro bezpečnost — minimálně HTTPS, hashovaná hesla, logovatelnost přístupu k citlivým datům. |

---

## 5. Klíčové požadavky jako user stories

### User story 1 — Rezervace termínu uživatelem

> Jako **registrovaný uživatel (škola / organizace)**,  
> chci **snadno vyhledat dostupný termín v konkrétní laboratoři a rezervovat ho online**,  
> abych **nemusel komunikovat s knihovnou telefonicky nebo osobně a mohl si naplánovat akci dopředu**.

**Akceptační kritéria:**
- [ ] Uživatel vidí kalendář dostupných termínů pro každou ze tří laboratoří
- [ ] Uživatel může filtrovat termíny podle laboratoře a časového rozsahu
- [ ] Po výběru termínu systém zobrazí dostupného technologického experta
- [ ] Uživatel obdrží e-mailové potvrzení rezervace do 5 minut
- [ ] Pokud uživatel není přihlášen, systém ho vyzve k přihlášení přes existující knihovní IS před dokončením rezervace

---

### User story 2 — Správa dostupnosti technologickým expertem

> Jako **technologický expert (specialistka na VR)**,  
> chci **spravovat svůj kalendář dostupnosti a být automaticky informována o nových rezervacích s detaily plánované aktivity**,  
> abych **mohla připravit potřebné vybavení a software a netrávila zbytečný čas rutinní administrativou**.

**Akceptační kritéria:**
- [ ] Expertka může v systému nastavit a aktualizovat své dostupné časové sloty
- [ ] Při každé nové rezervaci dostane automatické upozornění s informacemi: kdo rezervuje, co plánuje dělat, kolik lidí přijde
- [ ] Expertka může rezervaci potvrdit nebo zamítnout; při zamítnutí systém uživatele informuje
- [ ] Systém zašle expertce připomínku nejpozději 24 hodin před rezervací
- [ ] Pokud expertka nezareaguje na přiřazení do 24 hodin, systém upozorní zaměstnance knihovny

---

### User story 3 — Opakující se rezervace pro školu

> Jako **učitelka ze střední školy**,  
> chci **nastavit opakující se rezervaci v laboratoři pro celý semestr jedním úkonem**,  
> abych **nemusela každé dva týdny ručně rezervovat znovu a mohla plánovat výuku dopředu**.

**Akceptační kritéria:**
- [ ] Uživatel může při vytvoření rezervace zvolit možnost opakování (týdenní / čtrnáctidenní) s datem ukončení (konec semestru)
- [ ] Systém zobrazí souhrnný přehled všech vygenerovaných termínů před potvrzením
- [ ] Potvrzené opakující se termíny jsou v kalendáři viditelně odlišeny od jednorázových rezervací
- [ ] Uživatel obdrží souhrnné potvrzení pro celý semestr (ne zvlášť pro každý termín)
- [ ] Systém upozorní uživatele, pokud některý z termínů v sérii nelze potvrdit (nedostupný expert, kapacita)
- [ ] Opakující se rezervace podléhají pravidlům maximálního blokování termínů (viz nejasnost č. 1 — pravidla teprve upřesnit s klientem)

---

## 6. Otázky pro hosta z praxe

*(Pro ředitele / seniora z IT firmy — otázky směřují na obecné přístupy a zkušenosti z reálné praxe.)*

1. **Neúplné zadání a chybějící stakeholdeři:** V tomto projektu máme definované požadavky pouze od části stakeholderů — dva ze tří provozních specialistů nebyli dotázáni. Jak v praxi řešíte situaci, kdy musíte začít navrhovat nebo vyvíjet systém, přestože víte, že část požadavků chybí? Kdy je přijatelné pokračovat a kdy je to blokér?

2. **Integrace s legacy systémy v první verzi:** Klient říká „minimálně ověření uživatele" pro v1, ale v budoucnu se počítá s hlubší integrací. Jak ve vašich projektech definujete rozsah integrace v první verzi, abyste se vyhnuli drahému refaktoringu v druhé? Jaké otázky si kladete při návrhu integračního rozhraní od začátku?

---

## 7. Otevřené otázky pro klienta

*(Otázky, které je třeba dořešit s Markem Dvořákem a dalšími stakeholdery před zahájením vývoje.)*

1. Jaký je maximální počet termínů, které může škola nebo organizace zarezervovat dopředu? Existuje časový horizont nebo limit počtu rezervací?
2. Co se stane s rezervací, pokud přiřazený expert není dostupný? Systém ji zruší automaticky, nebo nabídne náhradní termín?
3. Jsou provozní požadavky pro všechny tři laboratoře totožné, nebo mají Digitální multimediální laboratoř a Makerspace specifické potřeby (správa fyzického vybavení, bezpečnostní protokoly)?
4. Jaké konkrétní údaje z existujícího knihovního IS jsou pro rezervační systém potřebné — pouze přihlašovací identita, nebo i typ registrace, oprávnění, přehled aktivit?
5. Má systém fungovat jako veřejně dostupná webová aplikace, nebo pouze pro registrované uživatele knihovny?

---

## Poznámky a rozhodnutí

| Datum | Poznámka / rozhodnutí |
|-------|-----------------------|
| 2026-03-27 | Dokument vytvořen jako ukázkový výstup pro ISKB12. Vychází ze tří dostupných rozhovorů — s Markem Dvořákem, Lucií Vrbovou a učitelkou ze SŠ. |
| 2026-03-27 | Eva Nováková a Jakub Horák nebyli dotázáni — jejich požadavky jsou v dokumentu označeny jako neznámé. Doporučení: doplnit rozhovory před finalizací. |
| 2026-03-27 | F-22, F-23 (zpětná vazba, reporty) zařazeny jako Could have — ředitel sám naznačil, že nemusí být součástí první verze. |
