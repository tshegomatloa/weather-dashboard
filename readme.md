# ICE Task 4 – Weather Dashboard & UI Debugging

**Student:** Tshegofatso Matloa
**Student number:** ST10525836
**Module:** Mobile App Scripting (MAST5112)

---

## 1. Introduction

The Weather Dashboard is a React Native mobile application that displays hardcoded weather information for three South African cities: Johannesburg, Cape Town and Durban. The user selects a city with the buttons at the top of the screen, and the dashboard updates to show that city's current weather (with a background image), additional weather details, a 24-hour forecast, a five-day forecast and Sun & Moon information.

The supplied `App.tsx` contained intentional errors. Some stopped the app from running at all, while others caused parts of the interface to display incorrectly, show the wrong data, or not appear. This task involved running the supplied app, investigating its behaviour, identifying each error, correcting it in `App.tsx`, and testing the result on an Android emulator. All fixes were made in `App.tsx` only, without redesigning the application.

---

## 2. Development Environment

| Tool | Details |
|---|---|
| Framework | Expo (SDK 54, `expo@54.0.36`) |
| UI library | React Native |
| Language | TypeScript |
| Editor | Visual Studio Code |
| Machine | Institutional VM (Windows, Azure remote desktop) |
| Emulator | BlueStacks 5 |
| Test app | Expo Go (inside BlueStacks 5) |
| Version control | Git and GitHub (private repository) |

The project was created with `npx create-expo-app -t expo-template-blank-typescript@sdk-54`. The supplied `App.tsx` was pasted in unchanged and committed before any corrections were made, so the commit history shows each fix separately.

---

## 3. Error Log

| # | Location | Problem | Error Type | Correction |
|---|---|---|---|---|
| 1 | App.tsx – imports | `<ImageBackground>` was used in the JSX but was not included in the `react-native` import. TypeScript reported *Cannot find name 'ImageBackground'*, and the app crashed on launch with a Render Error: *Property 'ImageBackground' doesn't exist*. | Import / Runtime | Added `ImageBackground` to the import list from `react-native`. |
| 2 | App.tsx – `ImageBackground` `source` prop | `source={selectedWeather.backgroundImage}` passed a plain URL string. React Native's `source` prop requires an object with a `uri` key for remote images, so the background could not load. | Component property / Image | Changed to `source={{ uri: selectedWeather.backgroundImage }}`. |
| 3 | App.tsx – city selector buttons | The buttons compared and set `weather.country` instead of `weather.city`. Every city's country is "South Africa", so tapping any button set `selectedCity` to "South Africa". `.find()` then returned nothing and the whole app switched to "Weather information unavailable". No button was ever highlighted, because `'Johannesburg' === 'South Africa'` is always false. | State / Logic | Replaced `weather.country` with `weather.city` in the `onPress` handler and in both conditional style checks (button and button text). |
| 4 | App.tsx – `WeatherDetail` component | The value `<Text>` rendered `{label}` instead of `{value}`, so every detail card showed its label twice (e.g. "Humidity / Humidity"). The `value` prop was received but never used. | Component props / Text | Changed the second `<Text>` to render `{value}`. This also fixed the Sun & Moon cards, which use the same component. |
| 5 | App.tsx – Humidity detail | The Humidity card used `selectedWeather.feelsLike` instead of `selectedWeather.humidity`, so it displayed the feels-like temperature as a percentage (25% instead of 42% for Johannesburg). | Object property / Incorrect information | Changed the value to `` `${selectedWeather.humidity}%` ``. |
| 6 | App.tsx – `styles.detailItem` | `width: '100%'` forced each detail onto its own row. The parent `currentDetails` is set up as a wrapping grid (`flexDirection: 'row'`, `flexWrap: 'wrap'`, `justifyContent: 'space-between'`), so the intended two-column layout never appeared and the card was unnecessarily long. | Layout / Dimensions | Changed `width` to `'48%'` so two items fit side by side. |
| 7 | App.tsx – `styles.weatherHero` | `height: 170` was too small for the hero's content (city name, country, 52px icon, 56px temperature and condition). With `overflow: 'hidden'`, the city name and condition were clipped off. | Dimensions / Layout | Increased `height` to `300`. |
| 8 | App.tsx – `styles.heroOverlay` | The overlay colour `rgba(0, 0, 0, 0.05)` was only 5% black, so it barely darkened the photo. The white text was hard to read over bright parts of the background images. | Colours / Styling | Changed the overlay to `rgba(0, 0, 0, 0.35)` to improve contrast. |
| 9 | App.tsx – `weatherData` `backgroundImage` URLs | The Johannesburg image showed the Taj Mahal (India) and the Durban image showed a living-room interior. Neither matched the selected city or its weather, so the background was not appropriate. Cape Town's image (Table Mountain) was correct. | Images / Data | Replaced the Johannesburg URL with a Johannesburg skyline photo (sunny) and the Durban URL with a Durban skyline under an overcast sky (mostly cloudy). Cape Town was left unchanged. |
| 10 | App.tsx – 24-hour forecast `ScrollView` | `horizontal={false}` made the 24 narrow (78px) hourly cards stack vertically down the screen instead of forming a swipeable row. The other props (`showsHorizontalScrollIndicator`, `horizontalContent`) show that horizontal scrolling was intended. | Scrolling / Component property | Changed to `horizontal={true}`. |
| 11 | App.tsx – hourly forecast `.map()` | Each hourly card rendered `selectedWeather.temperature` (the city's current temperature) instead of `hour.temperature`, so all 24 hours showed the same value. | Array rendering / Incorrect information | Changed to `{hour.temperature}°`. |
| 12 | App.tsx – five-day forecast `.map()` | The arrow function used curly braces `{ }` with no `return`, so each card's JSX was created and discarded. `.map()` returned an array of `undefined` and the five-day section was empty. TypeScript reported *Type 'void[]' is not assignable to type 'ReactNode'*. | Syntax / Array rendering | Changed `(day) => { ... }` to `(day) => ( ... )` so the JSX is returned implicitly, and removed the stray semicolon after `</View>`. |
| 13 | App.tsx – five-day temperatures | The bold `highTemperature` text showed `day.low` and the grey `lowTemperature` text showed `day.high`, so the values were swapped (e.g. Monday showed 16° / 25° instead of 25° / 16°). | Object property / Incorrect information | Swapped them so `highTemperature` shows `day.high` and `lowTemperature` shows `day.low`. |
| 14 | App.tsx – `styles.dailyCard` | `flexDirection: 'column'` stacked each day's information vertically. The children have fixed widths (`dayName` 45, `dailyIcon` 45, `dailyTemperatures` 90) and the condition uses `flex: 1`, which only makes sense in a horizontal row. | Layout / Alignment | Changed to `flexDirection: 'row'`, so each day shows on one line: day, icon, high/low and condition. |
| 15 | App.tsx – Sun & Moon, Sunrise | The Sunrise card used `selectedWeather.sunset`, so Sunrise and Sunset both showed 18:12 for Johannesburg. | Object property / Incorrect information | Changed the value to `selectedWeather.sunrise` (05:32 for Johannesburg). |
| 16 | App.tsx – `styles.sunMoonCard` | After fix #6, the shared `detailItem` style is 48% wide. The Sun & Moon card had no row/wrap layout, so its items stacked in a narrow column on the left half of the card. | Layout / Spacing | Added `flexDirection: 'row'`, `flexWrap: 'wrap'` and `justifyContent: 'space-between'` so the Sun & Moon items form the same two-column grid as the details card. |

---

## 4. Testing

The supplied app was run first in Expo Go on BlueStacks 5 to record its original behaviour (Render Error: *Property 'ImageBackground' doesn't exist*). Each group of fixes was tested on the emulator straight after it was made, using Expo's fast refresh, and committed to Git. The final version was then tested end to end.

| Test | What was checked | Result |
|---|---|---|
| 1 – Initial application | App launches with no errors, the dashboard displays with Johannesburg selected and highlighted, and VS Code shows no TypeScript problems. | Pass |
| 2 – City selection | Selected Johannesburg, Cape Town and Durban in turn. The button highlight, city name, temperature, condition, background image and all detail values changed to match the selected city (e.g. Durban: 26°, Mostly Cloudy, Humidity 76%, Wind 15 km/h NE). | Pass |
| 3 – Hourly forecast | The 24-hour forecast scrolls horizontally through all 24 entries, each showing its own time, icon and temperature (e.g. Johannesburg 10 AM 24°, 1 PM 27°, 3 AM 13°). | Pass |
| 4 – Five-day forecast | Five days (Mon to Fri) display in rows with day, icon, condition, and high and low temperatures in the correct order. Values change with the city. | Pass |
| 5 – Sun & Moon | Sunrise, sunset, moonrise, moonset and moon phase all display with the correct values for each city (e.g. Johannesburg sunrise 05:32, sunset 18:12; Cape Town sunrise 06:18; Durban sunrise 05:05). | Pass |
| 6 – Complete interface | Scrolled through the whole app for each city. All sections are visible, spaced consistently and usable on the emulator screen. | Pass |

**Observation:** in BlueStacks 5, the emoji weather icons (☀️ 🌤️ 🌙 etc.) render as very small dots, in both the hero (`fontSize: 52`) and the hourly forecast (`fontSize: 27`). The icon data and `<Text>` rendering in `App.tsx` are correct, and the identical result at two different font sizes points to the emulator's emoji rendering rather than an error in the application code.

---

## 5. Screenshot

**Completed Weather Dashboard running in BlueStacks 5 using Expo Go:**

<img width="728" height="986" alt="Screenshot 2026-10-07 at 20 00 38" src="https://github.com/user-attachments/assets/d4b16760-52a8-4729-abb6-588d3cdc3dfd" />
<img width="728" height="986" alt="Screenshot 2026-10-07 at 20 00 30" src="https://github.com/user-attachments/assets/2c8086ed-e5d5-4638-a13a-958ce96389ee" />
<img width="728" height="986" alt="Screenshot 2026-10-07 at 19 51 00" src="https://github.com/user-attachments/assets/62299edd-3da0-4eef-aad0-a07709ae2e0e" />


**Supplied application before corrections (for comparison):**

<img width="1060" height="1042" alt="Screenshot 2026-10-07 at 13 30 01" src="https://github.com/user-attachments/assets/761123d7-7efb-45c0-8fd5-fdc037d5337c" />

<img width="728" height="986" alt="Screenshot 2026-10-07 at 18 49 21" src="https://github.com/user-attachments/assets/b85918a3-c406-4698-b78a-4a2ed778ade6" />
<img width="728" height="986" alt="Screenshot 2026-10-07 at 18 56 27" src="https://github.com/user-attachments/assets/1e9553ba-89db-4d86-803d-25db7eb07d9f" />

---

## 6. Conclusion

Debugging the Weather Dashboard showed me that an app compiling and running is not the same as an app working correctly. Only the first two errors stopped the app from launching. Most of the others, such as the swapped high and low temperatures, the sunrise showing the sunset time, and every hourly card repeating the current temperature, were only visible by comparing the interface against the data. I learned to read TypeScript errors carefully: the `void[]` message pointed directly at the missing return in the five-day `.map()`. I also saw how small details in React Native styling, such as one `flexDirection` value, a percentage width or a fixed height with `overflow: 'hidden'`, can change or hide an entire section. Testing each fix on the emulator straight away and committing in small steps made it easy to confirm what each change did and to catch a mistake I introduced myself while editing.
