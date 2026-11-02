"""Syllable-dashed romanization.
Korean: Revised Romanization following surface pronunciation (liaison, ㅎ rules,
nasalization, ㄹ assimilation), one dashed chunk per Hangul syllable.
Tagalog: spelled as written, split into syllables with dashes."""
import re
CHO=["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"]
JUNG=["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"]
# jong index -> jamo name
JONG=["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"]
CHOJ=["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"]
# compound final: (stays, moves-on-liaison)
SPLIT={"ㄳ":("ㄱ","ㅅ"),"ㄵ":("ㄴ","ㅈ"),"ㄶ":("ㄴ","ㅎ"),"ㄺ":("ㄹ","ㄱ"),"ㄻ":("ㄹ","ㅁ"),"ㄼ":("ㄹ","ㅂ"),
 "ㄽ":("ㄹ","ㅅ"),"ㄾ":("ㄹ","ㅌ"),"ㄿ":("ㄹ","ㅍ"),"ㅀ":("ㄹ","ㅎ"),"ㅄ":("ㅂ","ㅅ"),"ㄲ":("","ㄲ"),"ㅆ":("","ㅆ")}
# final sound when not linked (neutralization); compound -> representative
NEUT={"ㄱ":"ㄱ","ㄲ":"ㄱ","ㅋ":"ㄱ","ㄳ":"ㄱ","ㄺ":"ㄱ","ㄴ":"ㄴ","ㄵ":"ㄴ","ㄶ":"ㄴ","ㄷ":"ㄷ","ㅅ":"ㄷ","ㅆ":"ㄷ",
 "ㅈ":"ㄷ","ㅊ":"ㄷ","ㅌ":"ㄷ","ㅎ":"ㄷ","ㄹ":"ㄹ","ㄼ":"ㄹ","ㄽ":"ㄹ","ㄾ":"ㄹ","ㅀ":"ㄹ","ㅁ":"ㅁ","ㄻ":"ㅁ",
 "ㅂ":"ㅂ","ㅍ":"ㅂ","ㄿ":"ㅂ","ㅄ":"ㅂ","ㅇ":"ㅇ"}
FIN={"":"","ㄱ":"k","ㄴ":"n","ㄷ":"t","ㄹ":"l","ㅁ":"m","ㅂ":"p","ㅇ":"ng"}
ASP={"ㄱ":"ㅋ","ㄷ":"ㅌ","ㅂ":"ㅍ","ㅈ":"ㅊ"}
def is_h(c): return "\uac00"<=c<="\ud7a3"
def dec(c):
    n=ord(c)-0xAC00; return [CHOJ[n//588],(n%588)//28,JONG[n%28]]
def ko_word(w):
    s=[dec(c) for c in w]
    for i in range(len(s)-1):
        a,b=s[i],s[i+1]; f=a[2]
        if not f: continue
        if b[0]=="ㅇ" and f=="ㅇ": continue
        if b[0]=="ㅇ" and b[1]==20 and f in("ㄷ","ㅌ"):  # palatalization 같이 -> 가치
            a[2]=""; b[0]="ㅈ" if f=="ㄷ" else "ㅊ"; continue
        stay,move=SPLIT.get(f,(None,None))
        hfin=f in("ㅎ","ㄶ","ㅀ")
        if b[0]=="ㅇ":  # liaison
            if hfin:
                a[2]=""
                if f!="ㅎ": b[0]={"ㄶ":"ㄴ","ㅀ":"ㄹ"}[f]
                continue
            if stay is not None: a[2]=stay; b[0]=move
            else: a[2]=""; b[0]=f
            continue
        if hfin and b[0] in ASP:  # 좋다 -> 조타
            a[2]="" if f=="ㅎ" else {"ㄶ":"ㄴ","ㅀ":"ㄹ"}[f]; b[0]=ASP[b[0]]; continue
        if b[0]=="ㅎ" and NEUT.get(f) in ASP:  # 축하 -> 추카
            a[2]=stay if stay else ""; b[0]=ASP[NEUT[f]]; continue
        if b[0]=="ㅎ" and NEUT.get(f) in("ㄴ","ㅁ","ㅇ","ㄹ"):
            continue
        nf=NEUT.get(f,f)
        if b[0] in("ㄴ","ㅁ"):  # nasalization
            nf={"ㄱ":"ㅇ","ㄷ":"ㄴ","ㅂ":"ㅁ"}.get(nf,nf)
        if b[0]=="ㄴ" and nf=="ㄹ": b[0]="ㄹ"
        elif b[0]=="ㄹ" and nf=="ㄴ": nf="ㄹ"
        elif b[0]=="ㄹ" and nf in("ㅁ","ㅇ"): b[0]="ㄴ"
        a[2]=nf
    out=[]
    for i,(c,v,f) in enumerate(s):
        ini=CHO[CHOJ.index(c)]
        if c=="ㄹ": ini="l" if i>0 and s[i-1][2]=="ㄹ" else "r"
        fin=FIN[NEUT.get(f,f)] if f else ""
        if f=="ㄹ" and i+1<len(s) and s[i+1][0]=="ㄹ": fin="l"
        out.append(ini+JUNG[v]+fin)
    return "-".join(out)
def ko(text):
    toks=re.findall(r"[\uac00-\ud7a3]+",text)
    return " ".join(ko_word(t) for t in toks)

V="aeiou"
def tl_word(w):
    w=w.lower().replace("ng","\0")  # ng is one consonant
    # syllable: (C)V(C) — split V C V -> V-CV, V CC V -> VC-CV, V V -> V-V
    segs=[]; cur=""; i=0
    chars=list(w)
    # find vowel positions
    idx=[k for k,ch in enumerate(chars) if ch in V]
    if not idx: return w.replace("\0","ng")
    bounds=[]
    for a,b in zip(idx,idx[1:]):
        cons=b-a-1
        glide=cons>=2 and chars[b-1] in "rlyw" and chars[b-2] in "bkdgptsc"
        bounds.append(a+1 if cons<=1 else b-2 if glide else a+cons)
    parts=[];prev=0
    for bd in bounds: parts.append("".join(chars[prev:bd])); prev=bd
    parts.append("".join(chars[prev:]))
    return "-".join(parts).replace("\0","ng")
def tl(text):
    return " ".join("-".join(tl_word(p) for p in t.split("-")) for t in re.findall(r"[A-Za-zñÑ'\-]+",text))
