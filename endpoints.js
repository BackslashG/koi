import config from "./config.json" with { type: "json" };
const { token, requireToken } = config;
const base = "http://localhost:10767/" 

function isPlaying() {
    return fetch(base + "api/v1/playback/is-playing", {
        method: "GET",
        headers: {
            ...(requireToken ? { "apptoken": token } : {}),
        },
    })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
        if (error.message && error.message.includes("ECONNREFUSED")) {
            return { status: "error" };
        } else {
            console.error('Error:', error);
            return { status: "error", message: error.message };
        }
    });
}

function getActiveStatus() {
    return fetch(base + "api/v1/playback/active", {
        method: "GET",
        headers: {
            ...(requireToken ? { "apptoken": token } : {}),
        },
    })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
        if (error.message && error.message.includes("ECONNREFUSED")) {
            return { status: "error" };
        } else {
            console.error('Error:', error);
            return { status: "error", message: error.message };
        }
    });
}

function nowPlaying() {
    return fetch(base + "api/v1/playback/now-playing", {
        method: "GET",
        headers: {
            ...(requireToken ? { "apptoken": token } : {}),
        },
    })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
        if (error.message && error.message.includes("ECONNREFUSED")) {
            return { status: "error" };
        } else {
            console.error('Error:', error);
            return { status: "error", message: error.message };
        }
    });
}

export { getActiveStatus, nowPlaying, isPlaying };