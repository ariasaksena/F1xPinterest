// Live port of the F1 x Pinterest season model. Base scenario reproduces the spreadsheet.
export const RACES = [
  ['Australia','Mar',0.05,150],['China','Mar',0.05,90],['Japan','Apr',0.09,165],['Bahrain','Apr',0.05,105],
  ['Saudi Arabia','Apr',0.05,105],['Miami','May',0.14,240],['Emilia-Romagna','May',0.05,135],['Monaco','May',0.15,270],
  ['Spain','Jun',0.05,180],['Canada','Jun',0.05,165],['Austria','Jun',0.05,120],['Britain','Jul',0.10,180],
  ['Belgium','Jul',0.05,120],['Hungary','Aug',0.05,135],['Netherlands','Aug',0.05,135],['Italy','Sep',0.10,180],
  ['Azerbaijan','Sep',0.05,105],['Singapore','Oct',0.12,210],['USA (Austin)','Oct',0.11,210],['Mexico','Oct',0.05,150],
  ['Brazil','Nov',0.10,135],['Las Vegas','Nov',0.18,270],['Qatar','Nov',0.05,120],['Abu Dhabi','Dec',0.12,210],
]

export const SCEN = {
  conservative: {seed:2000,pins:25,impr:150,fc:0.008,ev:0.03,lc:0.05,ctr:0.05,hc:0.04,tc:0.03,dc:0.10,adr:250,ht:0.05,tp:300,tt:0.06,ds:100,dt:0.06,mr:0.003,aov:60,mm:0.30,cost:3000},
  base:         {seed:5000,pins:40,impr:250,fc:0.015,ev:0.06,lc:0.10,ctr:0.08,hc:0.06,tc:0.05,dc:0.15,adr:300,ht:0.08,tp:450,tt:0.10,ds:150,dt:0.10,mr:0.006,aov:75,mm:0.40,cost:3500},
  optimistic:   {seed:10000,pins:60,impr:450,fc:0.025,ev:0.10,lc:0.18,ctr:0.12,hc:0.09,tc:0.08,dc:0.22,adr:380,ht:0.10,tp:650,tt:0.15,ds:220,dt:0.12,mr:0.010,aov:95,mm:0.50,cost:4500},
}
const FOLL_BASE = 40*250*0.015
const CEIL = 350000, R = 1.4

export function runSeason(key){
  const p = SCEN[key]
  const scale = (p.pins*p.impr*p.fc)/FOLL_BASE
  let aud = p.seed, cum = 0
  const rows = []
  let gross=0, travel=0, comm=0, cost=0, beRace=null
  for (const [name,mon,D,Gb] of RACES){
    aud = aud*(1+p.ev) + Gb*scale
    const lift = 1 + p.lc*Math.log(1+aud/25000)
    const inmkt = aud*D*lift
    const clicks = inmkt*p.ctr
    const L=clicks*p.hc, M=clicks*p.tc, N=clicks*p.dc
    const g = L*3*p.adr + M*p.tp + N*p.ds
    const t = L*3*p.adr*p.ht + M*p.tp*p.tt + N*p.ds*p.dt
    const c = aud*p.mr*p.aov*p.mm
    const net = t + c - p.cost
    gross+=g; travel+=t; comm+=c; cost+=p.cost; cum+=net
    if (beRace===null && cum>=0) beRace = name
    rows.push({name, month:mon, aud:Math.round(aud), influenced:Math.round(g), net:Math.round(net), cum:Math.round(cum)})
  }
  // community -> travel link (baseline: audience never grows past seed)
  let baseTravel=0
  for (const [name,mon,D,Gb] of RACES){
    const inmkt=p.seed*D*1, clicks=inmkt*p.ctr
    const L=clicks*p.hc,M=clicks*p.tc,N=clicks*p.dc
    baseTravel += L*3*p.adr*p.ht + M*p.tp*p.tt + N*p.ds*p.dt
  }
  return {rows, endAud:Math.round(aud), influenced:Math.round(gross), travel:Math.round(travel),
    comm:Math.round(comm), cost:Math.round(cost), net:Math.round(travel+comm-cost),
    beRace, linkValue:Math.round(travel-baseTravel)}
}

export function multiSeason(key, n=5){
  const s1 = runSeason(key)
  const auds=[s1.endAud]
  for (let i=1;i<n;i++){ const a=auds[i-1]; auds.push(a + R*a*(1-a/CEIL)) }
  const seeds=[SCEN[key].seed, ...auds.slice(0,-1)]
  const avg=auds.map((a,i)=>(seeds[i]+a)/2)
  const avg1=avg[0]
  return auds.map((a,i)=>{
    const sc=avg[i]/avg1
    const influenced=Math.round(s1.influenced*sc)
    const travel=Math.round(s1.travel*sc)
    const comm=Math.round(s1.comm*sc)
    const net=Math.round(travel+comm-s1.cost)
    return {season:`Year ${i+1}`, yr:i+1, endAud:Math.round(a), influenced, travel, comm, net,
      travelPartner:Math.round(travel*1.65), netPartner:Math.round(travel*1.65+comm-s1.cost)}
  })
}

export function platform(key, take=0.08){
  const ms = multiSeason(key)
  const per = ms[2].influenced // mature (season 3) per-account influenced spend
  return [1,10,25,50,100].map(N=>({accounts:N, gmv:per*N, platformRev:Math.round(per*N*take)}))
}

export const fmtUSD = (n)=> (n<0?'-':'')+'$'+Math.abs(Math.round(n)).toLocaleString()
export const fmtK = (n)=> n>=1000 ? (n/1000).toFixed(n>=100000?0:1)+'K' : Math.round(n)
