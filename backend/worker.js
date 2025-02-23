/**
 * Koi Cloudflare Worker
 * i used alot of AI on this LOL
 */

const AUTH_TOKEN = "THIS_TOKEN_MUST_MATCH_YOUR_KOITOKEN_IN_YOUR_CONFIG.JSON_FILE";

const addCorsHeaders = (response) => {
    const headers = new Headers(response.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
};

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        if (method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                },
            });
        }

        const isAuthorized = () => {
            const authHeader = request.headers.get("Authorization");
            return authHeader === AUTH_TOKEN;
        };

        let response;
        if (method === "GET") {
            if (path === "/cache") {
                const stream = new ReadableStream({
                    async start(controller) {
                        try {
                            while (true) {
                                const cacheValue = await env.DATA_KV.get("cache");
                                const data =
                                    "data: " +
                                    (cacheValue || JSON.stringify({})) +
                                    "\n\n";
                                controller.enqueue(new TextEncoder().encode(data));
                                await new Promise((resolve) => setTimeout(resolve, 5000));
                            }
                        } catch (err) {
                            console.error("SSE stream error:", err);
                            controller.error(err);
                        }
                    },
                });
                response = new Response(stream, {
                    headers: {
                        "Content-Type": "text/event-stream",
                        "Cache-Control": "no-cache",
                        "Connection": "keep-alive",
                    },
                });
            } else if (path === "/nowPlaying") {
                const nowPlayingValue = await env.DATA_KV.get("nowPlaying");
                response = new Response(nowPlayingValue || JSON.stringify({}), {
                    headers: { "Content-Type": "application/json" },
                });
            } else {
                response = new Response("Not Found", { status: 404 });
            }
        } else if (method === "POST") {
            if (!isAuthorized()) {
                response = new Response("Unauthorized", { status: 401 });
            } else {
                let requestData;
                try {
                    requestData = await request.json();
                } catch (error) {
                    response = new Response("Invalid JSON", { status: 400 });
                }

                if (path === "/cache") {
                    await env.DATA_KV.put("cache", JSON.stringify(requestData));
                    response = new Response("Cache updated successfully", { status: 200 });
                } else if (path === "/nowPlaying") {
                    await env.DATA_KV.put("nowPlaying", JSON.stringify(requestData));
                    response = new Response("Now Playing status updated successfully", { status: 200 });
                } else {
                    response = new Response("Not Found", { status: 404 });
                }
            }
        } else {
            response = new Response("Method Not Allowed", { status: 405 });
        }

        return addCorsHeaders(response);
    },
};
