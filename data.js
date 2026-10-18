export const tracks = [
  { id:'t1', title:'Afterglow', artist:'Solstice Club', album:'Golden Hour', art:'golden', genre:'Electronic', mood:'Chill', duration:64, color:'#fca16d' },
  { id:'t2', title:'Somewhere, Slowly', artist:'Milo Fields', album:'Soft Focus', art:'soft', genre:'Indie', mood:'Focus', duration:72, color:'#9aadd0' },
  { id:'t3', title:'Blue Hour Reverie', artist:'The Sunday Trio', album:'Sunday State of Mind', art:'sunday', genre:'Jazz', mood:'Chill', duration:68, color:'#92bdb4' },
  { id:'t4', title:'Night Drive', artist:'NOVA / NOVA', album:'Midnight Motion', art:'midnight', genre:'Electronic', mood:'Energy', duration:64, color:'#ac91e8' },
  { id:'t5', title:'Coastline', artist:'June & the Waves', album:'Out of Office', art:'coast', genre:'Indie', mood:'Chill', duration:72, color:'#e6aa6f' },
  { id:'t6', title:'Daydreaming', artist:'Luna Bay', album:'Bloom', art:'bloom', genre:'Ambient', mood:'Focus', duration:80, color:'#e6a4bf' },
  { id:'t7', title:'Satellites', artist:'Solstice Club', album:'Golden Hour', art:'golden', genre:'Electronic', mood:'Energy', duration:64, color:'#fca16d' },
  { id:'t8', title:'Between the Lines', artist:'Milo Fields', album:'Soft Focus', art:'soft', genre:'Indie', mood:'Focus', duration:72, color:'#9aadd0' },
  { id:'t9', title:'Velvet Morning', artist:'The Sunday Trio', album:'Sunday State of Mind', art:'sunday', genre:'Jazz', mood:'Chill', duration:68, color:'#92bdb4' },
  { id:'t10', title:'Neon Slowdown', artist:'NOVA / NOVA', album:'Midnight Motion', art:'midnight', genre:'Electronic', mood:'Energy', duration:64, color:'#ac91e8' },
  { id:'t11', title:'Saltwater', artist:'June & the Waves', album:'Out of Office', art:'coast', genre:'Indie', mood:'Chill', duration:72, color:'#e6aa6f' },
  { id:'t12', title:'A Place to Land', artist:'Luna Bay', album:'Bloom', art:'bloom', genre:'Ambient', mood:'Focus', duration:80, color:'#e6a4bf' },
];
export const albums = [...new Map(tracks.map(t=>[t.art,{id:t.art,title:t.album,artist:t.artist,art:t.art,genre:t.genre,trackIds:tracks.filter(x=>x.album===t.album).map(x=>x.id)}])).values()];
export const artists = albums.map(a=>({id:a.art,title:a.artist,art:a.art,genre:a.genre,trackIds:a.trackIds}));
export const editorial = [
  {id:'golden-hour',title:'Golden hour, on repeat',description:'Warm light. Windows down. Nowhere to be.',art:'golden',tag:'PRIZIFY SELECTS',trackIds:['t1','t5','t7','t11','t3','t6']},
  {id:'soft-focus',title:'Soft Focus',description:'A little space to think. A lot to get lost in.',art:'focus',tag:'MADE FOR YOUR MOMENT',trackIds:['t2','t8','t6','t12','t3']},
  {id:'slow-sunday',title:'Slow Sunday',description:'The art of doing absolutely nothing.',art:'sunday',tag:'TAKE IT SLOW',trackIds:['t3','t9','t5','t11','t2']},
  {id:'after-hours',title:'After Hours',description:'When the city goes quiet, turn it up.',art:'midnight',tag:'NIGHT MODE',trackIds:['t4','t10','t7','t1','t8']},
  {id:'daily-mix',title:'Your Daily Mix',description:'Familiar favorites. Fresh discoveries. All you.',art:'mix',tag:'MADE FOR YOU',trackIds:['t1','t2','t5','t4','t6','t3']},
  {id:'fresh-finds',title:'Fresh Finds',description:'Small artists. Big feelings. Your next favorite.',art:'fresh',tag:'OFF THE BEATEN PATH',trackIds:['t12','t8','t11','t9','t10']},
];
export const trackById = id => tracks.find(t=>t.id===id);
export const artUrl = key => `./assets/${key}.svg`;
