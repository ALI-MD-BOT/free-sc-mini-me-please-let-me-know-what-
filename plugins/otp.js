/**
 * TEAM ZERO OTP SYSTEM
 * DIRECT FORWARD VERSION (NO FILTERS)
 */

const axios = require("axios");

let otpRunning = false;
let otpInterval = null;

const otpTargetJid = "120363425265766309@newsletter";

// =====================================
// YOUR API (Put your new API link here)
// =====================================
const OTP_API_URL = "https://raza-king-api-2.vercel.app/api/api-2";

// =====================================
// COUNTRY FLAGS
// =====================================
const country_db = {
  "1":"🇺🇸 USA/Canada",
  "7":"🇷🇺 Russia/Kazakhstan",
  "20":"🇪🇬 Egypt",
  "27":"🇿🇦 South Africa",
  "30":"🇬🇷 Greece",
  "31":"🇳🇱 Netherlands",
  "32":"🇧🇪 Belgium",
  "33":"🇫🇷 France",
  "34":"🇪🇸 Spain",
  "39":"🇮🇹 Italy",
  "44":"🇬🇧 UK",
  "49":"🇩🇪 Germany",
  "52":"🇲🇽 Mexico",
  "54":"🇦🇷 Argentina",
  "55":"🇧🇷 Brazil",
  "57":"🇨🇴 Colombia",
  "58":"🇻🇪 Venezuela",
  "60":"🇲🇾 Malaysia",
  "61":"🇦🇺 Australia",
  "62":"🇮🇩 Indonesia",
  "63":"🇵🇭 Philippines",
  "65":"🇸🇬 Singapore",
  "66":"🇹🇭 Thailand",
  "81":"🇯🇵 Japan",
  "82":"🇰🇷 South Korea",
  "84":"🇻🇳 Vietnam",
  "86":"🇨🇳 China",
  "90":"🇹🇷 Turkey",
  "91":"🇮🇳 India",
  "92":"🇵🇰 Pakistan",
  "93":"🇦🇫 Afghanistan",
  "94":"🇱🇰 Sri Lanka",
  "95":"🇲🇲 Myanmar",
  "98":"🇮🇷 Iran",
  "212":"🇲🇦 Morocco",
  "213":"🇩🇿 Algeria",
  "216":"🇹🇳 Tunisia",
  "218":"🇱🇾 Libya",
  "220":"🇬🇲 Gambia",
  "221":"🇸🇳 Senegal",
  "222":"🇲🇷 Mauritania",
  "223":"🇲🇱 Mali",
  "224":"🇬🇳 Guinea",
  "225":"🇨🇮 Ivory Coast",
  "226":"🇧🇫 Burkina Faso",
  "227":"🇳🇪 Niger",
  "228":"🇹🇬 Togo",
  "229":"🇧🇯 Benin",
  "230":"🇲🇺 Mauritius",
  "231":"🇱🇷 Liberia",
  "232":"🇸🇱 Sierra Leone",
  "233":"🇬🇭 Ghana",
  "234":"🇳🇬 Nigeria",
  "237":"🇨🇲 Cameroon",
  "242":"🇨🇬 Congo",
  "243":"🇨🇩 DR Congo",
  "249":"🇸🇩 Sudan",
  "250":"🇷🇼 Rwanda",
  "251":"🇪🇹 Ethiopia",
  "252":"🇸🇴 Somalia",
  "254":"🇰🇪 Kenya",
  "255":"🇹🇿 Tanzania",
  "256":"🇺🇬 Uganda",
  "263":"🇿🇼 Zimbabwe",
  "264":"🇳🇦 Namibia",
  "267":"🇧🇼 Botswana",
  "351":"🇵🇹 Portugal",
  "352":"🇱🇺 Luxembourg",
  "353":"🇮🇪 Ireland",
  "354":"🇮🇸 Iceland",
  "355":"🇦🇱 Albania",
  "356":"🇲🇹 Malta",
  "357":"🇨🇾 Cyprus",
  "358":"🇫🇮 Finland",
  "359":"🇧🇬 Bulgaria",
  "370":"🇱🇹 Lithuania",
  "371":"🇱🇻 Latvia",
  "372":"🇪🇪 Estonia",
  "373":"🇲🇩 Moldova",
  "374":"🇦🇲 Armenia",
  "375":"🇧🇾 Belarus",
  "380":"🇺🇦 Ukraine",
  "381":"🇷🇸 Serbia",
  "385":"🇭🇷 Croatia",
  "420":"🇨🇿 Czech Republic",
  "421":"🇸🇰 Slovakia",
  "500":"🇫🇰 Falkland Islands",
  "501":"🇧🇿 Belize",
  "502":"🇬🇹 Guatemala",
  "503":"🇸🇻 El Salvador",
  "504":"🇭🇳 Honduras",
  "505":"🇳🇮 Nicaragua",
  "506":"🇨🇷 Costa Rica",
  "507":"🇵🇦 Panama",
  "509":"🇭🇹 Haiti",
  "591":"🇧🇴 Bolivia",
  "592":"🇬🇾 Guyana",
  "593":"🇪🇨 Ecuador",
  "595":"🇵🇾 Paraguay",
  "597":"🇸🇷 Suriname",
  "598":"🇺🇾 Uruguay",
  "673":"🇧🇳 Brunei",
  "675":"🇵🇬 Papua New Guinea",
  "676":"🇹🇴 Tonga",
  "679":"🇫🇯 Fiji",
  "680":"🇵🇼 Palau",
  "685":"🇼🇸 Samoa",
  "686":"🇰🇮 Kiribati",
  "691":"🇫🇲 Micronesia",
  "692":"🇲🇭 Marshall Islands",
  "850":"🇰🇵 North Korea",
  "852":"🇭🇰 Hong Kong",
  "853":"🇲🇴 Macau",
  "855":"🇰🇭 Cambodia",
  "856":"🇱🇦 Laos",
  "880":"🇧🇩 Bangladesh",
  "886":"🇹🇼 Taiwan",
  "960":"🇲🇻 Maldives",
  "961":"🇱🇧 Lebanon",
  "962":"🇯🇴 Jordan",
  "963":"🇸🇾 Syria",
  "964":"🇮🇶 Iraq",
  "965":"🇰🇼 Kuwait",
  "966":"🇸🇦 Saudi Arabia",
  "967":"🇾🇪 Yemen",
  "968":"🇴🇲 Oman",
  "970":"🇵🇸 Palestine",
  "971":"🇦🇪 UAE",
  "972":"🇮🇱 Israel",
  "973":"🇧🇭 Bahrain",
  "974":"🇶🇦 Qatar",
  "975":"🇧🇹 Bhutan",
  "976":"🇲🇳 Mongolia",
  "977":"🇳🇵 Nepal",
  "992":"🇹🇯 Tajikistan",
  "993":"🇹🇲 Turkmenistan",
  "994":"🇦🇿 Azerbaijan",
  "995":"🇬🇪 Georgia",
  "996":"🇰🇬 Kyrgyzstan",
  "998":"🇺🇿 Uzbekistan"
};

// =====================================
// COUNTRY FINDER
// =====================================
function getCountry(num) {
  const d = String(num).replace(/[^0-9]/g, '');
  for (let l = 4; l > 0; l--) {
    const prefix = d.substring(0, l);
    if (country_db[prefix]) {
      return country_db[prefix];
    }
  }
  return "🌍 Unknown";
}

// =====================================
// HIDE NUMBER
// =====================================
function hideNumber(num) {
  const clean = String(num).replace(/[^0-9]/g, '');
  if (clean.length > 7) {
    return (
      clean.substring(0, 4) +
      "•••" +
      clean.substring(clean.length - 4)
    );
  }
  return clean;
}

// =====================================
// NEW API PARSER (BASED ON YOUR IMAGE)
// =====================================
function parseApiResponse(data) {
  let records = [];
  try {
    let resObj = data;
    if (typeof data === "string") {
      resObj = JSON.parse(data);
    }

    // Direct extraction from result list shown in your screenshot
    if (resObj && Array.isArray(resObj.result)) {
      for (const item of resObj.result) {
        records.push({
          time: new Date().toLocaleTimeString(), 
          number: item.number || "",
          service: item.service || "Unknown",
          message: item.full_message || "",
          otp: item.otp || "N/A" // Takes OTP directly from your API response field
        });
      }
    }
  } catch (err) {
    console.log("PARSE ERROR:", err.message);
  }
  return records;
}

// =====================================
// DISPATCH ALERT
// =====================================
async function dispatchSmsAlert(sock, service, number, message, date, otpCode) {
  const cleanNum = String(number).replace(/[^0-9]/g, '');
  const rawMsg = message || "";
  const country = getCountry(cleanNum);

  const caption = `🌸 *TEAM ZERO OTP ZONE*

━━━━━━━━━━━━━━━━━━

🕒 Time:
${date}

🌍 Country:
${country}

📱 Number:
${hideNumber(cleanNum)}

🛠 Service:
${service}

━━━━━━━━━━━━━━━━━━

🔥 OTP CODE:
${otpCode}

━━━━━━━━━━━━━━━━━━

📩 MESSAGE:
${rawMsg}

━━━━━━━━━━━━━━━━━━

🌸 TEAM ZERO™`;

  try {
    await sock.sendMessage(
      otpTargetJid,
      { text: caption },
      { newsletter: otpTargetJid.endsWith("@newsletter") }
    );
  } catch (err) {
    console.log("SEND ERROR:", err.message);
  }
}

// =====================================
// MODULE EXPORT
// =====================================
module.exports = {
  name: 'otp',
  aliases: [],
  category: 'dev',
  ownerOnly: true,

  async execute(sock, msg, args, extra) {
    const sub = (args[0] || "").toLowerCase();

    // =================================
    // OTP START
    // =================================
    if (sub === "start") {
      if (otpRunning) {
        return extra.reply("⚠️ OTP System Already Running");
      }

      otpRunning = true;
      await extra.reply("🚀 OTP System Started Successfully");

      otpInterval = setInterval(async () => {
        try {
          if (!otpRunning) return;

          const res = await axios.get(OTP_API_URL, {
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 10000
          });

          const parsed = parseApiResponse(res.data);

          // Forwards everything exactly as it comes from your API response
          for (const rec of parsed) {
            if (!rec.number) continue;

            await dispatchSmsAlert(
              sock,
              rec.service,
              rec.number,
              rec.message,
              rec.time,
              rec.otp
            );
          }
        } catch (e) {
          console.log("OTP API ERROR:", e.message);
        }
      }, 10000); 
    }

    // =================================
    // OTP STOP
    // =================================
    else if (sub === "stop") {
      if (!otpRunning) {
        return extra.reply("⚠️ OTP System Already Stopped");
      }

      otpRunning = false;
      clearInterval(otpInterval);
      otpInterval = null;

      return extra.reply("🛑 OTP System Stopped");
    }
  }
};
