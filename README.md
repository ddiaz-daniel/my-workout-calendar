# 🏋️ My Workout Calendar

A personal workout tracker for training at home with **one kettlebell, a mat, and a chair**. No gym and no bench needed. It's built with Expo and React Native and runs in **Expo Go**.

Pick a plan, follow the cards, tap **End Session**, and the workout shows up on your calendar and in your stats.

## ✨ Features

- **📅 Calendar home.** Every day you trained is marked, and you see a count for the month.
- **🔁 Three rotating plans.** Each one trains at least two muscle groups:
  | Plan | Focus | Exercises |
  | --- | --- | --- |
  | **A** | Legs + Core | Goblet squat, KB swing, reverse lunge, glute bridge, plank, dead bug |
  | **B** | Push + Shoulders | Push-up, pike push-up, KB overhead press, KB floor press, diamond push-up |
  | **C** | Back + Arms | KB row, KB high pull, superman, KB curl, chair dip, hollow hold |
- **⭐ Daily recommendation.** The app suggests the plan after your last one (A → B → C), but you can pick any plan.
- **🧘 Pilates block.** Mat Pilates moves chosen to match the session's muscle groups.
- **🔥 Abs finisher.** A high-intensity core burner at the end of every session.
- **🖼️ Exercise cards.** Animated frames, sets × reps and rest time. Tap a card for step-by-step instructions, tips, and a video link.
- **✅ End-session confirmation.** The app asks "Did you really finish the workout?" before logging. Leaving early asks before discarding.
- **📊 Profile stats.** Total workouts, current and longest streak, this week and month, total and average time, sets done, an 8-week chart, muscle-group breakdown, and recent sessions.
- **📱 Offline and private.** Everything is stored on your device with AsyncStorage. There's no account and no backend.

## 🧱 Tech stack

- [Expo](https://expo.dev) SDK 58 + [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routes in `src/app`)
- React Native + TypeScript (strict)
- [NativeWind](https://www.nativewind.dev) (Tailwind CSS for React Native)
- `react-native-calendars`, `expo-image`, `expo-web-browser`
- `@react-native-async-storage/async-storage` for persistence
- EAS Update to publish builds that load in Expo Go

## 🚀 Getting started

```bash
git clone https://github.com/ddiaz-daniel/my-workout-calendar.git
cd my-workout-calendar
npm install
npx expo start
```

Scan the QR code with **Expo Go**. On iOS, use the Camera app. Your phone and computer must be on the same Wi-Fi.

### Run it without a computer (EAS Update)

`runtimeVersion` is set to `exposdk:58.0.0`, so published updates load directly in Expo Go:

```bash
eas update --branch main --environment production --message "..."
```

Open the `exp://u.expo.dev/update/<group-id>` link it prints, either in Expo Go or via the dashboard QR code. To use your own Expo account, replace `extra.eas.projectId`, `owner` and `updates.url` in `app.json`.

## 📁 Project structure

```
src/
  app/                  Expo Router screens
    (tabs)/index.tsx    Home: calendar, plan picker, Start Session
    (tabs)/profile.tsx  Stats
    session.tsx         Active session: main, Pilates, abs finisher
    exercise/[id].tsx   How-to modal
  components/           ExerciseCard, ExerciseMedia, StatTile
  data/                 exercises, plans, media, videos
  lib/                  dates, stats (pure functions)
  store/                WorkoutContext (state + AsyncStorage)
assets/exercises/       Bundled exercise images (+ CREDITS.md)
```

### Customize your workouts

- **Exercises** live in `src/data/exercises.ts`: sets, reps, rest, steps, and tips.
- **Plans, the Pilates blocks, and the abs finisher** are in `src/data/plans.ts`.
- **Images and videos** map by exercise id in `src/data/media.ts` and `src/data/videos.ts`.

## 🙏 Credits

- Most exercise images come from [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (public domain).
- Some come from Wikimedia Commons. See [`assets/exercises/CREDITS.md`](assets/exercises/CREDITS.md) for authors and licenses.
- A few images are loaded from their original websites, and the videos link to YouTube. Both stay with their owners.

## ⚠️ Disclaimer

This is a personal project, not medical or professional training advice. Warm up, use a weight you can control, and stop if something hurts.
