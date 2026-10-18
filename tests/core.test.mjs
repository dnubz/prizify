import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultState, readState, moveItem, searchTracks, formatTime, escapeHtml } from '../dist/core.js';
import { tracks } from '../dist/data.js';

test('playlist reorder preserves each track, supports both directions, and rejects invalid moves',()=>{
  assert.deepEqual(moveItem(['t1','t2','t3'],0,2),['t2','t3','t1']);
  assert.deepEqual(moveItem(['t1','t2','t3'],2,0),['t3','t1','t2']);
  assert.deepEqual(moveItem(['t1','t2'],0,-1),['t1','t2']);
});
test('restores persisted library and strips unknown track references',()=>{
  const s=defaultState();s.playlists[0].title='My sunrise';s.playlists[0].trackIds.push('missing');s.queue=['t3','missing'];s.liked=['t2','missing'];s.volume=4;s.current='missing';
  const restored=readState({getItem:()=>JSON.stringify(s)});
  assert.equal(restored.playlists[0].title,'My sunrise');assert.ok(!restored.playlists[0].trackIds.includes('missing'));assert.deepEqual(restored.queue,['t3']);assert.deepEqual(restored.liked,['t2']);assert.equal(restored.volume,1);assert.equal(restored.current,'t1');
});
test('recovers from corrupt browser data',()=>{
  assert.deepEqual(readState({getItem:()=>'{bad json'}),defaultState());
  assert.deepEqual(readState({getItem:()=>null}),defaultState());
});
test('untrusted library imports cannot introduce markup through IDs or image URLs',()=>{
  const s=defaultState();s.playlists[0].art='x" onerror="alert(1)';s.playlists.push({id:'p-" onclick="bad',title:'bad',trackIds:[]});
  const restored=readState({getItem:()=>JSON.stringify(s)});
  assert.equal(restored.playlists.length,2);assert.equal(restored.playlists[0].art,'first');
});
test('search matches song, artist, album, genre, mood, whitespace, and category',()=>{
  assert.equal(searchTracks(' AFTERGLOW ')[0].id,'t1');
  assert.equal(searchTracks('Milo Fields').length,2);
  assert.equal(searchTracks('Golden Hour').length,2);
  assert.equal(searchTracks('Jazz').length,2);
  assert.ok(searchTracks('Focus').length>=2);
  assert.equal(searchTracks('not a real song').length,0);
  assert.ok(searchTracks('','Electronic').every(t=>t.genre==='Electronic'));
  assert.equal(searchTracks('').length,tracks.length);
});
test('user names are escaped and audio times use real durations',()=>{
  assert.equal(escapeHtml('<img src=x onerror="bad">'), '&lt;img src=x onerror=&quot;bad&quot;&gt;');
  assert.equal(formatTime(64),'1:04');assert.equal(formatTime(NaN),'0:00');
});
