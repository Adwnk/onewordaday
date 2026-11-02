"""Source of truth: everyday verbs with one-to-one KO/TL example sentences.
V(id, english, ko_word, ko_def, tl_word, tl_stress_guide, tl_def, [S(...)])
S(english, tense, ko_text, ko_highlight, ko_vocab, tl_text, tl_highlight, tl_vocab)
vocab string: "surface[>base]=english/pos; ..."  (pos: n, adj, adv, pron, num)
surface must appear in the sentence; base defaults to surface."""
VERBS = []
def S(*a): return a
def V(*a): VERBS.append(a)

V("eat","to eat","먹다","to eat","kumain","ku-ma-IN","to eat",[
 S("Did you eat yet?","past","밥 먹었어요?","먹었어요","밥=rice; meal/n","Kumain ka na ba?","Kumain",""),
 S("Let's eat together later.","future","이따가 같이 먹어요.","먹어요","이따가=later/adv; 같이=together/adv","Kain tayo mamaya.","Kain","mamaya=later/adv"),
 S("I'm eating lunch right now.","present","지금 점심 먹고 있어요.","먹고 있어요","지금=now/adv; 점심=lunch/n","Kumakain ako ng tanghalian ngayon.","Kumakain","tanghalian=lunch/n; ngayon=now; today/adv")])
V("drink","to drink","마시다","to drink","uminom","u-mi-NOM","to drink",[
 S("Do you want something to drink?","question","뭐 마실래요?","마실래요","뭐=what/pron","Ano ang gusto mong inumin?","inumin","gusto=want; like/adj"),
 S("I drank too much coffee today.","past","오늘 커피를 너무 많이 마셨어요.","마셨어요","오늘=today/n; 커피를>커피=coffee/n; 너무=so; too/adv","Sobra akong uminom ng kape ngayon.","uminom","sobra=too much/adv; kape=coffee/n")])
V("go","to go","가다","to go","pumunta","pu-mun-TA","to go",[
 S("Where are you going?","question","어디 가요?","가요","어디=where/pron","Saan ka pupunta?","pupunta","saan=where/pron"),
 S("I went to the market this morning.","past","아침에 시장에 갔어요.","갔어요","아침에>아침=morning/n; 시장에>시장=market/n","Pumunta ako sa palengke kaninang umaga.","Pumunta","palengke=market/n; umaga=morning/n")])
V("arrive","to arrive","도착하다","to arrive","dumating","du-ma-TING","to arrive; to come",[
 S("I just arrived.","past","방금 도착했어요.","도착했어요","방금=just now/adv","Kararating ko lang.","Kararating",""),
 S("What time will you arrive?","question","몇 시에 도착해요?","도착해요","시에>시=o'clock; hour/n","Anong oras ka darating?","darating","oras=time; hour/n")])
V("sleep","to sleep","자다","to sleep","matulog","ma-tu-LOG","to sleep",[
 S("Go to sleep already.","command","이제 자요.","자요","이제=now (already)/adv","Matulog ka na.","Matulog",""),
 S("I couldn't sleep last night.","past","어젯밤에 못 잤어요.","잤어요","어젯밤에>어젯밤=last night/n","Hindi ako nakatulog kagabi.","nakatulog","kagabi=last night/adv")])
V("wake-up","to wake up","일어나다","to get up; wake up","gumising","gu-mi-SING","to wake up",[
 S("I woke up late today.","past","오늘 늦게 일어났어요.","일어났어요","늦게=late/adv","Late akong gumising ngayon.","gumising","late=late/adv"),
 S("Wake up, it's already 7.","command","일어나요, 벌써 일곱 시예요.","일어나요","벌써=already/adv; 일곱=seven/num","Gising na, alas-siyete na.","Gising","alas-siyete=seven o'clock/n")])
V("watch","to watch","보다","to see; to watch","manood","ma-no-OD","to watch",[
 S("Want to watch a movie tonight?","question","오늘 밤에 영화 볼래요?","볼래요","밤에>밤=night/n; 영화=movie/n","Gusto mo bang manood ng sine mamayang gabi?","manood","sine=movie; cinema/n; gabi=night; evening/n"),
 S("I'm watching a drama.","present","드라마 보고 있어요.","보고 있어요","드라마=drama (TV)/n","Nanonood ako ng drama.","Nanonood","drama=drama (TV)/n")])
V("meet","to meet","만나다","to meet","magkita","mag-ki-TA","to meet (each other)",[
 S("Let's meet tomorrow.","future","내일 만나요.","만나요","내일=tomorrow/n","Magkita tayo bukas.","Magkita","bukas=tomorrow/adv"),
 S("I met my friend at the café.","past","카페에서 친구를 만났어요.","만났어요","카페에서>카페=café/n; 친구를>친구=friend/n","Nagkita kami ng kaibigan ko sa kapehan.","Nagkita","kaibigan=friend/n; kapehan=café/n")])
V("buy","to buy","사다","to buy","bumili","bu-mi-LI","to buy",[
 S("I bought new shoes.","past","새 신발을 샀어요.","샀어요","새=new/adj; 신발을>신발=shoes/n","Bumili ako ng bagong sapatos.","Bumili","bagong>bago=new/adj; sapatos=shoes/n"),
 S("What should we buy for dinner?","question","저녁으로 뭐 살까요?","살까요","저녁으로>저녁=dinner; evening/n","Ano ang bibilhin natin para sa hapunan?","bibilhin","hapunan=dinner/n")])
V("sell","to sell","팔다","to sell","magbenta","mag-ben-TA","to sell",[
 S("Do you sell water here?","question","여기 물 팔아요?","팔아요","여기=here/pron; 물=water/n","Nagbebenta ba kayo ng tubig dito?","Nagbebenta","tubig=water/n; dito=here/adv"),
 S("My favorite bread is already sold out.","past","제가 좋아하는 빵 벌써 다 팔렸어요.","팔렸어요","빵=bread/n; 다=all/adv","Naibenta na nila ang paborito kong tinapay.","Naibenta","paborito=favorite/adj; tinapay=bread/n")])
V("pay","to pay","내다","to pay; hand in","magbayad","mag-ba-YAD","to pay",[
 S("I'll pay this time.","future","이번에는 제가 낼게요.","낼게요","이번에는>이번=this time/n","Ako na ang magbabayad ngayon.","magbabayad",""),
 S("Did you pay the electric bill?","past","전기세 냈어요?","냈어요","전기세=electric bill/n","Nagbayad ka na ba ng kuryente?","Nagbayad","kuryente=electricity/n")])
V("read","to read","읽다","to read","magbasa","mag-ba-SA","to read",[
 S("I read a little before bed.","present","자기 전에 조금 읽어요.","읽어요","전에>전=before/n; 조금=a little/adv","Nagbabasa ako nang kaunti bago matulog.","Nagbabasa","kaunti=a little/adv; bago=before/adv"),
 S("Did you read my message?","past","제 메시지 읽었어요?","읽었어요","메시지=message/n","Nabasa mo ba ang mensahe ko?","Nabasa","mensahe=message/n")])
V("write","to write","쓰다","to write; to use","sumulat","su-mu-LAT","to write",[
 S("Write your name here.","command","여기에 이름을 쓰세요.","쓰세요","이름을>이름=name/n","Isulat mo ang pangalan mo dito.","Isulat","pangalan=name/n"),
 S("I wrote a letter to Mom.","past","엄마한테 편지를 썼어요.","썼어요","엄마한테>엄마=mom/n; 편지를>편지=letter/n","Sumulat ako ng liham kay Nanay.","Sumulat","liham=letter/n; Nanay=mom/n")])
V("speak","to speak","말하다","to speak; to say","magsalita","mag-sa-li-TA","to speak",[
 S("Please speak a little slower.","polite","좀 더 천천히 말해 주세요.","말해","천천히=slowly/adv","Pakisalita nang mas mabagal.","Pakisalita","mabagal=slow/adj"),
 S("She talks too fast.","present","그 사람은 너무 빨리 말해요.","말해요","너무=so; too/adv; 빨리=fast/adv","Masyado siyang mabilis magsalita.","magsalita","mabilis=fast/adj")])
V("listen","to listen","듣다","to listen; to hear","makinig","ma-ki-NIG","to listen",[
 S("Listen to me.","command","내 말 들어 봐요.","들어","말=words; what one says/n","Makinig ka sa akin.","Makinig",""),
 S("I listen to music on the bus.","present","버스에서 음악을 들어요.","들어요","버스에서>버스=bus/n; 음악을>음악=music/n","Nakikinig ako ng musika sa bus.","Nakikinig","musika=music/n; bus=bus/n")])
V("ask","to ask","물어보다","to ask","magtanong","mag-ta-NONG","to ask",[
 S("Can I ask you something?","question","하나 물어봐도 돼요?","물어봐도","하나=one (thing)/num","Puwede ba akong magtanong?","magtanong","puwede=can; may/adv"),
 S("I asked the teacher.","past","선생님한테 물어봤어요.","물어봤어요","선생님한테>선생님=teacher/n","Nagtanong ako sa guro.","Nagtanong","guro=teacher/n")])
V("answer","to answer","대답하다","to answer; to reply","sumagot","su-ma-GOT","to answer",[
 S("Why didn't you answer?","question","왜 대답 안 했어요?","대답","왜=why/adv","Bakit hindi ka sumagot?","sumagot","bakit=why/adv"),
 S("Answer me honestly.","polite","솔직하게 대답해 주세요.","대답해","솔직하게=honestly/adv","Sumagot ka nang tapat.","Sumagot","tapat=honest/adj")])
V("know","to know","알다","to know","malaman","ma-la-MAN","to know; find out (alam)",[
 S("I know that place.","present","거기 알아요.","알아요","거기=there/pron","Alam ko ang lugar na iyon.","Alam","lugar=place/n"),
 S("I didn't know that.","negative","그건 몰랐어요.","몰랐어요","","Hindi ko alam iyon.","alam","")])
V("forget","to forget","잊어버리다","to forget","makalimutan","ma-ka-li-mu-TAN","to forget",[
 S("I forgot my wallet.","past","지갑을 잊어버렸어요.","잊어버렸어요","지갑을>지갑=wallet/n","Nakalimutan ko ang pitaka ko.","Nakalimutan","pitaka=wallet/n"),
 S("Don't forget to call me.","command","전화하는 거 잊지 마세요.","잊지 마세요","","Huwag mong kalimutang tumawag sa akin.","kalimutang","")])
V("remember","to remember","기억하다","to remember","maalala","ma-a-la-LA","to remember",[
 S("Do you remember me?","question","저 기억해요?","기억해요","저=me (polite)/pron","Naaalala mo pa ba ako?","Naaalala",""),
 S("I remembered his name.","past","그 사람 이름이 기억났어요.","기억났어요","이름이>이름=name/n","Naalala ko ang pangalan niya.","Naalala","pangalan=name/n")])
V("understand","to understand","이해하다","to understand","maintindihan","ma-in-tin-di-HAN","to understand",[
 S("I don't understand.","negative","이해가 안 돼요.","이해가","","Hindi ko maintindihan.","maintindihan",""),
 S("Did you understand?","question","이해했어요?","이해했어요","","Naintindihan mo ba?","Naintindihan","")])
V("learn","to learn","배우다","to learn","matuto","ma-tu-TO","to learn",[
 S("I'm learning Korean.","present","한국어를 배우고 있어요.","배우고 있어요","한국어를>한국어=Korean (language)/n","Natututo ako ng Korean.","Natututo",""),
 S("Where did you learn to cook?","question","요리는 어디서 배웠어요?","배웠어요","요리는>요리=cooking; dish/n; 어디서=where (at)/pron","Saan ka natutong magluto?","natutong","saan=where/pron")])
V("teach","to teach","가르치다","to teach","magturo","mag-tu-RO","to teach",[
 S("Can you teach me?","question","가르쳐 줄 수 있어요?","가르쳐","","Puwede mo ba akong turuan?","turuan","puwede=can; may/adv"),
 S("My wife teaches me Tagalog.","present","아내가 타갈로그어를 가르쳐 줘요.","가르쳐","아내가>아내=wife/n","Tinuturuan ako ng asawa ko ng Tagalog.","Tinuturuan","asawa=spouse; wife/n")])
V("study","to study","공부하다","to study","mag-aral","mag-A-ral","to study",[
 S("I study every night.","present","매일 밤 공부해요.","공부해요","매일=every day/adv; 밤=night/n","Nag-aaral ako tuwing gabi.","Nag-aaral","tuwing=every/adv; gabi=night; evening/n"),
 S("Let's study together.","future","같이 공부해요.","공부해요","같이=together/adv","Sabay tayong mag-aral.","mag-aral","sabay=together/adv")])
V("work","to work","일하다","to work","magtrabaho","mag-tra-BA-ho","to work",[
 S("I work until six today.","present","오늘 여섯 시까지 일해요.","일해요","오늘=today/n; 여섯=six/num","Magtatrabaho ako hanggang alas-sais ngayon.","Magtatrabaho","hanggang=until/adv"),
 S("Did you work late again?","question","또 늦게까지 일했어요?","일했어요","또=again/adv; 늦게=late/adv","Nagtrabaho ka na naman hanggang gabi?","Nagtrabaho","gabi=night; evening/n")])
V("rest","to rest","쉬다","to rest","magpahinga","mag-pa-hi-NGA","to rest",[
 S("Rest a little.","command","좀 쉬세요.","쉬세요","좀=a little; please/adv","Magpahinga ka muna.","Magpahinga","muna=first; for now/adv"),
 S("I rested all weekend.","past","주말 내내 쉬었어요.","쉬었어요","주말=weekend/n; 내내=throughout/adv","Nagpahinga ako buong weekend.","Nagpahinga","buong>buo=whole/adj")])
V("cook","to cook","요리하다","to cook","magluto","mag-lu-TO","to cook",[
 S("I'll cook tonight.","future","오늘 저녁은 제가 요리할게요.","요리할게요","저녁은>저녁=dinner; evening/n","Ako ang magluluto mamayang gabi.","magluluto","gabi=night; evening/n"),
 S("What are you cooking? It smells good.","question","뭐 요리해요? 냄새 좋아요.","요리해요","냄새=smell/n; 좋아요>좋다=good/adj","Ano ang niluluto mo? Ang bango.","niluluto","bango=fragrant/adj")])
V("wash","to wash","씻다","to wash (body, food)","maghugas","mag-hu-GAS","to wash",[
 S("Wash your hands first.","command","먼저 손 씻어요.","씻어요","먼저=first/adv; 손=hand/n","Maghugas ka muna ng kamay.","Maghugas","kamay=hand/n; muna=first; for now/adv"),
 S("I'll wash the dishes.","future","설거지는 제가 할게요.","할게요","설거지는>설거지=dishwashing/n","Ako na ang maghuhugas ng pinggan.","maghuhugas","pinggan=dishes; plate/n")])
V("clean","to clean","청소하다","to clean","maglinis","mag-li-NIS","to clean",[
 S("Let's clean the house this weekend.","future","이번 주말에 집 청소해요.","청소해요","주말에>주말=weekend/n; 집=house; home/n","Maglinis tayo ng bahay ngayong weekend.","Maglinis","bahay=house/n"),
 S("I already cleaned my room.","past","방 벌써 청소했어요.","청소했어요","방=room/n; 벌써=already/adv","Nilinis ko na ang kuwarto ko.","Nilinis","kuwarto=room/n")])
V("wait","to wait","기다리다","to wait","maghintay","mag-hin-TAY","to wait",[
 S("Wait a second.","command","잠깐만 기다려요.","기다려요","잠깐만>잠깐=a moment/adv","Sandali lang, hintay ka.","hintay","sandali=a moment/n"),
 S("I waited for 30 minutes.","past","삼십 분 기다렸어요.","기다렸어요","분=minute/n","Naghintay ako ng tatlumpung minuto.","Naghintay","minuto=minute/n")])
V("help","to help","돕다","to help","tumulong","tu-mu-LONG","to help",[
 S("Can you help me with this?","question","이거 좀 도와줄래요?","도와줄래요","이거=this (thing)/pron","Puwede mo ba akong tulungan dito?","tulungan","dito=here/adv"),
 S("Thanks for helping me.","polite","도와줘서 고마워요.","도와줘서","고마워요>고맙다=thankful/adj","Salamat sa pagtulong mo.","pagtulong","salamat=thanks/n")])
V("call","to call","전화하다","to call (phone)","tumawag","tu-ma-WAG","to call",[
 S("I'll call you later.","future","이따가 전화할게요.","전화할게요","이따가=later/adv","Tatawagan kita mamaya.","Tatawagan","mamaya=later/adv"),
 S("Mom called this morning.","past","아침에 엄마가 전화했어요.","전화했어요","아침에>아침=morning/n; 엄마가>엄마=mom/n","Tumawag si Nanay kaninang umaga.","Tumawag","Nanay=mom/n; umaga=morning/n")])
V("open","to open","열다","to open","buksan","buk-SAN","to open",[
 S("Can you open the window?","question","창문 좀 열어 줄래요?","열어","창문=window/n","Pakibuksan ang bintana.","Pakibuksan","bintana=window/n"),
 S("The store opens at ten.","present","가게는 열 시에 열어요.","열어요","가게는>가게=store/n","Nagbubukas ang tindahan nang alas-diyes.","Nagbubukas","tindahan=store/n")])
V("close","to close","닫다","to close","isara","i-sa-RA","to close",[
 S("Close the door, please.","polite","문 좀 닫아 주세요.","닫아","문=door/n","Pakisara ang pinto.","Pakisara","pinto=door/n"),
 S("The bank is already closed.","past","은행이 벌써 닫았어요.","닫았어요","은행이>은행=bank/n; 벌써=already/adv","Sarado na ang bangko.","Sarado","bangko=bank/n")])
V("give","to give","주다","to give","magbigay","mag-bi-GAY","to give",[
 S("Give me a minute.","polite","잠깐만 시간 주세요.","주세요","시간=time/n","Bigyan mo ako ng isang minuto.","Bigyan","minuto=minute/n"),
 S("I gave my girlfriend flowers.","past","여자친구한테 꽃을 줬어요.","줬어요","여자친구한테>여자친구=girlfriend/n; 꽃을>꽃=flower/n","Binigyan ko ng bulaklak ang girlfriend ko.","Binigyan","bulaklak=flower/n; girlfriend=girlfriend/n")])
V("receive","to receive","받다","to receive; to get","tumanggap","tu-mang-GAP","to receive",[
 S("Did you get my package?","question","제 택배 받았어요?","받았어요","택배=package/n","Natanggap mo ba ang package ko?","Natanggap","package=package/n"),
 S("I got a gift from my friend.","past","친구한테서 선물을 받았어요.","받았어요","친구한테서>친구=friend/n; 선물을>선물=gift/n","Nakatanggap ako ng regalo mula sa kaibigan ko.","Nakatanggap","regalo=gift/n; kaibigan=friend/n")])
V("bring","to bring","가져오다","to bring","magdala","mag-da-LA","to bring",[
 S("Bring an umbrella.","command","우산 가져오세요.","가져오세요","우산=umbrella/n","Magdala ka ng payong.","Magdala","payong=umbrella/n"),
 S("I brought snacks.","past","과자 가져왔어요.","가져왔어요","과자=snack/n","Nagdala ako ng meryenda.","Nagdala","meryenda=snack/n")])
V("put","to put","놓다","to put; to place","ilagay","i-la-GAY","to put",[
 S("Put it on the table.","command","테이블 위에 놓으세요.","놓으세요","테이블=table/n; 위에>위=on top/n","Ilagay mo sa mesa.","Ilagay","mesa=table/n"),
 S("Where did you put my keys?","question","제 열쇠 어디에 놨어요?","놨어요","열쇠=key/n","Saan mo inilagay ang susi ko?","inilagay","susi=key/n")])
V("look-for","to look for","찾다","to look for; to find","maghanap","mag-ha-NAP","to look for",[
 S("What are you looking for?","question","뭐 찾아요?","찾아요","뭐=what/pron","Ano ang hinahanap mo?","hinahanap",""),
 S("I found my phone.","past","핸드폰 찾았어요.","찾았어요","핸드폰=cell phone/n","Nahanap ko na ang cellphone ko.","Nahanap","cellphone=cell phone/n")])
V("lose","to lose","잃어버리다","to lose (an item)","mawala","ma-wa-LA","to get lost; to lose",[
 S("I lost my umbrella again.","past","우산을 또 잃어버렸어요.","잃어버렸어요","우산을>우산=umbrella/n; 또=again/adv","Nawala na naman ang payong ko.","Nawala","payong=umbrella/n"),
 S("Don't lose your ticket.","command","표 잃어버리지 마세요.","잃어버리지","표=ticket/n","Huwag mong iwawala ang tiket mo.","iwawala","tiket=ticket/n")])
V("use","to use","사용하다","to use","gumamit","gu-ma-MIT","to use",[
 S("Can I use your charger?","question","충전기 써도 돼요?","써도","충전기=charger/n","Puwede bang gamitin ang charger mo?","gamitin","charger=charger/n"),
 S("I use this app every day.","present","이 앱을 매일 사용해요.","사용해요","앱을>앱=app/n; 매일=every day/adv","Ginagamit ko ang app na ito araw-araw.","Ginagamit","araw-araw=every day/adv")])
V("make","to make","만들다","to make","gumawa","gu-ma-WA","to make; to do",[
 S("I made kimchi fried rice.","past","김치볶음밥 만들었어요.","만들었어요","김치볶음밥=kimchi fried rice/n","Gumawa ako ng kimchi fried rice.","Gumawa",""),
 S("What are you making?","question","뭐 만들어요?","만들어요","","Ano ang ginagawa mo?","ginagawa","")])
V("play","to play","놀다","to play; hang out","maglaro","mag-la-RO","to play",[
 S("The kids are playing outside.","present","아이들이 밖에서 놀아요.","놀아요","아이들이>아이=child/n; 밖에서>밖=outside/n","Naglalaro ang mga bata sa labas.","Naglalaro","bata=child/n; labas=outside/n"),
 S("Let's hang out this weekend.","future","이번 주말에 놀아요.","놀아요","주말에>주말=weekend/n","Gala tayo ngayong weekend.","Gala","")])
V("walk","to walk","걷다","to walk","maglakad","mag-la-KAD","to walk",[
 S("Let's walk home.","future","집까지 걸어가요.","걸어가요","집까지>집=house; home/n","Maglakad tayo pauwi.","Maglakad","pauwi=homeward/adv"),
 S("I walked a lot today.","past","오늘 많이 걸었어요.","걸었어요","많이=a lot/adv","Marami akong nilakad ngayon.","nilakad","marami=a lot; many/adj")])
V("run","to run","뛰다","to run","tumakbo","tu-mak-BO","to run",[
 S("Run, the bus is coming!","command","뛰어요, 버스 와요!","뛰어요","버스=bus/n","Takbo, parating na ang bus!","Takbo","bus=bus/n"),
 S("I run in the morning.","present","아침에 뛰어요.","뛰어요","아침에>아침=morning/n","Tumatakbo ako tuwing umaga.","Tumatakbo","umaga=morning/n; tuwing=every/adv")])
V("sit","to sit","앉다","to sit","umupo","u-mu-PO","to sit",[
 S("Sit here.","command","여기 앉으세요.","앉으세요","여기=here/pron","Umupo ka rito.","Umupo",""),
 S("Can I sit next to you?","question","옆에 앉아도 돼요?","앉아도","옆에>옆=side; next to/n","Puwede ba akong umupo sa tabi mo?","umupo","tabi=side; next to/n")])
V("stand","to stand","서다","to stand","tumayo","tu-ma-YO","to stand up",[
 S("Please stand up.","polite","일어서 주세요.","일어서","","Tumayo po kayo.","Tumayo",""),
 S("I stood the whole time on the train.","past","지하철에서 계속 서 있었어요.","서 있었어요","지하철에서>지하철=subway/n; 계속=the whole time/adv","Nakatayo ako buong biyahe sa tren.","Nakatayo","tren=train/n; biyahe=trip/n")])
V("ride","to ride","타다","to ride; to get on","sumakay","su-ma-KAY","to ride",[
 S("Let's take a taxi.","future","택시 타요.","타요","택시=taxi/n","Mag-taxi tayo.","Mag-taxi",""),
 S("I got on the wrong bus.","past","버스를 잘못 탔어요.","탔어요","버스를>버스=bus/n; 잘못=wrongly/adv","Mali ang nasakyan kong bus.","nasakyan","mali=wrong/adj")])
V("drive","to drive","운전하다","to drive","magmaneho","mag-ma-NE-ho","to drive",[
 S("Can you drive?","question","운전할 수 있어요?","운전할","","Marunong ka bang magmaneho?","magmaneho","marunong=knows how/adj"),
 S("Drive safely.","command","조심히 운전하세요.","운전하세요","조심히=carefully/adv","Mag-ingat ka sa pagmamaneho.","pagmamaneho","")])
V("live","to live","살다","to live","tumira","tu-mi-RA","to live (reside)",[
 S("Where do you live?","question","어디 살아요?","살아요","어디=where/pron","Saan ka nakatira?","nakatira","saan=where/pron"),
 S("We lived in Seoul for two years.","past","서울에서 이 년 살았어요.","살았어요","년=year/n","Tumira kami sa Seoul nang dalawang taon.","Tumira","taon=year/n")])
V("love","to love","사랑하다","to love","magmahal","mag-ma-HAL","to love",[
 S("I love you.","present","사랑해요.","사랑해요","","Mahal kita.","Mahal",""),
 S("I love my family so much.","present","우리 가족을 너무 사랑해요.","사랑해요","가족을>가족=family/n; 너무=so; too/adv","Mahal na mahal ko ang pamilya ko.","Mahal","pamilya=family/n")])
V("like","to like","좋아하다","to like","magustuhan","ma-gus-tu-HAN","to like",[
 S("I really like this song.","present","이 노래 정말 좋아해요.","좋아해요","노래=song/n; 정말=really/adv","Gustong-gusto ko ang kantang ito.","Gustong-gusto","kanta=song/n"),
 S("Did you like the food?","question","음식 마음에 들었어요?","들었어요","음식=food/n","Nagustuhan mo ba ang pagkain?","Nagustuhan","pagkain=food/n")])
V("cry","to cry","울다","to cry","umiyak","u-mi-YAK","to cry",[
 S("Why are you crying?","question","왜 울어요?","울어요","왜=why/adv","Bakit ka umiiyak?","umiiyak","bakit=why/adv"),
 S("I cried watching that movie.","past","그 영화 보고 울었어요.","울었어요","영화=movie/n","Umiyak ako sa pelikulang iyon.","Umiyak","pelikula=movie/n")])
V("laugh","to laugh","웃다","to laugh; to smile","tumawa","tu-ma-WA","to laugh",[
 S("Don't laugh!","command","웃지 마요!","웃지","","Huwag kang tumawa!","tumawa",""),
 S("We laughed a lot tonight.","past","오늘 밤 많이 웃었어요.","웃었어요","밤=night/n; 많이=a lot/adv","Ang dami naming tawa ngayong gabi.","tawa","dami=amount; many/n")])
V("sing","to sing","노래하다","to sing","kumanta","ku-man-TA","to sing",[
 S("Sing one song for us.","command","노래 한 곡 불러 줘요.","불러","노래=song/n; 곡=(song) counter/n","Kumanta ka naman ng isang kanta.","Kumanta","kanta=song/n"),
 S("We sang karaoke all night.","past","밤새 노래방에서 노래했어요.","노래했어요","밤새=all night/adv; 노래방에서>노래방=karaoke room/n","Nag-videoke kami buong gabi.","Nag-videoke","gabi=night; evening/n")])
V("dance","to dance","춤추다","to dance","sumayaw","su-ma-YAW","to dance",[
 S("Let's dance!","future","춤춰요!","춤춰요","","Sayaw tayo!","Sayaw",""),
 S("She dances really well.","present","그 사람은 춤을 정말 잘 춰요.","춰요","춤을>춤=dance/n; 잘=well/adv","Magaling siyang sumayaw.","sumayaw","magaling=good at; skilled/adj")])
V("swim","to swim","수영하다","to swim","lumangoy","lu-ma-NGOY","to swim",[
 S("Can you swim?","question","수영할 수 있어요?","수영할","","Marunong ka bang lumangoy?","lumangoy","marunong=knows how/adj"),
 S("We swam at the beach.","past","바다에서 수영했어요.","수영했어요","바다에서>바다=sea; beach/n","Lumangoy kami sa dagat.","Lumangoy","dagat=sea/n")])
V("shower","to shower","샤워하다","to shower","maligo","ma-li-GO","to bathe; shower",[
 S("I'm going to shower first.","future","먼저 샤워할게요.","샤워할게요","먼저=first/adv","Maliligo muna ako.","Maliligo","muna=first; for now/adv"),
 S("Did you shower already?","question","샤워했어요?","샤워했어요","","Naligo ka na ba?","Naligo","")])
V("wear","to wear","입다","to wear (clothes)","magsuot","mag-su-OT","to wear",[
 S("Wear a jacket, it's cold.","command","추우니까 재킷 입어요.","입어요","재킷=jacket/n","Magsuot ka ng jacket, malamig.","Magsuot","malamig=cold/adj"),
 S("What are you wearing tomorrow?","question","내일 뭐 입을 거예요?","입을 거예요","내일=tomorrow/n","Ano ang isusuot mo bukas?","isusuot","bukas=tomorrow/adv")])
V("start","to start","시작하다","to start","magsimula","mag-si-mu-LA","to start",[
 S("The movie starts at eight.","present","영화가 여덟 시에 시작해요.","시작해요","영화가>영화=movie/n","Magsisimula ang pelikula nang alas-otso.","Magsisimula","pelikula=movie/n"),
 S("Let's start now.","future","지금 시작해요.","시작해요","지금=now/adv","Magsimula na tayo.","Magsimula","")])
V("finish","to finish","끝나다","to end; be over","matapos","ma-ta-POS","to finish",[
 S("When does work finish?","question","일 언제 끝나요?","끝나요","일=work/n; 언제=when/adv","Kailan matatapos ang trabaho mo?","matatapos","kailan=when/adv; trabaho=work; job/n"),
 S("I finished my homework.","past","숙제 다 끝냈어요.","끝냈어요","숙제=homework/n","Tapos na ang assignment ko.","Tapos","")])
V("decide","to decide","결정하다","to decide","magpasya","mag-pas-YA","to decide",[
 S("Did you decide?","question","결정했어요?","결정했어요","","Nakapagpasya ka na ba?","Nakapagpasya",""),
 S("You decide, honey.","command","자기가 결정해요.","결정해요","자기=honey (couples)/pron","Ikaw na ang magpasya, mahal.","magpasya","mahal=love; dear/n")])
V("think","to think","생각하다","to think","mag-isip","mag-I-sip","to think",[
 S("What do you think?","question","어떻게 생각해요?","생각해요","어떻게=how/adv","Ano sa tingin mo?","tingin",""),
 S("Let me think about it.","polite","생각해 볼게요.","생각해","","Pag-iisipan ko muna.","Pag-iisipan","muna=first; for now/adv")])
V("believe","to believe","믿다","to believe; to trust","maniwala","ma-ni-wa-LA","to believe",[
 S("I can't believe it!","negative","믿을 수 없어요!","믿을","","Hindi ako makapaniwala!","makapaniwala",""),
 S("Trust me.","polite","저 믿어 주세요.","믿어","","Maniwala ka sa akin.","Maniwala","")])
V("worry","to worry","걱정하다","to worry","mag-alala","mag-a-la-LA","to worry",[
 S("Don't worry.","command","걱정하지 마세요.","걱정하지","","Huwag kang mag-alala.","mag-alala",""),
 S("I was worried about you.","past","많이 걱정했어요.","걱정했어요","많이=a lot/adv","Nag-alala ako sa iyo.","Nag-alala","")])
V("hurt","to hurt","아프다","to hurt; be sick","sumakit","su-ma-KIT","to hurt; to ache",[
 S("My head hurts.","present","머리가 아파요.","아파요","머리가>머리=head/n","Masakit ang ulo ko.","Masakit","ulo=head/n"),
 S("Where does it hurt?","question","어디가 아파요?","아파요","어디가>어디=where/pron","Saan masakit?","masakit","saan=where/pron")])
V("travel","to travel","여행하다","to travel","maglakbay","mag-lak-BAY","to travel",[
 S("I want to travel to Korea.","present","한국으로 여행하고 싶어요.","여행하고","한국으로>한국=Korea/n","Gusto kong magbiyahe sa Korea.","magbiyahe","gusto=want; like/adj"),
 S("We traveled to Cebu last year.","past","작년에 세부로 여행했어요.","여행했어요","작년에>작년=last year/n","Nagbiyahe kami sa Cebu noong isang taon.","Nagbiyahe","taon=year/n")])
V("move","to move (house)","이사하다","to move (house)","lumipat","lu-mi-PAT","to move; transfer",[
 S("We're moving next month.","future","다음 달에 이사해요.","이사해요","다음=next/adj; 달에>달=month/n","Lilipat kami sa susunod na buwan.","Lilipat","susunod=next/adj; buwan=month/n"),
 S("When did you move?","question","언제 이사했어요?","이사했어요","언제=when/adv","Kailan kayo lumipat?","lumipat","kailan=when/adv")])
V("leave","to leave","떠나다","to leave; depart","umalis","u-ma-LIS","to leave",[
 S("I'm leaving now.","present","저 이제 가요.","가요","이제=now (already)/adv","Aalis na ako.","Aalis",""),
 S("The bus already left.","past","버스가 벌써 떠났어요.","떠났어요","버스가>버스=bus/n; 벌써=already/adv","Umalis na ang bus.","Umalis","bus=bus/n")])
V("go-home","to go home","집에 가다","to go home","umuwi","u-mu-WI","to go home",[
 S("What time are you coming home?","question","몇 시에 집에 와요?","와요","집에>집=house; home/n","Anong oras ka uuwi?","uuwi","oras=time; hour/n"),
 S("I got home late.","past","늦게 집에 들어왔어요.","들어왔어요","늦게=late/adv","Gabi na akong umuwi.","umuwi","gabi=night; evening/n")])
V("enter","to enter","들어가다","to go in; enter","pumasok","pu-ma-SOK","to enter; go in",[
 S("Come in.","command","들어오세요.","들어오세요","","Pasok ka.","Pasok",""),
 S("Can I go in?","question","들어가도 돼요?","들어가도","","Puwede ba akong pumasok?","pumasok","puwede=can; may/adv")])
V("go-out","to go out","나가다","to go out","lumabas","lu-ma-BAS","to go out",[
 S("Let's go out to eat.","future","나가서 먹어요.","나가서","","Lumabas tayo para kumain.","Lumabas",""),
 S("She went out a moment ago.","past","방금 나갔어요.","나갔어요","방금=just now/adv","Kalalabas lang niya.","Kalalabas","")])
V("visit","to visit","방문하다","to visit","bumisita","bu-mi-si-TA","to visit",[
 S("Let's visit Grandma this Sunday.","future","이번 일요일에 할머니 댁에 가요.","가요","일요일에>일요일=Sunday/n; 할머니=grandma/n","Bisitahin natin si Lola ngayong Linggo.","Bisitahin","Lola=grandma/n; Linggo=Sunday/n"),
 S("My friends visited yesterday.","past","어제 친구들이 놀러 왔어요.","왔어요","어제=yesterday/n; 친구들이>친구=friend/n","Bumisita ang mga kaibigan ko kahapon.","Bumisita","kahapon=yesterday/adv; kaibigan=friend/n")])
V("send","to send","보내다","to send","magpadala","mag-pa-da-LA","to send",[
 S("Send me the photo.","command","사진 보내 줘요.","보내","사진=photo/n","Ipadala mo sa akin ang litrato.","Ipadala","litrato=photo/n"),
 S("I sent you a message.","past","메시지 보냈어요.","보냈어요","메시지=message/n","Nagpadala ako sa iyo ng mensahe.","Nagpadala","mensahe=message/n")])
V("borrow","to borrow","빌리다","to borrow; rent","humiram","hu-mi-RAM","to borrow",[
 S("Can I borrow a pen?","question","펜 좀 빌려도 돼요?","빌려도","펜=pen/n","Puwede bang humiram ng ballpen?","humiram","ballpen=pen/n"),
 S("I borrowed a book from the library.","past","도서관에서 책을 빌렸어요.","빌렸어요","도서관에서>도서관=library/n; 책을>책=book/n","Humiram ako ng libro sa library.","Humiram","libro=book/n")])
V("order","to order","주문하다","to order","umorder","u-mor-DER","to order",[
 S("Are you ready to order?","question","주문하시겠어요?","주문하시겠어요","","Handa na ba kayong umorder?","umorder","handa=ready/adj"),
 S("Let's order chicken tonight.","future","오늘 밤에 치킨 시켜요.","시켜요","밤에>밤=night/n; 치킨=fried chicken/n","Umorder tayo ng manok mamayang gabi.","Umorder","manok=chicken/n")])
V("choose","to choose","고르다","to choose; pick","pumili","pu-mi-LI","to choose",[
 S("You pick the restaurant, honey.","command","식당은 자기가 골라요.","골라요","식당은>식당=restaurant/n; 자기=honey (couples)/pron","Ikaw na ang pumili ng kainan, mahal.","pumili","kainan=eatery/n; mahal=love; dear/n"),
 S("Which one did you choose?","question","어떤 거 골랐어요?","골랐어요","어떤=which/adj","Alin ang pinili mo?","pinili","alin=which/pron")])
V("change","to change","바꾸다","to change; swap","magpalit","mag-pa-LIT","to change; swap",[
 S("Can I change seats?","question","자리 바꿔도 돼요?","바꿔도","자리=seat/n","Puwede bang makipagpalit ng upuan?","makipagpalit","upuan=seat; chair/n"),
 S("I changed my phone number.","past","전화번호 바꿨어요.","바꿨어요","전화번호=phone number/n","Nagpalit ako ng numero.","Nagpalit","numero=number/n")])
V("fix","to fix","고치다","to fix; repair","ayusin","a-yu-SIN","to fix",[
 S("Can you fix this?","question","이거 고칠 수 있어요?","고칠","","Kaya mo bang ayusin ito?","ayusin","kaya=can; able/adv"),
 S("Dad fixed the door.","past","아빠가 문을 고쳤어요.","고쳤어요","아빠가>아빠=dad/n; 문을>문=door/n","Inayos ni Tatay ang pinto.","Inayos","Tatay=dad/n; pinto=door/n")])
V("break","to break down","고장 나다","to break down","masira","ma-si-RA","to break; get damaged",[
 S("My phone broke.","past","핸드폰이 고장 났어요.","고장 났어요","핸드폰이>핸드폰=cell phone/n","Nasira ang cellphone ko.","Nasira","cellphone=cell phone/n"),
 S("The aircon is broken again.","present","에어컨이 또 고장 났어요.","고장 났어요","에어컨이>에어컨=air conditioner/n; 또=again/adv","Sira na naman ang aircon.","Sira","aircon=air conditioner/n")])
V("turn-off","to turn off","끄다","to turn off","patayin","pa-ta-YIN","to turn off",[
 S("Turn off the light.","command","불 꺼요.","꺼요","불=light; fire/n","Patayin mo ang ilaw.","Patayin","ilaw=light/n"),
 S("Did you turn off the stove?","question","가스레인지 껐어요?","껐어요","가스레인지=gas stove/n","Pinatay mo ba ang kalan?","Pinatay","kalan=stove/n")])
V("hurry","to hurry","서두르다","to hurry","magmadali","mag-ma-da-LI","to hurry",[
 S("Hurry up, we're late!","command","서둘러요, 늦었어요!","서둘러요","","Bilisan mo, late na tayo!","Bilisan","late=late/adv"),
 S("No need to hurry.","negative","서두를 필요 없어요.","서두를","필요=need/n","Hindi mo kailangang magmadali.","magmadali","kailangan=need/n")])
V("stop","to stop","멈추다","to stop","tumigil","tu-mi-GIL","to stop",[
 S("Stop here, please.","polite","여기서 세워 주세요.","세워","여기서>여기=here/pron","Para po, dito lang.","Para","dito=here/adv"),
 S("The rain stopped.","past","비가 그쳤어요.","그쳤어요","비가>비=rain/n","Tumigil na ang ulan.","Tumigil","ulan=rain/n")])
V("marry","to marry","결혼하다","to get married","magpakasal","mag-pa-ka-SAL","to get married",[
 S("We got married in 2020.","past","우리는 이천이십 년에 결혼했어요.","결혼했어요","년에>년=year/n","Ikinasal kami noong 2020.","Ikinasal",""),
 S("Are you married?","question","결혼했어요?","결혼했어요","","Kasal ka na ba?","Kasal","")])
V("shop","to go shopping","쇼핑하다","to shop","mamili","ma-mi-LI","to shop",[
 S("Let's go shopping on Saturday.","future","토요일에 쇼핑해요.","쇼핑해요","토요일에>토요일=Saturday/n","Mamili tayo sa Sabado.","Mamili","Sabado=Saturday/n"),
 S("I shopped too much.","past","쇼핑을 너무 많이 했어요.","했어요","쇼핑을>쇼핑=shopping/n; 너무=so; too/adv","Sobra akong namili.","namili","sobra=too much/adv")])
V("pray","to pray","기도하다","to pray","magdasal","mag-da-SAL","to pray",[
 S("Let's pray before we eat.","future","먹기 전에 기도해요.","기도해요","전에>전=before/n","Magdasal muna tayo bago kumain.","Magdasal","bago=before/adv"),
 S("I'll pray for you.","future","널 위해 기도할게요.","기도할게요","","Ipagdarasal kita.","Ipagdarasal","")])
V("taste","to taste","맛보다","to taste","tikman","tik-MAN","to taste",[
 S("Taste this.","command","이거 맛 좀 봐요.","맛","이거=this (thing)/pron","Tikman mo ito.","Tikman",""),
 S("Did you taste the soup?","question","국 맛봤어요?","맛봤어요","국=soup/n","Natikman mo na ba ang sabaw?","Natikman","sabaw=soup; broth/n")])
V("feel","to feel","느끼다","to feel","maramdaman","ma-ram-da-MAN","to feel",[
 S("How are you feeling?","question","기분이 어때요?","어때요","기분이>기분=mood; feeling/n","Ano ang pakiramdam mo?","pakiramdam",""),
 S("I felt something strange.","past","뭔가 이상한 걸 느꼈어요.","느꼈어요","이상한>이상하다=strange/adj","May naramdaman akong kakaiba.","naramdaman","kakaiba=strange/adj")])
V("get-angry","to get angry","화나다","to get angry","magalit","ma-ga-LIT","to get angry",[
 S("Are you mad at me?","question","저한테 화났어요?","화났어요","","Galit ka ba sa akin?","Galit",""),
 S("Don't get angry.","command","화내지 마요.","화내지","","Huwag kang magalit.","magalit","")])
V("be-surprised","to be surprised","놀라다","to be surprised","magulat","ma-gu-LAT","to be surprised",[
 S("You surprised me!","past","깜짝 놀랐어요!","놀랐어요","깜짝=suddenly (startled)/adv","Nagulat ako sa iyo!","Nagulat",""),
 S("Don't be surprised.","command","놀라지 마세요.","놀라지","","Huwag kang magugulat.","magugulat","")])
V("lie-down","to lie down","눕다","to lie down","humiga","hu-mi-GA","to lie down",[
 S("Lie down for a bit.","command","잠깐 누워요.","누워요","잠깐=a moment/adv","Humiga ka muna sandali.","Humiga","sandali=a moment/n"),
 S("I'm lying on the sofa.","present","소파에 누워 있어요.","누워 있어요","소파에>소파=sofa/n","Nakahiga ako sa sofa.","Nakahiga","sofa=sofa/n")])
V("go-up","to go up","올라가다","to go up; climb","umakyat","u-mak-YAT","to go up",[
 S("Let's take the stairs up.","future","계단으로 올라가요.","올라가요","계단으로>계단=stairs/n","Umakyat tayo sa hagdan.","Umakyat","hagdan=stairs/n"),
 S("Prices went up again.","past","물가가 또 올랐어요.","올랐어요","물가가>물가=prices/n; 또=again/adv","Tumaas na naman ang presyo.","Tumaas","presyo=price/n")])
V("go-down","to go down","내려가다","to go down; get off","bumaba","bu-ma-BA","to go down; get off",[
 S("I'm getting off here.","present","저 여기서 내려요.","내려요","여기서>여기=here/pron","Bababa na ako rito.","Bababa",""),
 S("Come down for dinner.","command","저녁 먹으러 내려와요.","내려와요","저녁=dinner; evening/n","Bumaba ka na para maghapunan.","Bumaba","")])
V("carry","to carry","들다","to carry; hold up","magbuhat","mag-bu-HAT","to lift; carry",[
 S("Let me carry that.","polite","제가 들어 줄게요.","들어","","Ako na ang magbubuhat niyan.","magbubuhat",""),
 S("This bag is too heavy to carry.","present","이 가방 너무 무거워서 못 들어요.","들어요","가방=bag/n; 무거워서>무겁다=heavy/adj","Masyadong mabigat ang bag na ito para buhatin.","buhatin","mabigat=heavy/adj; bag=bag/n")])
V("throw-away","to throw away","버리다","to throw away","magtapon","mag-ta-PON","to throw away",[
 S("Throw away the trash, please.","polite","쓰레기 좀 버려 주세요.","버려","쓰레기=trash/n","Pakitapon ang basura.","Pakitapon","basura=trash/n"),
 S("Don't throw that away!","command","그거 버리지 마요!","버리지","그거=that (thing)/pron","Huwag mong itapon iyan!","itapon","")])
V("hold","to hold","잡다","to hold; grab","humawak","hu-ma-WAK","to hold",[
 S("Hold my hand.","command","내 손 잡아요.","잡아요","손=hand/n","Hawakan mo ang kamay ko.","Hawakan","kamay=hand/n"),
 S("Hold on tight.","command","꽉 잡아요.","잡아요","꽉=tightly/adv","Kumapit ka nang mahigpit.","Kumapit","mahigpit=tight/adj")])
V("push","to push","밀다","to push","itulak","i-tu-LAK","to push",[
 S("Push the door.","command","문을 미세요.","미세요","문을>문=door/n","Itulak mo ang pinto.","Itulak","pinto=door/n"),
 S("Don't push me!","command","밀지 마요!","밀지","","Huwag mo akong itulak!","itulak","")])
V("pull","to pull","당기다","to pull","hilahin","hi-la-HIN","to pull",[
 S("Pull, don't push.","command","밀지 말고 당기세요.","당기세요","","Hilahin mo, huwag itulak.","Hilahin",""),
 S("Pull the blanket up.","command","이불 좀 당겨요.","당겨요","이불=blanket/n","Hilahin mo ang kumot.","Hilahin","kumot=blanket/n")])
V("show","to show","보여주다","to show","ipakita","i-pa-ki-TA","to show",[
 S("Show me the picture.","command","사진 보여 줘요.","보여","사진=photo/n","Ipakita mo sa akin ang litrato.","Ipakita","litrato=photo/n"),
 S("She showed me her new house.","past","새 집을 보여 줬어요.","보여","새=new/adj; 집을>집=house; home/n","Ipinakita niya sa akin ang bago niyang bahay.","Ipinakita","bahay=house/n")])
V("exercise","to exercise","운동하다","to exercise","mag-ehersisyo","mag-e-her-SIS-yo","to exercise",[
 S("I exercise three times a week.","present","일주일에 세 번 운동해요.","운동해요","일주일에>일주일=one week/n; 번=time(s)/n","Nag-eehersisyo ako tatlong beses sa isang linggo.","Nag-eehersisyo","beses=time(s)/n; linggo=week/n"),
 S("I didn't exercise today.","negative","오늘 운동 안 했어요.","운동","오늘=today/n","Hindi ako nag-ehersisyo ngayon.","nag-ehersisyo","ngayon=now; today/adv")])
V("celebrate","to celebrate","축하하다","to congratulate; celebrate","magdiwang","mag-di-WANG","to celebrate",[
 S("Happy birthday!","polite","생일 축하해요!","축하해요","생일=birthday/n","Maligayang kaarawan!","Maligayang","kaarawan=birthday/n"),
 S("Let's celebrate tonight.","future","오늘 밤에 축하해요.","축하해요","밤에>밤=night/n","Magdiwang tayo mamayang gabi.","Magdiwang","gabi=night; evening/n")])
V("take-photo","to take a photo","찍다","to take (a photo)","kumuha ng litrato","ku-mu-HA ng li-TRA-to","to take (a photo)",[
 S("Can you take our picture?","question","사진 좀 찍어 줄래요?","찍어","사진=photo/n","Puwede mo ba kaming kunan ng litrato?","kunan","litrato=photo/n"),
 S("I took a lot of photos.","past","사진 많이 찍었어요.","찍었어요","많이=a lot/adv","Ang dami kong kinuhang litrato.","kinuhang","dami=amount; many/n")])
V("try","to try","해 보다","to try (doing)","subukan","su-bu-KAN","to try",[
 S("Try it once.","command","한번 해 봐요.","해 봐요","한번=once/adv","Subukan mo minsan.","Subukan","minsan=once/adv"),
 S("Can I try this on?","question","이거 입어 봐도 돼요?","입어 봐도","","Puwede ko bang isukat ito?","isukat","")])
V("cut","to cut","자르다","to cut","maggupit","mag-gu-PIT","to cut (hair, paper)",[
 S("I got a haircut.","past","머리 잘랐어요.","잘랐어요","머리=hair; head/n","Nagpagupit ako ng buhok.","Nagpagupit","buhok=hair/n"),
 S("Cut the onions, please.","polite","양파 좀 잘라 주세요.","잘라","양파=onion/n","Pakihiwa ang sibuyas.","Pakihiwa","sibuyas=onion/n")])
V("get-ready","to get ready","준비하다","to prepare; get ready","maghanda","mag-han-DA","to prepare",[
 S("Get ready, we're leaving soon.","command","준비해요, 곧 나가요.","준비해요","곧=soon/adv","Maghanda ka na, aalis na tayo.","Maghanda",""),
 S("I prepared dinner.","past","저녁 준비했어요.","준비했어요","저녁=dinner; evening/n","Naghanda ako ng hapunan.","Naghanda","hapunan=dinner/n")])
V("rain","to rain","비가 오다","to rain","umulan","u-mu-LAN","to rain",[
 S("It's raining outside.","present","밖에 비가 와요.","와요","밖에>밖=outside/n; 비가>비=rain/n","Umuulan sa labas.","Umuulan","labas=outside/n"),
 S("It might rain tomorrow.","future","내일 비가 올 것 같아요.","올 것 같아요","내일=tomorrow/n","Baka umulan bukas.","umulan","baka=maybe/adv; bukas=tomorrow/adv")])
V("catch-cold","to catch a cold","감기에 걸리다","to catch a cold","sipunin","si-pu-NIN","to catch a cold",[
 S("I caught a cold.","past","감기에 걸렸어요.","걸렸어요","감기에>감기=cold (illness)/n","Sinipon ako.","Sinipon",""),
 S("Don't catch a cold.","command","감기 걸리지 마세요.","걸리지","감기=cold (illness)/n","Huwag kang magpapasipon.","magpapasipon","")])
V("save-money","to save (money)","모으다","to save; collect","mag-ipon","mag-I-pon","to save (money)",[
 S("We're saving money for a trip.","present","여행 가려고 돈을 모으고 있어요.","모으고 있어요","여행=trip/n; 돈을>돈=money/n","Nag-iipon kami ng pera para sa biyahe.","Nag-iipon","pera=money/n; biyahe=trip/n"),
 S("I saved a little this month.","past","이번 달에 조금 모았어요.","모았어요","달에>달=month/n; 조금=a little/adv","Nakaipon ako nang kaunti ngayong buwan.","Nakaipon","kaunti=a little/adv; buwan=month/n")])
V("spend","to spend","쓰다","to spend; to use","gumastos","gu-mas-TOS","to spend",[
 S("I spent too much this month.","past","이번 달에 돈을 너무 많이 썼어요.","썼어요","달에>달=month/n; 돈을>돈=money/n","Ang laki ng nagastos ko ngayong buwan.","nagastos","buwan=month/n"),
 S("Don't spend it all.","command","다 쓰지 마요.","쓰지","다=all/adv","Huwag mong gastusin lahat.","gastusin","lahat=all/pron")])
V("lend","to lend","빌려주다","to lend","magpahiram","mag-pa-hi-RAM","to lend",[
 S("Can you lend me some money?","question","돈 좀 빌려줄 수 있어요?","빌려줄","돈=money/n","Puwede mo ba akong pahiramin ng pera?","pahiramin","pera=money/n"),
 S("I lent him my car.","past","그 사람한테 차를 빌려줬어요.","빌려줬어요","차를>차=car/n","Pinahiram ko sa kanya ang kotse ko.","Pinahiram","kotse=car/n")])
V("hug","to hug","안다","to hug","yumakap","yu-ma-KAP","to hug",[
 S("Give me a hug.","command","안아 줘요.","안아","","Yakapin mo ako.","Yakapin",""),
 S("She hugged me tight.","past","꼭 안아 줬어요.","안아","꼭=tightly/adv","Niyakap niya ako nang mahigpit.","Niyakap","mahigpit=tight/adj")])
V("kiss","to kiss","뽀뽀하다","to kiss","humalik","hu-ma-LIK","to kiss",[
 S("Kiss me goodnight.","command","잘 자라고 뽀뽀해 줘요.","뽀뽀해","","Halikan mo ako bago matulog.","Halikan","bago=before/adv"),
 S("He kissed the baby.","past","아기한테 뽀뽀했어요.","뽀뽀했어요","아기한테>아기=baby/n","Hinalikan niya ang baby.","Hinalikan","baby=baby/n")])
V("thank","to thank","고마워하다","to thank","magpasalamat","mag-pa-sa-LA-mat","to thank",[
 S("I want to thank you.","polite","정말 고마워요.","고마워요","정말=really/adv","Gusto kitang pasalamatan.","pasalamatan",""),
 S("I thanked the driver.","past","기사님한테 고맙다고 했어요.","고맙다고 했어요","기사님한테>기사님=driver/n","Nagpasalamat ako sa driver.","Nagpasalamat","driver=driver/n")])
V("apologize","to apologize","사과하다","to apologize","humingi ng tawad","hu-mi-NGI ng TA-wad","to apologize",[
 S("I already apologized.","past","벌써 사과했어요.","사과했어요","벌써=already/adv","Humingi na ako ng tawad.","Humingi",""),
 S("Say sorry to your sister.","command","언니한테 사과해요.","사과해요","언니한테>언니=older sister/n","Mag-sorry ka sa ate mo.","Mag-sorry","ate=older sister/n")])

import re as _re
_VOC = _re.compile(r"\s*([^;=]+?)=(.+?)/(n|adj|adv|pron|num)\s*(?:;|$)")
def parse_vocab(spec, text):
    """-> list of (surface_in_text, base, english, pos, start_offset)"""
    out = []
    for sur, en, pos in _VOC.findall(spec):
        base = sur
        if ">" in sur: sur, base = sur.split(">", 1)
        low, k, i = text.lower(), sur.lower(), -1
        # prefer an occurrence that starts a word
        for m in _re.finditer(_re.escape(k), low):
            if m.start() == 0 or not low[m.start() - 1].isalnum():
                i = m.start(); break
        if i < 0: i = low.find(k)
        assert i >= 0, (text, sur)
        out.append((text[i:i + len(sur)], base, en.strip(), pos, i))
    return out
