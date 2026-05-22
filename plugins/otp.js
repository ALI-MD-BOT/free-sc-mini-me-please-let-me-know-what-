const { cmd } = require("../inconnuboy")
const axios = require("axios")

/* =========================
   SETTINGS
========================= */

const API_URL = "https://raza-king-api-2.vercel.app/api/api-2"
const JID = "120363424145002338@newsletter"

let running = false
let sent = new Set()

/* =========================
   COUNTRY FLAG HELPER
========================= */

function getFlag(number = "") {
    if (number.startsWith("+92")) return "🇵🇰"
    if (number.startsWith("+91")) return "🇮🇳"
    if (number.startsWith("+1")) return "🇺🇸"
    if (number.startsWith("+44")) return "🇬🇧"
    return "🌍"
}

/* =========================
   NUMBER MASKING
   Example: +923001234567 → +92300****567
========================= */

function maskNumber(num = "") {
    if (!num || num.length < 7) return num

    const start = num.slice(0, 5)      // first part
    const end = num.slice(-3)          // last 3 digits

    return `${start}****${end}`
}

/* =========================
   START OTP
========================= */

cmd({
    pattern: "start",
    react: "✅",
    category: "tools",
    desc: "Start OTP Forward",
    filename: __filename
},
async(conn, mek, m, { reply }) => {

if(running){
return reply("⚠️ Already Running")
}

running = true
reply("✅ OTP Forward Started")

while(running){

try{

const response = await axios.get(API_URL)
const data = response.data

if(!data.status) continue

const list = data.result || []

for(const v of list){

try{

const number = v.number || "Unknown"
const service = v.service || "Unknown"
const otp = v.otp || "N/A"

const uniqueId = number + otp
if(sent.has(uniqueId)) continue

const maskedNumber = maskNumber(number)
const flag = getFlag(number)

await conn.sendMessage(
JID,
{
text:
`🔐 OTP RECEIVED

📱 Number : ${flag} ${maskedNumber}
📲 Service : ${service}
🔑 OTP : ${otp}`
}
)

sent.add(uniqueId)

}catch(e){
console.log(e.message)
}

}

}catch(err){
console.log(err.message)
}

}

})

/* =========================
   STOP OTP
========================= */

cmd({
    pattern: "stop",
    react: "🛑",
    category: "tools",
    desc: "Stop OTP Forward",
    filename: __filename
},
async(conn, mek, m, { reply }) => {

running = false
reply("🛑 OTP Forward Stopped")

})
