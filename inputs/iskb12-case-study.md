# ISKB12 — Případová studie: Identifikace požadavků a jejich předběžná analýza

> Tento soubor je textový přepis případové studie z `Iskb12 Case Study požadavky.pdf`.
> Přidávej ho jako kontext v Cursoru přes `@inputs/iskb12-case-study.md`.

---

## Zadání

Dostali jste se na stáž do knihovny Budoucnost. Její ředitel vás požádal, zda byste nesebrali a neanalyzovali požadavky na nový rezervační systém pro technologické laboratoře. Vaším úkolem je provést rozhovory, na jejich základě identifikovat požadavky a připravit takové zadání, aby IT firma, která bude systém realizovat, měla co nejpoužitelnější vstup pro vývoj.

Vaším cílem tedy není navrhnout hotový systém do detailu, ale především:

- pochopit potřeby různých aktérů,
- převést tyto potřeby do srozumitelných požadavků,
- rozlišit mezi tím, co je potřeba, co je požadavek a co už je konkrétní návrh řešení,
- upozornit na nejasnosti, konflikty a otevřené otázky, které by bylo potřeba dořešit s vývojovým týmem nebo klientem.

---

## Komunitní knihovna Budoucnost

### Umístění

Knihovna se nachází v širším centru většího okresního města a má kolem sebe živou místní komunitu, je snadno dostupná veřejnou dopravou a má dostatek parkovacích míst pro návštěvníky. Budova je moderní, s velkými skleněnými fasádami, které dovnitř vpouštějí přirozené světlo a osvětlují prostorný interiér.

### Poslání

Komunitní knihovna Budoucnost si klade za cíl posílit komunitu tím, že jí poskytne přístup k nejmodernějším technologiím a podpoří kulturu učení, kreativity a inovací.

### Zařízení a služby

Kromě tradičních knihovních služeb chce Budoucnost nabízet tři technologické služby, ke kterým vybudovala zázemí a zaměstnala technologické experty. Všechny tři níže popsané služby budou nabízeny prioritně skupinám ze škol nebo neziskovým organizacím a spolkům během otevírací doby knihovny po předchozí domluvě a rezervaci. Individuálním zájemcům budou laboratoře zpřístupněny pouze mimo akce knihovny a zarezervovaný čas organizacemi, pokud bude k dispozici technologický expert. Tyto individuální rezervace jsou otevřeny maximálně na nejbližších 7 dní dopředu.

Systém pro rezervaci a správu musí být nejprve navržen a vytvořen, aby se mohly služby začít nabízet.

#### Digitální multimediální laboratoř

Laboratoř v Budoucnosti je vybavena nejnovějšími programy pro úpravu zvuku a videa, nástroji pro grafický design a zařízením pro produkci multimédií. Nabízí zvukotěsnou nahrávací kabinku, výkonné počítače a odborný personál, který pomáhá s realizací různých digitálních projektů.

#### Dílna pro tvůrce (Makerspace)

Tato oblast je navržena tak, aby podporovala nadšence pro „udělej si sám", vynálezce a kreativní jedince všech věkových kategorií. Dílna je vybavena 3D tiskárnami, laserovými řezačkami, pracovními stanicemi pro elektroniku a tradičními materiály pro řemesla. Pravidelně se zde budou konat workshopy a kurzy, které budou učit nové dovednosti a techniky.

#### Laboratoř virtuální reality

Laboratoř pro zážitky a tvorbu ve virtuální realitě poskytuje prostředí, kde uživatelé mohou prozkoumávat virtuální realitu pro vzdělávání, zábavu nebo profesní rozvoj. Obsahuje několik high-end VR headsetů a knihovnu zážitků sahajících od virtuálních cest po interaktivní vzdělávací moduly.

### Současná situace IS/ICT

Knihovna v současné době používá základní knihovní informační systém, který spravuje výpůjčky knih, registrace uživatelů a katalogizaci. Pro nově nabízené technologické služby ještě neexistuje infrastruktura IS/ICT. Nejsou zde systémy pro rezervace, sledování dostupnosti technologických expertů ani pro správu samotných technologických zařízení.

Vedení knihovny předpokládá, že nový systém nebude vznikat „na zelené louce" bez vazeb na okolí. Počítá se s tím, že bude potřeba minimálně pracovat s údaji o registrovaných uživatelích, přístupových oprávněních a základním přehledem o rezervacích a využití služeb.

---

## Relevantní zaměstnanci

### Marek Dvořák — ředitel knihovny

Marek Dvořák absolvoval doktorské studium informačních studií a knihovnictví a po krátkém působení v akademické oblasti vyhrál konkurz na ředitele knihovny. Jeho výzkum a publikační činnost se soustředily především na digitalizaci knihoven a vliv moderních technologií na přístup k informacím. Jako ředitel knihovny se zaměřuje na strategické plánování a rozvoj technologických služeb, které reagují na měnící se potřeby komunity a podporují inovativní vzdělávací programy.

### Eva Nováková — expertka na digitální multimédia

Eva Nováková je zkušená odbornice na digitální multimédia s bakalářským titulem z oboru mediálních studií a magisterským titulem v oboru audiovizuální techniky. Před svým příchodem do Komunitní knihovny Budoucnost pracovala jako audiovizuální technička v televizní stanici, kde se specializovala na postprodukci a správu digitálního obsahu. Eva má výborné technické dovednosti a hluboké porozumění pro nejnovější software pro úpravu videa a zvuku. Její role v knihovně zahrnuje správu technologického vybavení laboratoře a vedení workshopů pro veřejnost.

### Jakub Horák — vedoucí makerspace

Jakub Horák je inženýr s titulem z oboru strojního inženýrství, který se po několika letech práce v automobilovém průmyslu rozhodl zaměřit se na vzdělávací technologie. Své technické dovednosti a zkušenosti z průmyslového designu a prototypování využívá v makerspace, kde je zodpovědný za správu a údržbu zařízení, jako jsou 3D tiskárny a laserové řezačky. Jakub je také vášnivým propagátorem STEM vzdělávání a pravidelně organizuje kurzy a workshopy zaměřené na inovace a kreativní řešení problémů.

### Lucie Vrbová — specialistka na virtuální realitu

Lucie Vrbová vystudovala magisterský program human-computer interaction. Do knihovny přinesla rozsáhlé znalosti v oblasti VR a AR technologií. Před svým nástupem do knihovny pracovala ve startupu zaměřeném na vývoj vzdělávacích aplikací ve virtuální realitě. Ve své roli v knihovně Lucie zajišťuje, že VR zařízení jsou nejen technicky na výši, ale také že programy a aplikace jsou vhodné pro různé věkové a zájmové skupiny uživatelů.

---

## Rozhovory

### Rozhovor s ředitelem — Marek Dvořák

**Stážisté:** Dobré ráno, Marku. Dnes bychom si chtěli popovídat o tom, jak by měl ideálně fungovat rezervační systém pro technologické laboratoře – Digitální multimediální laboratoř, Makerspace a Laboratoř virtuální reality. Jaké máte představy?

**Marek Dvořák:** Dobré ráno. Představuji si systém, který bude efektivně sloužit jak školám a organizacím, tak i jednotlivcům. Skupiny by měly mít možnost rezervovat prostor s předstihem, a to na základě dostupnosti našich technologických expertů, kteří by měli být přítomni během každého využití laboratoře.

**Stážisté:** Jak si představujete, že by měl tento systém fungovat z pohledu uživatele?

**Marek Dvořák:** Uživatelé by měli mít možnost snadno prohlížet volné termíny, rezervovat si čas a dostávat potvrzení o rezervaci. Chceme, aby systém umožňoval také snadné zrušení nebo změnu rezervace. Pro školy a organizace bychom chtěli nabídnout funkci plánování opakovaných aktivit, což by jim umožnilo rezervovat pravidelné sloty. Zároveň ale nechceme, aby si jeden subjekt zablokoval příliš mnoho termínů dopředu.

**Stážisté:** Jaké funkce by měl systém nabízet pro správu a přehlednost pro zaměstnance?

**Marek Dvořák:** Pro naše zaměstnance by bylo ideální mít dashboard, kde by viděli všechny nadcházející rezervace, mohli spravovat změny a koordinovat s technickými experty. Potřebujeme, aby systém automaticky upozorňoval na potřebu technické podpory a zajistil, že příslušný expert je vždy přiřazen k rezervaci. Nechci ale, aby zaměstnanci museli dělat zbytečně moc ruční administrativy.

**Stážisté:** Jak si představujete integraci nového systému s vaší stávající IT infrastrukturou?

**Marek Dvořák:** Je klíčové, aby nový systém byl propojen s naším stávajícím systémem pro správu knihovny, který obsahuje údaje o registrovaných uživatelích a jejich aktivitách. Nemusí být nutně všechno integrováno hned v první verzi, ale minimálně registrace a ověření uživatele by měly fungovat spolehlivě.

**Stážisté:** Jaké další výzvy očekáváte při implementaci tohoto systému?

**Marek Dvořák:** Jednou z výzev bude zajistit, že systém bude dostatečně uživatelsky přívětivý pro různorodou skupinu uživatelů, včetně osob s handicapem. Také musíme zajistit, že systém bude bezpečný a ochrání osobní údaje uživatelů.

**Stážisté:** Děkuji za vaše odpovědi. Jsou ještě nějaké další funkce, které byste chtěl, aby systém zahrnoval?

**Marek Dvořák:** Chtěl bych, aby systém nabízel možnost získávání zpětné vazby od uživatelů a generování reportů o využití zařízení. To by nám pomohlo lépe porozumět potřebám našich uživatelů a efektivněji plánovat budoucí rozvoj služeb. Ale pokud by to mělo vývoj výrazně komplikovat, asi by to nemuselo být součástí úplně první verze.

---

### Rozhovor se specialistkou — Lucie Vrbová

**Stážisté:** Dobrý den, Lucie. Chceme se s vámi dnes poradit o novém rezervačním systému pro Laboratoř virtuální reality. Jaké konkrétní funkce byste potřebovala, abyste mohla efektivně spravovat rezervace?

**Lucie Vrbová:** Dobrý den. Rozhodně bych potřebovala možnost zadávat a aktualizovat moje dostupné časy, aby si uživatelé mohli rezervovat termíny, kdy jsem na místě. Také bych chtěla vidět podrobné informace o tom, co skupina nebo jednotlivec plánuje dělat ve VR, abych mohla připravit potřebné vybavení a software.

**Stážisté:** Jak by měla vypadat interakce s tímto systémem z vašeho pohledu?

**Lucie Vrbová:** Chtěla bych, aby byl systém co nejjednodušší na používání. Ideální by bylo mít jednoduché uživatelské rozhraní, kde bych mohla rychle zkontrolovat rezervace, potvrdit je nebo je případně zrušit. Důležité je, aby systém umožňoval snadné přeplánování rezervací, protože v praxi často dochází k posledním změnám. Na druhou stranu nechci trávit moc času ručním potvrzováním každé drobnosti.

**Stážisté:** Jaké další funkcionality byste považovala za užitečné?

**Lucie Vrbová:** Systém by měl umožňovat odesílání automatických připomínek jak uživatelům, tak mně. Tyto připomínky by měly přicházet včas, aby se dalo předejít nedorozuměním a zbytečným prázdným slotům. Také by bylo skvělé, kdyby systém integroval formulář, kde by uživatelé mohli specifikovat své požadavky pro VR session. Jen bych byla opatrná, aby ten formulář nebyl zbytečně dlouhý a neodrazoval uživatele od rezervace.

**Stážisté:** Jaký význam by měla pro vás integrace s ostatními systémy knihovny?

**Lucie Vrbová:** Integrace je důležitá. Musíme být schopni sdílet informace s ostatními systémy, jako je evidence uživatelů a správa technologického vybavení. To by nám pomohlo lépe koordinovat dostupnost zařízení a personálu a také udržovat vysokou úroveň služeb.

**Stážisté:** Máte nějaké obavy nebo speciální požadavky týkající se bezpečnosti a ochrany dat v systému?

**Lucie Vrbová:** Ano, bezpečnost je pro nás velmi důležitá. Všechny údaje o uživatelích a jejich aktivitách musí být chráněny před neoprávněným přístupem. Chci, aby systém zahrnoval silná bezpečnostní opatření a zároveň zaručoval dodržování předpisů o ochraně osobních údajů.

**Stážisté:** Existuje ještě něco, co byste chtěla dodat, co by mohlo systém zlepšit?

**Lucie Vrbová:** Myslím, že by bylo užitečné, kdyby systém poskytoval analytické nástroje, které by nám umožnily sledovat využití VR místnosti a zpětnou vazbu od uživatelů. To by nám pomohlo nejen zlepšovat naše služby, ale také plánovat budoucí rozšíření nebo inovace na základě reálného využití.

---

### Rozhovor s učitelkou ze střední školy

**Stážisté:** Dobrý den, rádi bychom s vámi probrali, jak by měl vypadat rezervační systém pro technologické laboratoře knihovny, abyste jej mohli co nejlépe využívat pro vzdělávací účely. Jaké máte představy?

**Učitelka:** Dobrý den. Potřebovala bych, aby systém byl velmi jednoduchý a intuitivní, protože ne všichni učitelé jsou technicky zdatní. Musí být možné snadno zjistit, kdy jsou laboratoře dostupné, a rezervovat je online bez zbytečných komplikací.

**Stážisté:** Jaké informace byste chtěla vidět v systému při rezervaci?

**Učitelka:** Chtěla bych mít přehled o dostupných technologiích v každé laboratoři, takže když rezervuji, můžu rozhodnout, která místnost nejlépe vyhovuje potřebám mého kurzu. Také bych ocenila možnost vidět, kdo je technický expert přiřazený k laboratoři, a mít možnost s ním předem komunikovat o plánovaných aktivitách.

**Stážisté:** Jak často plánujete laboratoře využívat?

**Učitelka:** Plánuji je využívat pravidelně, možná jednou za dva týdny. Bylo by dobré, kdyby systém umožňoval nastavit opakované rezervace pro celé školní semestry. Zároveň ale potřebuji rychle poznat, které termíny už jsou reálně potvrzené a které jsou jen předběžné.

**Stážisté:** Jaké další funkce byste považovala za užitečné?

**Učitelka:** Bylo by skvělé, kdyby systém mohl posílat automatické připomínky mně. A také pokud by v systému byly nějaké instruktážní materiály nebo zdroje k přípravě, které bych mohla se studenty probrat předem.

**Stážisté:** Jak byste chtěla, aby systém zvládal situace, kdy jsou laboratoře plně obsazené?

**Učitelka:** Bylo by užitečné, kdyby existovala čekací listina nebo nějaký systém upozornění, který by nám dal vědět, když se uvolní místo. Tím bychom mohli lépe plánovat a přizpůsobovat naše výukové programy.

---

## Úkoly

Ve čtyřčlenných skupinkách si rozdělíte role následovně:
- 3 tazatelé / tazatelky (každý si vezme na starost jeden rozhovor)
- 1 analytik / analytička

Tazatelé si nastudují podrobně rozhovor, který by v realitě vedli, budou předávat informace o potřebách, problémech a požadavcích analytikovi nebo analytičce, kteří je budou ve skupině agregovat a strukturovat. Můžete použít např. Miro, OneNote, papír, tabulku nebo jiný jednoduchý nástroj.

### Vaším úkolem je připravit výstup pro vývojový tým

Nemáte navrhovat detailní podobu obrazovek ani celý hotový systém. Zaměřte se na to, co by měl vývojový tým vědět, aby mohl začít systém navrhovat a realizovat.

Ve skupině vytvořte tyto výstupy:

**1. Stakeholdeři a jejich cíle**
Určete alespoň 3 hlavní stakeholdery a stručně napište, co od systému potřebují.

**2. Požadavky na systém**
Sepište alespoň 8 požadavků. Zkuste je rozdělit na:
- funkční požadavky,
- nefunkční požadavky.

**3. Prioritizace**
U každého požadavku určete, zda je:
- must have,
- should have,
- could have.

**4. Nejasnosti a konflikty**
Uveďte alespoň 3 body, které jsou nejasné, mohou být konfliktní nebo by je bylo potřeba doplnit při dalším rozhovoru s klientem či vývojovým týmem.

**5. Převod do podoby pro vývoj**
Vyberte 2–3 klíčové požadavky a zkuste je zapsat tak, aby byly co nejpoužitelnější pro vývojový tým. Můžete použít například jednoduchou user story, stručný scénář použití nebo jiný srozumitelný zápis.

**6. Otázky pro hosta z praxe**
Připravte 2 konkrétní otázky, na které by vám mohl odpovědět ředitel softwarové firmy při druhé části hodiny.

---

## Doporučení

Při práci si všímejte, že:
- ne každé přání stakeholdera je automaticky dobrý požadavek,
- některé požadavky mohou být v konfliktu,
- některé věci jsou spíš návrhem řešení než skutečným požadavkem,
- ne všechny požadavky musí být součástí první verze systému.

---

## Odevzdání

Výstup nahrajete do příslušného kanálu v Teams, uvedete u něj jména členů skupinky a za to dostanete splněnou docházku.
