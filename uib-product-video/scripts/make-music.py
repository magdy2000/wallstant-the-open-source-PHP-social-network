"""Generates a royalty-free cinematic music bed (public/music.wav) with numpy only."""
import sys, wave
import numpy as np

SR = 44100
DUR = float(sys.argv[2]) if len(sys.argv) > 2 else 21.0
BPM = 96
beat = 60 / BPM
n = int(SR * DUR)
t = np.arange(n) / SR
out = np.zeros((n, 2))

def note(f):
    return 440 * 2 ** ((f - 69) / 12)

def env(length, a, r):
    e = np.ones(length)
    ai, ri = int(a * SR), int(r * SR)
    e[:ai] = np.linspace(0, 1, ai)
    e[-ri:] *= np.linspace(1, 0, ri)
    return e

def add(sig, start, pan=0.0, gain=1.0):
    s = int(start * SR)
    e = min(n, s + len(sig))
    if s >= n:
        return
    seg = sig[: e - s] * gain
    out[s:e, 0] += seg * (1 - pan) / 2 * 2 ** 0.5
    out[s:e, 1] += seg * (1 + pan) / 2 * 2 ** 0.5

# Pad chords: Am - F - C - G (each 2 bars)
chords = [[57, 60, 64, 69], [53, 57, 60, 65], [48, 55, 60, 64], [55, 59, 62, 67]]
bar = 4 * beat
seg_len = 2 * bar
k = 0
pos = 0.0
while pos < DUR:
    ch = chords[k % 4]
    L = int(seg_len * SR) + int(1.5 * SR)
    tt = np.arange(L) / SR
    sig = np.zeros(L)
    for i, m in enumerate(ch):
        f = note(m)
        for det in (-0.12, 0.12):
            ff = f * 2 ** (det / 12)
            sig += np.sin(2 * np.pi * ff * tt) * 0.5 + np.sin(2 * np.pi * 2 * ff * tt) * 0.12
    sig *= env(L, 1.2, 1.6) * 0.035
    add(sig, pos, pan=0.0)
    # Bass
    bf = note(ch[0] - 12)
    bL = int(seg_len * SR)
    bt = np.arange(bL) / SR
    bass = np.tanh(2 * np.sin(2 * np.pi * bf * bt)) * env(bL, 0.05, 0.4) * 0.08
    add(bass, pos)
    pos += seg_len
    k += 1

# Arpeggio pluck (starts after intro)
step = beat / 2
i = 0
p = 2 * bar
while p < DUR - 1.5:
    ch = chords[int(p // seg_len) % 4]
    m = ch[[0, 2, 1, 3, 2, 1, 3, 2][i % 8]] + 12
    L = int(0.6 * SR)
    tt = np.arange(L) / SR
    pl = (np.sin(2 * np.pi * note(m) * tt) + 0.3 * np.sin(2 * np.pi * 2 * note(m) * tt)) * np.exp(-tt * 7) * 0.05
    add(pl, p, pan=0.5 if i % 2 else -0.5)
    p += step
    i += 1

# Soft kick + hats from bar 2
def kick():
    L = int(0.45 * SR)
    tt = np.arange(L) / SR
    f = 45 + 90 * np.exp(-tt * 25)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 7) * 0.32

def hat():
    L = int(0.06 * SR)
    rng = np.random.default_rng(1)
    s = rng.standard_normal(L)
    s = np.diff(s, prepend=0)
    return s * np.exp(-np.arange(L) / SR * 60) * 0.025

p = 2 * bar
while p < DUR - 2 * bar:
    add(kick(), p)
    add(hat(), p + beat / 2, pan=0.3)
    p += beat

# Impact hits: intro and outro
def impact():
    L = int(2.5 * SR)
    tt = np.arange(L) / SR
    f = 30 + 60 * np.exp(-tt * 6)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 2.2) * 0.45
    noise = np.random.default_rng(2).standard_normal(L) * np.exp(-tt * 5) * 0.03
    return boom + noise

add(impact(), 0.05)
outro_at = float(sys.argv[3]) if len(sys.argv) > 3 else DUR - 4.5
add(impact(), outro_at)

# Simple stereo delay "reverb"
for d, g in ((0.23, 0.25), (0.37, 0.18), (0.61, 0.1)):
    ds = int(d * SR)
    out[ds:, 0] += out[:-ds, 1] * g
    out[ds:, 1] += out[:-ds, 0] * g

# Master fade
fade = np.ones(n)
fade[-int(2 * SR):] = np.linspace(1, 0, int(2 * SR))
out *= fade[:, None]
out /= np.max(np.abs(out)) / 0.89

with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((out * 32767).astype("<i2").tobytes())
