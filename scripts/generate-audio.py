"""Create original synth compositions. No samples, recordings, or external assets."""
from pathlib import Path
import wave
import numpy as np

OUT = Path(__file__).resolve().parent.parent / 'dist' / 'assets'
SR = 16000
DURATIONS = [64,72,68,64,72,80,64,72,68,64,72,80]
CHORDS = [[48,55,59,62],[45,52,55,59],[41,48,52,55],[43,50,53,57]]

def hz(note): return 440 * 2 ** ((note-69)/12)

for i, duration in enumerate(DURATIONS):
    rng = np.random.default_rng(712 + i)
    sound = np.zeros(duration * SR, dtype=np.float64)
    bpm = [90,80,85,110,95,72][i%6]
    beat = 60 / bpm
    transpose = [0,2,5,7,-2,3][i%6]
    def add(start, length, note, gain, style='pad'):
        pos = int(start*SR)
        n = min(int(length*SR),len(sound)-pos)
        if n <= 0: return
        t = np.arange(n)/SR
        f = hz(note)
        if style == 'pad':
            y = np.sin(2*np.pi*f*t) + .25*np.sin(2*np.pi*(f*2+.3)*t)
            env = np.minimum(t/.3,1)*np.minimum((n/SR-t)/.6,1)
        elif style == 'bell':
            y = np.sin(2*np.pi*f*t)+.18*np.sin(2*np.pi*f*3*t)
            env = (1-np.exp(-t*90))*np.exp(-t*3)
        else:
            y = np.sin(2*np.pi*f*t)
            env = np.minimum(t/.02,1)*np.exp(-t*2)
        sound[pos:pos+n] += y*env*gain
    bar = beat*4
    for b in range(int(duration/bar)+1):
        start=b*bar
        chord=CHORDS[(b+i//6)%len(CHORDS)]
        for note in chord: add(start,bar*1.1,note+transpose,.055)
        for step in range(8):
            if rng.random()>.25:
                add(start+step*beat/2,beat*1.4,chord[(step+i)%4]+transpose+24,.075,'bell')
        for step in [0,2]:
            add(start+step*beat,beat*1.6,chord[0]+transpose-12,.11,'bass')
        if i%6 != 5:
            for step in range(4):
                p=int((start+step*beat)*SR)
                n=min(int(.16*SR),len(sound)-p)
                if n>0:
                    t=np.arange(n)/SR
                    sound[p:p+n]+=.14*np.sin(2*np.pi*(48*t+5*(1-np.exp(-t*30))))*np.exp(-t*28)
            for step in range(8):
                p=int((start+(step+.5)*beat/2)*SR)
                n=min(int(.045*SR),len(sound)-p)
                if n>0:
                    noise=rng.normal(0,1,n)
                    noise=np.concatenate(([0],np.diff(noise)))
                    sound[p:p+n]+=.017*noise*np.exp(-np.arange(n)/SR*100)
    for delay,gain in [(.23,.15),(.47,.08)]:
        offset=int(delay*SR)
        sound[offset:]+=sound[:-offset]*gain
    fade=int(2*SR)
    sound[:fade]*=np.linspace(0,1,fade)
    sound[-fade:]*=np.linspace(1,0,fade)
    sound=np.tanh(sound*1.8)*.75
    audio=(sound*32767).astype('<i2')
    with wave.open(str(OUT/f't{i+1}.wav'),'wb') as f:
        f.setnchannels(1);f.setsampwidth(2);f.setframerate(SR);f.writeframes(audio.tobytes())
print('Created 12 original instrumental demo compositions, 16 kHz PCM WAV.')
