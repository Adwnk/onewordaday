"""One-to-one example sentences shared by both languages.
id -> [(english, tense, korean_text, korean_highlight, tagalog_text, tagalog_highlight)]
Same English gloss + tense for both languages, same order."""
E = {
"water": [
 ("Do you want some water?","present","물 마실래요?","물","Gusto mo ng tubig?","tubig"),
 ("I drank a lot of water.","past","물을 많이 마셨어요.","물","Uminom ako ng maraming tubig.","tubig"),
 ("Some water, please.","polite","물 좀 주세요.","물","Pahingi po ng tubig.","tubig")],
"eat": [
 ("Have you eaten?","past","밥 먹었어요?","먹었어요","Kumain ka na ba?","Kumain"),
 ("I'm eating now.","present","지금 먹어요.","먹어요","Kumakain ako ngayon.","Kumakain"),
 ("Want to eat together?","future","같이 먹을래요?","먹을래요","Sabay tayong kumain?","kumain")],
"drink": [
 ("I'm drinking coffee.","present","커피 마셔요.","마셔요","Umiinom ako ng kape.","Umiinom"),
 ("I drank milk yesterday.","past","어제 우유를 마셨어요.","마셨어요","Uminom ako ng gatas kahapon.","Uminom"),
 ("What will you drink?","future","뭐 마실래요?","마실래요","Ano ang iinumin mo?","iinumin")],
"go": [
 ("I'll go to the market.","future","시장에 갈 거예요.","갈 거예요","Pupunta ako sa palengke.","Pupunta"),
 ("I went to the market yesterday.","past","어제 시장에 갔어요.","갔어요","Pumunta ako sa palengke kahapon.","Pumunta"),
 ("Where are you going?","question","어디 가요?","가요","Saan ka pupunta?","pupunta")],
"come": [
 ("Come here.","command","이리 와요.","와요","Halika rito.","Halika"),
 ("My friend came over.","past","친구가 집에 왔어요.","왔어요","Dumating ang kaibigan ko sa bahay.","Dumating"),
 ("When will you come?","future","언제 올 거예요?","올 거예요","Kailan ka darating?","darating")],
"sleep": [
 ("Go to sleep now.","command","이제 자요.","자요","Matulog ka na.","Matulog"),
 ("I slept late last night.","past","어젯밤에 늦게 잤어요.","잤어요","Natulog ako nang late kagabi.","Natulog"),
 ("The child is still sleeping.","present","아이가 아직 자요.","자요","Natutulog pa ang bata.","Natutulog")],
"see": [
 ("Did you see that?","past","그거 봤어요?","봤어요","Nakita mo ba iyon?","Nakita"),
 ("See you tomorrow!","polite","내일 봐요!","봐요","Kita tayo bukas!","Kita"),
 ("I'm watching a movie.","present","영화 봐요.","봐요","Nanonood ako ng pelikula.","Nanonood")],
"like": [
 ("I like kimchi.","present","김치 좋아해요.","좋아해요","Gusto ko ang kimchi.","Gusto"),
 ("Do you like this?","question","이거 좋아해요?","좋아해요","Gusto mo ba ito?","Gusto"),
 ("I liked the movie.","past","그 영화 좋아했어요.","좋아했어요","Nagustuhan ko ang pelikula.","Nagustuhan")],
"need": [
 ("What do you need?","question","뭐가 필요해요?","필요해요","Ano ang kailangan mo?","kailangan"),
 ("I need help.","present","도움이 필요해요.","필요해요","Kailangan ko ng tulong.","Kailangan")],
"do": [
 ("What are you doing?","present","뭐 해요?","해요","Ano ang ginagawa mo?","ginagawa"),
 ("I already did it.","past","벌써 했어요.","했어요","Ginawa ko na.","Ginawa"),
 ("I'll do it tomorrow.","future","내일 할게요.","할게요","Gagawin ko bukas.","Gagawin")],
"buy": [
 ("I bought bread.","past","빵을 샀어요.","샀어요","Bumili ako ng tinapay.","Bumili"),
 ("I'm going to buy milk.","future","우유 살 거예요.","살 거예요","Bibili ako ng gatas.","Bibili"),
 ("She's buying fruit.","present","언니가 과일을 사요.","사요","Bumibili siya ng prutas.","Bumibili")],
"read": [
 ("I'm reading a book.","present","책을 읽어요.","읽어요","Nagbabasa ako ng libro.","Nagbabasa"),
 ("Did you read this?","past","이거 읽었어요?","읽었어요","Nabasa mo ba ito?","Nabasa"),
 ("I'll read later.","future","이따가 읽을 거예요.","읽을 거예요","Magbabasa ako mamaya.","Magbabasa")],
"talk": [
 ("Please speak slowly.","polite","천천히 말해 주세요.","말해","Magsalita po kayo nang dahan-dahan.","Magsalita"),
 ("She speaks Tagalog.","present","언니는 타갈로그어로 말해요.","말해요","Nagsasalita siya ng Tagalog.","Nagsasalita"),
 ("The teacher spoke.","past","선생님이 말했어요.","말했어요","Nagsalita ang guro.","Nagsalita")],
"know": [
 ("I know.","present","알아요.","알아요","Alam ko.","Alam"),
 ("I don't know.","negative","몰라요.","몰라요","Hindi ko alam.","alam"),
 ("Do you know?","question","알아요?","알아요","Alam mo ba?","Alam")],
"love": [
 ("I love you.","present","사랑해요.","사랑해요","Mahal kita.","Mahal"),
 ("I love my family.","present","우리 가족을 사랑해요.","사랑해요","Mahal ko ang pamilya ko.","Mahal")],
"wait": [
 ("Wait a moment.","polite","잠깐만 기다려요.","기다려요","Sandali lang, hintay ka.","hintay"),
 ("I waited a long time.","past","오래 기다렸어요.","기다렸어요","Naghintay ako nang matagal.","Naghintay"),
 ("I'll wait here.","future","여기서 기다릴게요.","기다릴게요","Maghihintay ako dito.","Maghihintay")],
"help": [
 ("Please help me!","polite","도와주세요!","도와주세요","Tulungan mo po ako!","Tulungan"),
 ("My friend helped me.","past","친구가 도와줬어요.","도와줬어요","Tinulungan ako ng kaibigan ko.","Tinulungan"),
 ("I'll help you.","future","제가 도와줄게요.","도와줄게요","Tutulungan kita.","Tutulungan")],
"work": [
 ("I work at an office.","present","사무실에서 일해요.","일해요","Nagtatrabaho ako sa opisina.","Nagtatrabaho"),
 ("I worked late yesterday.","past","어제 늦게까지 일했어요.","일했어요","Nagtrabaho ako hanggang gabi kahapon.","Nagtrabaho"),
 ("I'll work tomorrow too.","future","내일도 일할 거예요.","일할 거예요","Magtatrabaho rin ako bukas.","Magtatrabaho")],
"cook": [
 ("Mom is cooking.","present","엄마가 요리해요.","요리해요","Nagluluto si Nanay.","Nagluluto"),
 ("I cooked.","past","제가 요리했어요.","요리했어요","Ako ang nagluto.","nagluto"),
 ("I'll cook tonight.","future","오늘 저녁에 요리할게요.","요리할게요","Magluluto ako mamayang gabi.","Magluluto")],
"rice": [
 ("Let's eat rice.","present","밥 먹어요.","밥","Kain tayo ng kanin.","kanin"),
 ("I want more rice.","present","밥 더 주세요.","밥","Gusto ko pa ng kanin.","kanin")],
"food": [
 ("Do you like Korean food?","question","한국 음식 좋아해요?","음식","Gusto mo ba ang pagkaing Koreano?","pagkain"),
 ("The food was delicious.","past","음식이 맛있었어요.","음식","Masarap ang pagkain kanina.","pagkain")],
"delicious": [
 ("It's really delicious!","present","정말 맛있어요!","맛있어요","Ang sarap talaga!","sarap"),
 ("Is it delicious?","question","맛있어요?","맛있어요","Masarap ba?","Masarap"),
 ("Your cooking is delicious.","present","요리가 맛있어요.","맛있어요","Masarap ang luto mo.","Masarap")],
"coffee": [
 ("One coffee, please.","polite","커피 한 잔 주세요.","커피","Isang kape po.","kape"),
 ("I drank coffee this morning.","past","아침에 커피를 마셨어요.","커피","Uminom ako ng kape kaninang umaga.","kape")],
"house": [
 ("I'm going home.","present","집에 가요.","집","Uuwi na ako sa bahay.","bahay"),
 ("I was at home yesterday.","past","어제 집에 있었어요.","집","Nasa bahay ako kahapon.","bahay")],
"school": [
 ("I go to school.","present","학교에 다녀요.","학교","Pumapasok ako sa paaralan.","paaralan"),
 ("The school is close.","present","학교가 가까워요.","학교","Malapit ang paaralan.","paaralan")],
"friend": [
 ("This is my friend.","present","제 친구예요.","친구","Siya ang kaibigan ko.","kaibigan"),
 ("I met a friend.","past","친구를 만났어요.","친구","Nakipagkita ako sa kaibigan.","kaibigan")],
"family": [
 ("How many are in your family?","question","가족이 몇 명이에요?","가족","Ilan kayo sa pamilya?","pamilya"),
 ("I'm with my family.","present","가족이랑 같이 있어요.","가족","Kasama ko ang pamilya ko.","pamilya")],
"mom": [
 ("Where is Mom?","question","엄마 어디 있어요?","엄마","Nasaan si Nanay?","Nanay"),
 ("Mom called.","past","엄마가 전화했어요.","엄마","Tumawag si Nanay.","Nanay")],
"dad": [
 ("Dad is at work.","present","아빠는 회사에 있어요.","아빠","Nasa trabaho si Tatay.","Tatay"),
 ("Dad bought this.","past","아빠가 이거 샀어요.","아빠","Binili ito ni Tatay.","Tatay")],
"today": [
 ("What are you doing today?","question","오늘 뭐 해요?","오늘","Ano ang gagawin mo ngayon?","ngayon"),
 ("I'm happy today.","present","오늘 기분이 좋아요.","오늘","Masaya ako ngayon.","ngayon")],
"tomorrow": [
 ("See you tomorrow.","future","내일 만나요.","내일","Kita tayo bukas.","bukas"),
 ("It will rain tomorrow.","future","내일 비가 올 거예요.","내일","Uulan bukas.","bukas")],
"yesterday": [
 ("What did you do yesterday?","past","어제 뭐 했어요?","어제","Ano ang ginawa mo kahapon?","kahapon"),
 ("It rained yesterday.","past","어제 비가 왔어요.","어제","Umulan kahapon.","kahapon")],
"now": [
 ("Let's go now!","present","지금 가요!","지금","Tara na!","na"),
 ("I'll go now.","future","지금 갈게요.","지금","Aalis na ako.","na")],
"time": [
 ("What time is it?","question","지금 몇 시예요?","시","Anong oras na?","oras"),
 ("I don't have time.","negative","시간이 없어요.","시간","Wala akong oras.","oras")],
"good": [
 ("That's good.","present","좋아요.","좋아요","Mabuti iyan.","Mabuti"),
 ("My day was good.","past","오늘 하루 좋았어요.","좋았어요","Naging mabuti ang araw ko.","mabuti")],
"pretty": [
 ("You're so pretty!","present","정말 예뻐요!","예뻐요","Ang ganda mo!","ganda"),
 ("The flowers were pretty.","past","꽃이 예뻤어요.","예뻤어요","Maganda ang mga bulaklak.","Maganda")],
"big": [
 ("This house is big.","present","이 집은 커요.","커요","Malaki ang bahay na ito.","Malaki"),
 ("The child grew a lot.","past","아이가 많이 컸어요.","컸어요","Lumaki na nang husto ang bata.","Lumaki")],
"small": [
 ("The bag is small.","present","가방이 작아요.","작아요","Maliit ang bag.","Maliit"),
 ("The shoes were small.","past","신발이 작았어요.","작았어요","Maliit pala ang sapatos.","Maliit")],
"hot": [
 ("It's so hot today.","present","오늘 너무 더워요.","더워요","Ang init ngayon!","init"),
 ("It was hot yesterday.","past","어제 더웠어요.","더웠어요","Mainit kahapon.","Mainit")],
"cold": [
 ("It's cold outside.","present","밖에 추워요.","추워요","Malamig sa labas.","Malamig"),
 ("It was cold last night.","past","어젯밤 추웠어요.","추웠어요","Malamig kagabi.","Malamig")],
"happy": [
 ("I'm happy now.","present","지금 행복해요.","행복해요","Masaya ako ngayon.","Masaya"),
 ("I was really happy then.","past","그때 정말 행복했어요.","행복했어요","Masayang-masaya ako noon.","Masaya")],
"tired": [
 ("I'm so tired.","present","너무 피곤해요.","피곤해요","Pagod na pagod ako.","Pagod"),
 ("Are you tired?","question","피곤해요?","피곤해요","Pagod ka ba?","Pagod")],
"hungry": [
 ("I'm hungry.","present","배고파요.","배고파요","Gutom na ako.","Gutom"),
 ("Are you hungry?","question","배고파요?","배고파요","Gutom ka ba?","Gutom")],
"how-much": [
 ("How much is this?","question","이거 얼마예요?","얼마","Magkano ito?","Magkano"),
 ("How much did you pay?","past","얼마 냈어요?","얼마","Magkano ang binayaran mo?","Magkano")],
"where": [
 ("Where is the bathroom?","question","화장실이 어디예요?","어디","Saan ang banyo?","Saan"),
 ("Where did you go?","past","어디 갔어요?","어디","Saan ka pumunta?","Saan")],
"what": [
 ("What is this?","question","이게 뭐예요?","뭐","Ano ito?","Ano"),
 ("What did you eat?","past","뭐 먹었어요?","뭐","Ano ang kinain mo?","Ano")],
"yes": [
 ("Yes, okay.","casual","네, 좋아요.","네","Oo, sige.","Oo"),
 ("Yes, I've eaten.","polite","네, 먹었어요.","네","Opo, kumain na po ako.","Opo")],
"no": [
 ("No, thank you.","polite","아니요, 괜찮아요.","아니요","Hindi, salamat.","Hindi"),
 ("No, I didn't eat.","past","아니요, 안 먹었어요.","아니요","Hindi, hindi ako kumain.","Hindi")],
"thank-you": [
 ("Thank you for helping.","polite","도와줘서 감사합니다.","감사합니다","Salamat sa tulong mo.","Salamat"),
 ("Thank you very much.","polite","정말 감사합니다.","감사합니다","Maraming salamat po.","salamat")],
"hello": [
 ("Hello, nice to meet you!","polite","안녕하세요, 반가워요!","안녕하세요","Kumusta, ikinagagalak kitang makilala!","Kumusta"),
 ("Hi! (casual)","casual","안녕!","안녕","Kumusta!","Kumusta")],
"sorry": [
 ("I'm sorry.","polite","미안해요.","미안해요","Pasensya na.","Pasensya"),
 ("Sorry I'm late.","polite","늦어서 미안해요.","미안해요","Pasensya na, nahuli ako.","Pasensya")],
"okay": [
 ("Are you okay?","question","괜찮아요?","괜찮아요","Ayos ka lang ba?","Ayos"),
 ("I'm okay.","present","저는 괜찮아요.","괜찮아요","Ayos lang ako.","Ayos")],
"money": [
 ("I have no money.","present","돈이 없어요.","돈","Wala akong pera.","pera"),
 ("I spent all my money.","past","돈을 다 썼어요.","돈","Naubos ang pera ko.","pera")],
"phone": [
 ("Please call me.","polite","전화해 주세요.","전화","Tawagan mo po ako.","Tawagan"),
 ("I called Mom.","past","엄마한테 전화했어요.","전화","Tumawag ako kay Nanay.","Tumawag"),
 ("I'll call later.","future","이따가 전화할게요.","전화","Tatawag ako mamaya.","Tatawag")],
"car": [
 ("His car is new.","present","그의 차는 새 차예요.","차","Bago ang kotse niya.","kotse"),
 ("I bought a new car.","past","새 차를 샀어요.","차","Bumili ako ng bagong kotse.","kotse")],
"weather": [
 ("How's the weather today?","question","오늘 날씨 어때요?","날씨","Kumusta ang panahon ngayon?","panahon"),
 ("The weather was nice.","past","날씨가 좋았어요.","날씨","Maganda ang panahon kanina.","panahon")],
}
