// Koi - index.js
import { getActiveStatus, nowPlaying, isPlaying } from "./endpoints.js";
import { systrayInit } from "./systray.js";
import { hideConsole } from 'node-hide-console-window';
import config from "./config.json" with { type: "json" };
const { KoiToken, KoiBase } = config;

console.log("Koi - v1.1.0")
hideConsole();
async function checkCiderStatus() {
    try {
        const activeStatus = await getActiveStatus();
        if (activeStatus.status === "ok") {
            console.log("Cider is active");
            const playingStatus = await isPlaying();
            if (playingStatus.is_playing) {
                const nowPlayingData = await nowPlaying();
                if (nowPlayingData.status === "ok") {
                    console.log("Now playing:", nowPlayingData.info.name, "by", nowPlayingData.info.artistName);
                    await sendNowPlayingData(nowPlayingData.info);
                    await sendPlayingStatus(1);
                } else {
                    console.log("Failed to fetch");
                }
            } else {
                console.log("Cider is not playing any music");
                await sendPlayingStatus(0);
            }
        } else {
            console.log("Cider is not active");
            await sendPlayingStatus(-1);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function sendNowPlayingData(info) {
    try {
        const response = await fetch(KoiBase + "cache", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${KoiToken}`
            },
            body: JSON.stringify(info)
        });
        if (!response.ok) {
            throw new Error("Failed to send now playing data");
        }
        console.log("Now playing data sent successfully");
    } catch (error) {
        console.error("Error sending now playing data:", error);
    }
}

async function sendPlayingStatus(status) {
    try {
        const response = await fetch(KoiBase + "nowPlaying", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${KoiToken}`
            },
            body: JSON.stringify({ status })
        });
        if (!response.ok) {
            throw new Error("Failed to send playing status");
        }
        console.log("Playing status sent successfully");
    } catch (error) {
        console.error("Error sending playing status:", error);
    }
}
systrayInit();
setInterval(checkCiderStatus, 2500);
