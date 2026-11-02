#!/usr/bin/env python3
"""Source of truth for data/pairs.json. Each example: (text, highlight, english, tense).
`highlight` must be a substring of text (the target word as it appears)."""
import json
from pathlib import Path
import sys
sys.path.insert(0,str(Path(__file__).resolve().parent))
from romanize import ko as ro_ko, tl as ro_tl
P=[]
def add(i,en,ko,tl): P.append((i,en,ko,tl))
add("water","water",("물","mul","water",[("물 마실래요?","물","Do you want some water?","present"),("물을 많이 마셨어요.","물","I drank a lot of water.","past"),("물 좀 주세요.","물","Some water, please.","polite")]),
 ("tubig","TOO-big","water",[("Gusto mo ng tubig?","tubig","Do you want some water?","present"),("Uminom ako ng tubig.","tubig","I drank water.","past"),("Bibili ako ng tubig mamaya.","tubig","I'll buy water later.","future")]))
add("eat","to eat",("먹다","meokda","to eat",[("밥 먹었어요?","먹었어요","Have you eaten?","past"),("지금 먹어요.","먹어요","I'm eating now.","present"),("같이 먹을래요?","먹을래요","Want to eat together?","future")]),
 ("kain","ka-EEN","to eat (kumain)",[("Kumain ka na ba?","Kumain","Have you eaten yet?","past"),("Kumakain ako ngayon.","Kumakain","I'm eating now.","present"),("Kakain tayo mamaya.","Kakain","We'll eat later.","future")]))
add("drink","to drink",("마시다","masida","to drink",[("커피 마셔요.","마셔요","I drink coffee.","present"),("어제 우유를 마셨어요.","마셨어요","I drank milk yesterday.","past"),("뭐 마실래요?","마실래요","What will you drink?","future")]),
 ("inom","ee-NOM","to drink (uminom)",[("Umiinom ako ng kape.","Umiinom","I'm drinking coffee.","present"),("Uminom siya ng gatas.","Uminom","She drank milk.","past"),("Iinom tayo mamaya.","Iinom","We'll drink later.","future")]))
add("go","to go",("가다","gada","to go",[("학교에 가요.","가요","I go to school.","present"),("어제 시장에 갔어요.","갔어요","I went to the market yesterday.","past"),("내일 갈 거예요.","갈 거예요","I will go tomorrow.","future")]),
 ("punta","POON-ta","to go (pumunta)",[("Pupunta ako sa palengke.","Pupunta","I'll go to the market.","future"),("Pumunta kami sa mall.","Pumunta","We went to the mall.","past"),("Saan ka pupunta?","pupunta","Where are you going?","question")]))
add("come","to come",("오다","oda","to come",[("이리 와요.","와요","Come here.","present"),("친구가 집에 왔어요.","왔어요","My friend came over.","past"),("언제 올 거예요?","올 거예요","When will you come?","future")]),
 ("dating","da-TING","to arrive / come (dumating)",[("Dumating na siya.","Dumating","He has arrived.","past"),("Darating ang bisita bukas.","Darating","The guest will come tomorrow.","future"),("Dumarating ang bus.","Dumarating","The bus is coming.","present")]))
add("sleep","to sleep",("자다","jada","to sleep",[("잘 자요!","자요","Sleep well!","polite"),("어젯밤에 늦게 잤어요.","잤어요","I slept late last night.","past"),("이제 잘 거예요.","잘 거예요","I'm going to sleep now.","future")]),
 ("tulog","TOO-log","sleep; to sleep (matulog)",[("Matulog ka na.","Matulog","Go to sleep now.","command"),("Natulog ako nang maaga.","Natulog","I slept early.","past"),("Natutulog pa ang bata.","Natutulog","The child is still sleeping.","present")]))
add("see","to see / watch",("보다","boda","to see; to watch",[("영화 봐요.","봐요","I watch a movie.","present"),("그거 봤어요?","봤어요","Did you see that?","past"),("내일 봐요!","봐요","See you tomorrow!","polite")]),
 ("kita","kee-TA","to see (makita)",[("Nakita mo ba?","Nakita","Did you see it?","past"),("Kita tayo bukas!","Kita","See you tomorrow!","future"),("Nakikita kita.","Nakikita","I can see you.","present")]))
add("like","to like",("좋아하다","joahada","to like",[("김치 좋아해요.","좋아해요","I like kimchi.","present"),("어릴 때 사과를 좋아했어요.","좋아했어요","I liked apples as a kid.","past"),("뭐 좋아해요?","좋아해요","What do you like?","question")]),
 ("gusto","GOOS-to","to like / want",[("Gusto ko ng kape.","Gusto","I want coffee.","present"),("Gusto mo ba ito?","Gusto","Do you like this?","question"),("Nagustuhan ko ang pelikula.","Nagustuhan","I liked the movie.","past")]))
add("need","to need",("필요하다","piryohada","to need",[("뭐가 필요해요?","필요해요","What do you need?","question"),("도움이 필요했어요.","필요했어요","I needed help.","past")]),
 ("kailangan","kai-LA-ngan","to need",[("Kailangan ko ng tulong.","Kailangan","I need help.","present"),("Ano ang kailangan mo?","kailangan","What do you need?","question")]))
add("do","to do",("하다","hada","to do",[("뭐 해요?","해요","What are you doing?","present"),("숙제 했어요?","했어요","Did you do your homework?","past"),("내일 할게요.","할게요","I'll do it tomorrow.","future")]),
 ("gawa","ga-WA","to do / make (gumawa)",[("Ano ang ginagawa mo?","ginagawa","What are you doing?","present"),("Ginawa ko na.","Ginawa","I already did it.","past"),("Gagawin ko bukas.","Gagawin","I'll do it tomorrow.","future")]))
add("buy","to buy",("사다","sada","to buy",[("빵을 사요.","사요","I buy bread.","present"),("새 신발을 샀어요.","샀어요","I bought new shoes.","past"),("우유 살 거예요.","살 거예요","I'm going to buy milk.","future")]),
 ("bili","bee-LEE","to buy (bumili)",[("Bumili ako ng tinapay.","Bumili","I bought bread.","past"),("Bibili ako ng gatas.","Bibili","I'll buy milk.","future"),("Bumibili siya ng prutas.","Bumibili","She's buying fruit.","present")]))
add("read","to read",("읽다","ikda","to read",[("책을 읽어요.","읽어요","I read a book.","present"),("그 책 읽었어요?","읽었어요","Did you read that book?","past"),("자기 전에 읽을 거예요.","읽을 거예요","I'll read before bed.","future")]),
 ("basa","ba-SA","to read (magbasa)",[("Nagbabasa ako ng libro.","Nagbabasa","I'm reading a book.","present"),("Nabasa mo ba ito?","Nabasa","Did you read this?","past"),("Magbabasa ako mamaya.","Magbabasa","I'll read later.","future")]))
add("talk","to speak",("말하다","malhada","to speak; to say",[("천천히 말해 주세요.","말해","Please speak slowly.","polite"),("엄마한테 말했어요.","말했어요","I told Mom.","past"),("한국어로 말해요.","말해요","I speak in Korean.","present")]),
 ("salita","sa-li-TA","to speak (magsalita)",[("Magsalita ka nang dahan-dahan.","Magsalita","Speak slowly.","command"),("Nagsasalita siya ng Tagalog.","Nagsasalita","She speaks Tagalog.","present"),("Nagsalita na ang guro.","Nagsalita","The teacher spoke.","past")]))
add("know","to know",("알다","alda","to know",[("알아요.","알아요","I know.","present"),("몰랐어요.","몰랐어요","I didn't know.","past"),("그 사람 알아요?","알아요","Do you know that person?","question")]),
 ("alam","a-LAM","to know",[("Alam ko.","Alam","I know.","present"),("Hindi ko alam.","alam","I don't know.","negative"),("Alam mo ba?","Alam","Do you know?","question")]))
add("love","to love",("사랑하다","saranghada","to love",[("사랑해요.","사랑해요","I love you.","present"),("많이 사랑했어요.","사랑했어요","I loved (you) a lot.","past")]),
 ("mahal","ma-HAL","love; dear; expensive",[("Mahal kita.","Mahal","I love you.","present"),("Mahal ko ang pamilya ko.","Mahal","I love my family.","present"),("Ang mahal nito!","mahal","This is so expensive!","other meaning")]))
add("wait","to wait",("기다리다","gidarida","to wait",[("잠깐만 기다려요.","기다려요","Wait a moment.","polite"),("한 시간 기다렸어요.","기다렸어요","I waited an hour.","past"),("여기서 기다릴게요.","기다릴게요","I'll wait here.","future")]),
 ("hintay","HIN-tai","to wait (maghintay)",[("Hintay lang.","Hintay","Just wait.","command"),("Naghintay ako nang matagal.","Naghintay","I waited a long time.","past"),("Maghihintay ako dito.","Maghihintay","I'll wait here.","future")]))
add("help","to help",("돕다","dopda","to help",[("도와주세요!","도와주세요","Please help me!","polite"),("친구가 도와줬어요.","도와줬어요","My friend helped me.","past"),("제가 도와줄게요.","도와줄게요","I'll help you.","future")]),
 ("tulong","TOO-long","help (tumulong)",[("Tulungan mo ako.","Tulungan","Help me.","command"),("Tumulong siya sa akin.","Tumulong","He helped me.","past"),("Tutulong ako bukas.","Tutulong","I'll help tomorrow.","future")]))
add("work","to work",("일하다","ilhada","to work",[("회사에서 일해요.","일해요","I work at a company.","present"),("어제 늦게까지 일했어요.","일했어요","I worked late yesterday.","past"),("내일도 일할 거예요.","일할 거예요","I'll work tomorrow too.","future")]),
 ("trabaho","tra-BA-ho","work; job (magtrabaho)",[("Nagtatrabaho ako sa opisina.","Nagtatrabaho","I work in an office.","present"),("Nagtrabaho siya kahapon.","Nagtrabaho","He worked yesterday.","past"),("Magtatrabaho ako bukas.","Magtatrabaho","I'll work tomorrow.","future")]))
add("cook","to cook",("요리하다","yorihada","to cook",[("엄마가 요리해요.","요리해요","Mom is cooking.","present"),("제가 요리했어요.","요리했어요","I cooked.","past"),("오늘 저녁에 요리할게요.","요리할게요","I'll cook tonight.","future")]),
 ("luto","LOO-to","to cook (magluto)",[("Nagluluto si Nanay.","Nagluluto","Mom is cooking.","present"),("Nagluto ako ng adobo.","Nagluto","I cooked adobo.","past"),("Magluluto ako mamaya.","Magluluto","I'll cook later.","future")]))
add("rice","rice / meal",("밥","bap","cooked rice; a meal",[("밥 먹었어요?","밥","Have you eaten? (a greeting)","past"),("밥이 맛있어요.","밥","The rice is tasty.","present")]),
 ("kanin","KA-nin","cooked rice",[("Kain tayo ng kanin.","kanin","Let's eat rice.","present"),("Gusto ko pa ng kanin.","kanin","I want more rice.","present")]))
add("food","food",("음식","eumsik","food",[("한국 음식 좋아해요?","음식","Do you like Korean food?","question"),("음식이 맛있었어요.","음식","The food was delicious.","past")]),
 ("pagkain","pag-KA-in","food",[("Masarap ang pagkain.","pagkain","The food is delicious.","present"),("Saan tayo bibili ng pagkain?","pagkain","Where will we buy food?","future")]))
add("delicious","delicious",("맛있다","masitda","delicious; tasty",[("정말 맛있어요!","맛있어요","It's really delicious!","present"),("어제 그 피자 맛있었어요.","맛있었어요","That pizza yesterday was tasty.","past")]),
 ("masarap","ma-sa-RAP","delicious",[("Ang sarap!","sarap","So tasty!","present"),("Masarap ba?","Masarap","Is it delicious?","question"),("Masarap ang luto mo.","Masarap","Your cooking is delicious.","present")]))
add("coffee","coffee",("커피","keopi","coffee",[("커피 한 잔 주세요.","커피","One coffee, please.","polite"),("아침에 커피를 마셨어요.","커피","I drank coffee this morning.","past")]),
 ("kape","KA-pe","coffee",[("Magkape tayo.","Magkape","Let's have coffee.","present"),("Uminom ako ng kape kanina.","kape","I drank coffee earlier.","past")]))
add("house","house / home",("집","jip","house; home",[("집에 가요.","집","I'm going home.","present"),("집에 있었어요.","집","I was at home.","past")]),
 ("bahay","BA-hai","house; home",[("Uuwi na ako sa bahay.","bahay","I'm going home now.","future"),("Nasa bahay ako kahapon.","bahay","I was home yesterday.","past")]))
add("school","school",("학교","hakgyo","school",[("학교에 가요.","학교","I go to school.","present"),("학교가 끝났어요.","학교","School is over.","past")]),
 ("paaralan","pa-a-RA-lan","school (also: eskwela)",[("Pumapasok ako sa paaralan.","paaralan","I attend school.","present"),("Malapit ang paaralan.","paaralan","The school is close.","present")]))
add("friend","friend",("친구","chingu","friend",[("제 친구예요.","친구","This is my friend.","present"),("친구를 만났어요.","친구","I met a friend.","past")]),
 ("kaibigan","kai-BEE-gan","friend",[("Siya ang kaibigan ko.","kaibigan","She is my friend.","present"),("Nakita ko ang kaibigan ko.","kaibigan","I saw my friend.","past")]))
add("family","family",("가족","gajok","family",[("가족이 몇 명이에요?","가족","How many are in your family?","question"),("가족이랑 여행 갔어요.","가족","I traveled with family.","past")]),
 ("pamilya","pa-MIL-ya","family",[("Mahal ko ang pamilya ko.","pamilya","I love my family.","present"),("Kasama ko ang pamilya ko.","pamilya","I'm with my family.","present")]))
add("mom","mom",("엄마","eomma","mom",[("엄마, 배고파요.","엄마","Mom, I'm hungry.","present"),("엄마가 전화했어요.","엄마","Mom called.","past")]),
 ("nanay","NA-nai","mom (also: inay, mama)",[("Nasaan si Nanay?","Nanay","Where is Mom?","question"),("Tumawag si Nanay.","Nanay","Mom called.","past")]))
add("dad","dad",("아빠","appa","dad",[("아빠는 회사에 있어요.","아빠","Dad is at work.","present"),("아빠가 사 줬어요.","아빠","Dad bought it for me.","past")]),
 ("tatay","TA-tai","dad (also: itay, papa)",[("Nasa trabaho si Tatay.","Tatay","Dad is at work.","present"),("Binili ito ni Tatay.","Tatay","Dad bought this.","past")]))
add("today","today",("오늘","oneul","today",[("오늘 뭐 해요?","오늘","What are you doing today?","question"),("오늘 바빴어요.","오늘","I was busy today.","past")]),
 ("ngayon","nga-YON","today; now",[("Ano ang gagawin mo ngayon?","ngayon","What will you do today?","future"),("Masaya ako ngayon.","ngayon","I'm happy today.","present")]))
add("tomorrow","tomorrow",("내일","naeil","tomorrow",[("내일 만나요.","내일","Let's meet tomorrow.","future"),("내일 비가 올 거예요.","내일","It will rain tomorrow.","future")]),
 ("bukas","boo-KAS","tomorrow (also: open)",[("Kita tayo bukas.","bukas","See you tomorrow.","future"),("Aalis ako bukas.","bukas","I'm leaving tomorrow.","future")]))
add("yesterday","yesterday",("어제","eoje","yesterday",[("어제 뭐 했어요?","어제","What did you do yesterday?","past"),("어제 피곤했어요.","어제","I was tired yesterday.","past")]),
 ("kahapon","ka-HA-pon","yesterday",[("Ano ang ginawa mo kahapon?","kahapon","What did you do yesterday?","past"),("Umulan kahapon.","kahapon","It rained yesterday.","past")]))
add("now","now",("지금","jigeum","now",[("지금 어디예요?","지금","Where are you now?","question"),("지금 갈게요.","지금","I'll go now.","future")]),
 ("na","na","now / already",[("Tara na!","na","Let's go now!","present"),("Kumain na ako.","na","I've already eaten.","past")]))
add("time","time",("시간","sigan","time; hour",[("시간 있어요?","시간","Do you have time?","question"),("시간이 없었어요.","시간","I didn't have time.","past")]),
 ("oras","O-ras","time; hour",[("Anong oras na?","oras","What time is it?","question"),("Wala akong oras.","oras","I don't have time.","negative")]))
add("good","good",("좋다","jota","good; nice",[("날씨가 좋아요.","좋아요","The weather is nice.","present"),("좋았어요!","좋았어요","It was good!","past")]),
 ("mabuti","ma-BOO-ti","good; well (also: maganda)",[("Mabuti naman ako.","Mabuti","I'm doing well.","present"),("Mabuti at dumating ka.","Mabuti","Good that you came.","past")]))
add("pretty","pretty",("예쁘다","yeppeuda","pretty",[("정말 예뻐요.","예뻐요","It's really pretty.","present"),("꽃이 예뻤어요.","예뻤어요","The flowers were pretty.","past")]),
 ("maganda","ma-gan-DA","beautiful; pretty",[("Ang ganda mo!","ganda","You're so beautiful!","present"),("Maganda ang araw ngayon.","Maganda","It's a beautiful day.","present")]))
add("big","big",("크다","keuda","big",[("이 집은 커요.","커요","This house is big.","present"),("아이가 많이 컸어요.","컸어요","The child grew a lot.","past")]),
 ("malaki","ma-la-KI","big",[("Malaki ang bahay nila.","Malaki","Their house is big.","present"),("Lumaki na ang bata.","Lumaki","The child has grown.","past")]))
add("small","small",("작다","jakda","small",[("가방이 작아요.","작아요","The bag is small.","present"),("신발이 작았어요.","작았어요","The shoes were small.","past")]),
 ("maliit","ma-li-IT","small",[("Maliit ang bag ko.","Maliit","My bag is small.","present"),("Maliit pa siya noon.","Maliit","He was still small then.","past")]))
add("hot","hot",("덥다","deopda","hot (weather)",[("오늘 너무 더워요.","더워요","It's so hot today.","present"),("어제 더웠어요.","더웠어요","It was hot yesterday.","past")]),
 ("mainit","ma-I-nit","hot",[("Ang init ngayon!","init","It's so hot today!","present"),("Mainit ang kape.","Mainit","The coffee is hot.","present")]))
add("cold","cold",("춥다","chupda","cold (weather)",[("밖에 추워요.","추워요","It's cold outside.","present"),("어젯밤 추웠어요.","추웠어요","It was cold last night.","past")]),
 ("malamig","ma-LA-mig","cold",[("Malamig dito.","Malamig","It's cold here.","present"),("Gusto ko ng malamig na tubig.","malamig","I want cold water.","present")]))
add("happy","happy",("행복하다","haengbokhada","happy",[("지금 행복해요.","행복해요","I'm happy now.","present"),("그때 정말 행복했어요.","행복했어요","I was really happy then.","past")]),
 ("masaya","ma-sa-YA","happy; fun",[("Masaya ako.","Masaya","I'm happy.","present"),("Masaya ang party kagabi.","Masaya","The party last night was fun.","past")]))
add("tired","tired",("피곤하다","pigonhada","tired",[("너무 피곤해요.","피곤해요","I'm so tired.","present"),("어제 피곤했어요.","피곤했어요","I was tired yesterday.","past")]),
 ("pagod","PA-god","tired",[("Pagod na ako.","Pagod","I'm tired now.","present"),("Pagod ka ba?","Pagod","Are you tired?","question")]))
add("hungry","hungry",("배고프다","baegopeuda","hungry",[("배고파요.","배고파요","I'm hungry.","present"),("아까 배고팠어요.","배고팠어요","I was hungry earlier.","past")]),
 ("gutom","GOO-tom","hungry (nagugutom)",[("Gutom na ako.","Gutom","I'm hungry now.","present"),("Nagugutom ka ba?","Nagugutom","Are you hungry?","question")]))
add("how-much","how much",("얼마","eolma","how much",[("이거 얼마예요?","얼마","How much is this?","question"),("얼마였어요?","얼마","How much was it?","past")]),
 ("magkano","mag-KA-no","how much",[("Magkano ito?","Magkano","How much is this?","question"),("Magkano ang binayaran mo?","Magkano","How much did you pay?","past")]))
add("where","where",("어디","eodi","where",[("화장실이 어디예요?","어디","Where is the bathroom?","question"),("어디 갔어요?","어디","Where did you go?","past")]),
 ("saan","sa-AN","where (nasaan = where is)",[("Saan ka pupunta?","Saan","Where are you going?","future"),("Nasaan ang banyo?","Nasaan","Where is the bathroom?","question")]))
add("what","what",("뭐","mwo","what (casual of 무엇)",[("이게 뭐예요?","뭐","What is this?","question"),("뭐 먹었어요?","뭐","What did you eat?","past")]),
 ("ano","a-NO","what",[("Ano ito?","Ano","What is this?","question"),("Ano ang kinain mo?","Ano","What did you eat?","past")]))
add("yes","yes",("네","ne","yes (polite)",[("네, 알겠어요.","네","Yes, I understand.","polite"),("네, 맞아요.","네","Yes, that's right.","polite")]),
 ("oo","O-o","yes (opo = polite)",[("Oo, sige.","Oo","Yes, okay.","present"),("Opo, kumain na po ako.","Opo","Yes, I've eaten (polite).","polite")]))
add("no","no / not",("아니요","aniyo","no (polite)",[("아니요, 괜찮아요.","아니요","No, I'm okay.","polite"),("아니요, 안 먹었어요.","아니요","No, I didn't eat.","past")]),
 ("hindi","hin-DI","no; not",[("Hindi, salamat.","Hindi","No, thank you.","present"),("Hindi ako kumain.","Hindi","I didn't eat.","past")]))
add("thank-you","thank you",("감사합니다","gamsahamnida","thank you (polite)",[("도와줘서 감사합니다.","감사합니다","Thank you for helping.","polite"),("고마워요!","고마워요","Thanks! (friendly)","casual")]),
 ("salamat","sa-LA-mat","thank you",[("Salamat sa tulong mo.","Salamat","Thanks for your help.","present"),("Maraming salamat po.","salamat","Thank you very much (polite).","polite")]))
add("hello","hello",("안녕하세요","annyeonghaseyo","hello (polite)",[("안녕하세요, 반가워요!","안녕하세요","Hello, nice to meet you!","polite"),("안녕!","안녕","Hi! (casual)","casual")]),
 ("kumusta","ku-mus-TA","hello; how are you",[("Kumusta ka?","Kumusta","How are you?","question"),("Kumusta po kayo?","Kumusta","How are you? (polite)","polite")]))
add("sorry","sorry",("미안하다","mianhada","sorry",[("미안해요.","미안해요","I'm sorry.","polite"),("늦어서 죄송합니다.","죄송합니다","Sorry I'm late. (formal)","formal")]),
 ("pasensya","pa-SEN-sha","sorry; patience",[("Pasensya na.","Pasensya","Sorry about that.","present"),("Pasensya na po, nahuli ako.","Pasensya","Sorry, I was late (polite).","past")]))
add("okay","it's okay",("괜찮다","gwaenchanta","okay; fine",[("괜찮아요?","괜찮아요","Are you okay?","question"),("괜찮았어요.","괜찮았어요","It was okay.","past")]),
 ("ayos","A-yos","okay; fine (ayos lang)",[("Ayos lang ako.","Ayos","I'm okay.","present"),("Ayos ka lang ba?","Ayos","Are you okay?","question")]))
add("money","money",("돈","don","money",[("돈이 없어요.","돈","I have no money.","present"),("돈을 다 썼어요.","돈","I spent all the money.","past")]),
 ("pera","PE-ra","money",[("Wala akong pera.","pera","I have no money.","present"),("Naubos ang pera ko.","pera","My money ran out.","past")]))
add("phone","phone",("전화","jeonhwa","phone call; phone",[("전화해 주세요.","전화","Please call me.","polite"),("엄마한테 전화했어요.","전화","I called Mom.","past")]),
 ("tawag","TA-wag","call (tumawag)",[("Tawagan mo ako.","Tawagan","Call me.","command"),("Tumawag ako kay Nanay.","Tumawag","I called Mom.","past"),("Tatawag ako mamaya.","Tatawag","I'll call later.","future")]))
add("car","car",("차","cha","car (also: tea)",[("차가 막혀요.","차","Traffic is jammed.","present"),("새 차를 샀어요.","차","I bought a new car.","past")]),
 ("kotse","KOT-se","car",[("Bago ang kotse niya.","kotse","His car is new.","present"),("Sumakay kami sa kotse.","kotse","We rode in the car.","past")]))
add("weather","weather",("날씨","nalssi","weather",[("오늘 날씨 어때요?","날씨","How's the weather today?","question"),("날씨가 좋았어요.","날씨","The weather was nice.","past")]),
 ("panahon","pa-na-HON","weather; time/season",[("Maganda ang panahon ngayon.","panahon","The weather is nice today.","present"),("Uulan daw bukas.","Uulan","They say it'll rain tomorrow.","future")]))
P_ = P
out=[]
for i,en,ko,tl in P_:
    def w(t,lang):
        word,rom,d,ex=t
        R=ro_ko if lang=='ko' else ro_tl
        if lang=='ko': rom=R(word)
        exs=[]
        for text,hl,e,tense in ex:
            assert hl in text,(i,text,hl)
            exs.append({"text":text,"romanization":R(text),"highlight":hl,"en":e,"tense":tense})
        return {"word":word,"romanization":rom,"definition":d,"examples":exs}
    out.append({"id":i,"english":en,"korean":w(ko,"ko"),"tagalog":w(tl,"tl")})
ids=[o["id"] for o in out]; assert len(ids)==len(set(ids))
Path(__file__).resolve().parent.parent.joinpath("data/pairs.json").write_text(json.dumps(out,ensure_ascii=False,indent=1)+"\n",encoding="utf-8")
print(len(out),"pairs")
