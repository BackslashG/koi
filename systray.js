// systray.js
import { SysTray } from "node-systray-v2";
import config from "./config.json" with { type: "json" };
import { showConsole } from "node-hide-console-window";
const ICON = "AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/222Dv9psVz/arKc/2qyzP9psu3+arH9/2qx/f9qsuz/arLM/2qynP9psVz/YrENAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/2y1Lf9pspv/arL9/2uy//9qsv//arL//2qy//9qsv/+arL//2qy//9qsv//arL//2qy//9qsf3/arKc/2ywLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP9qsov/arL//2qy//9rsv//arP//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv/+arL//2qy//9qsv//arP//2qzjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP9ssC3/arLM/2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9rsv//a7L//2qy//9qsv//arL//mqy//9qsv//arL//2qyzP9ssC0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/arI8/2qy7P9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qz//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2my7f9psD0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/2ywLf9qsuz/arL//2qy//9qs///arL//2qy//9rsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv/+arL//2uy7f9ssC0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/arLM/2qy//5qsv//arL//2qy//9qsv//arL//2qy//9qsv//arP//2qy//9qsv//arL//2qy//9qsv/+arL//2qy//9qsv//arP//2qy//9qsv//arP//2qy//9qsv//arL//2qyzAAAAAAAAAAAAAAAAAAAAAAAAAAA/2qwi/9qsv//arL//2qy//9rsv//arL//2qy//9qsv//a7L//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qs///a7L//2qy//9qsv//arP//2qy//9qsv//arL//2qyiwAAAAAAAAAAAAAAAP9sqi3/arL//2qy//9qsv//arL//2qy//+Rxv//7/f/////////////9/v//6DO//9qsv//arL//2qy//9qs///arL//mqy//+Pxf//5/P//////////////v////r9///C3///crb//2qy//9qsv/+a7L//2i0LAAAAAAAAAAA/Wmym/9qsv//arL//2qy//9rsv//a7L//5HG///v9//////////////3+///oc7//2qy//9qsv//arL//mqy//9qsv//lcj//+n0//////////7////////6/f//utv//2qy//9qsv//arL//2uy//9qs//9a7KbAAAAAP9isQ3/arH9/2qy//9qsv//arL//2qy//9qsv//kcb//u/3//////////////f7//+gzv//a7L//2qy//9qsv//arL//5XI///t9v////////////7////++v3//7rb//9qsv//arL//2qy//9qsv//arL//2qz//9qsf3/bbYO/2mxXP5qsv//arL//2qz//9qsv//a7L//2qy//+Rxv//7/f/////////////9/v//6DO//9rsv//arP//2qy//+VyP//7fb////////+/////////vr8//+32v//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qs1v/arKc/2qy//9qsv//arL//2qz//9qsv//arL//5HG///v9//////////////3+///oM7//2qy//9qsv//mMr//+/3///+///////////////3+///tNj//2qy//9qsv//arL//2qy//9rsv//a7L//2qy//9qsv//arL//2mym/9qssz/arL//2qy//9qsv/+arL//2qy//9qsv/+kcb//+/3//////////////j7//+m0f//arL//6DO///w9//+/////v//////////9/v//rTY//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arPM/2my7f9qsv//arL//2qz//9rsv//arL//2uy//+Rxv//7/f///////////////////X6///A3v//8Pf///////////////////b6//+v1v//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9rs///a7L//2qy//9psO3/arH9/2qy//9qsv//arL//muy//9qsv//arL//5HG///v9//////////////////+/////v7////////////////////2+v//qtP//2qy//9rsv/+arL//2uy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qx/f9qsf3/arP//2qy//5rsv//arL//2qy//9qsv//kcb//+/3//////////////7//////////v///////////v//9vr//6fR//9rsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv/+a7P//2qy//9qsv//arL9/2qy7P9qsv//arL//2qy//9qsv/+arL//2qy//+Rxv//7/b/////////////+/3///X6///////////////////r9f//oM7//2qy//9qsv//arL//2qy//5qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsez/arLM/2qy//9qsv//arL//2qy//9rsv//arL//5HG//7v9//////////////3+///qdP//9vt///+///////////////3+///t9r//mqy//9rsv//arL//2qy//9qsv/+arL//2qz//9qsv//a7L//2uy//9qsv//arL//2qyzP9qspz+arL//2qy//9qsv//arL//2qy//9qsv//kcb//+/3//////////////f7//+gzv//crb//8bh///7/f////////7////9/v//zeX//3K2//9qsv//arL//2qy//9qsv//arP//2qz//9rsv//arL//2qy//9rsv//abKb/2mxXP9qsv/+arL//2qy//9qsv//arL//2uy//+Rxv//7/f////////+////9/v//6DP//9qsv//a7L//67W///1+v/////////////+////4O///4vC//9qsv//arL//2qy//9qsv//arL//2qz//9qsv//arL//2qy//9psVz/bbYO/mqy/f9qsv//arL//2qy//9qsv/+arL//5HG///v9//+///////////3+///oM7//2qy//9qsv//arL//4/F///m8v///v//////////////7/f//6HO//9rsv/+arL//2qy//5qsv//arL//2qy//9qsv//arL9/3axDQAAAAD/arKc/2qz//9qsv//arL//2qy//9qsv//kcb//+/3//////////////f7//+gzv//arL//2qy//9qsv//arL//3q6///U6f///f7////////////+9/v//7fa//9qsv//arL//2qy//9qsv//arL//2qy//9qspwAAAAAAAAAAP9ssC3/a7P//2qy//9qsv//arL//mqz//+Rxv//7/f/////////////9/r//6DO//9qsv//arL//2qy//9qsv//arL//2uy//6+3f//9/v//////////////f7//9Tp//96uv//arL//2qy//9qsv//arL//2awLQAAAAAAAAAAAAAAAP9qsov/arL//2qy//9qsv//arL//3K2//+ay///oM7//6DO//+czf//err//2qy//9qsv//arL//2uy//9rsv//arL//2qy//+Jwv//oM7//qDO//+gzv//n83//4O///9qsv//arL//2qy//1ssosAAAAAAAAAAAAAAAAAAAAAAAAAAP9qs8z/arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv//a7L//2qy//9qsv//abLMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/2awLf9qsuz/arL//2qy//9qsv//arL//muy//9qsv//arP//2qy//9qsv//arL//2qy//9qsv//arP//2qy//5qsv//arL//2qy//9qsv/+arP//2qy//9qsv//arL//2my7f9ssC0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/2qyPP9qsuz/arL//2qy//9qsv//arL//2qy//9qsv//arL//2qy//9qsv/+arL//2qy//5qsv//arL//2uy//5qsv//arL//2qy//9qsv//arL//2qy//9psu3/ZLA9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/2i0LP9qs8z/a7L//2qy//9qsv//arL//2qy//9qsv//a7L//2qy//9qsv//arL//2qy//9qsv//a7L//2qy//5qsv//a7L//2qy//5qsv//arLM/260LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP9ssov/arL//mqy//9qsv//arL//2qy//5qsv//arL//2qy//9rsv//arL//2qy//9qsv//arL//2qz//9qsv//arL//2qxjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPlssC3/a7Ob/2qy/f9qsv//arL//2qy//9qsv//arL//mqy//9qsv//arL//2qy//9qsv//arH9/2uym/lssC0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/drEN/2mxXP9pspv/arLM/2my7f9qsv3/arH9/2mw7f9qssz/abKb/2mxXP9ttg4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8AD//8AAP/+AAB/+AAAH/AAAA/gAAAH4AAAB8AAAAOAAAABgAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAGAAAABwAAAA+AAAAfgAAAH8AAAD/gAAB/+AAB//wAA///AA/8="
function systrayInit() {
    console.log("Initializing systray...");
    const systray = new SysTray({
        menu: {
            icon: ICON,
            title: 'Koi',
            tooltip: 'Koi - your Cider status, anywhere',
            items: [
                {
                    title: 'Koi - v1.1.0',
                    tooltip: "koi",
                    // checked is implement by plain text in linux
                    checked: false,
                    enabled: false,
                },
                {
                    title: 'Show Console',
                    tooltip: 'bb',
                    checked: false,
                    enabled: true,
                },
                {
                    title: 'Exit',
                    tooltip: 'bb',
                    checked: false,
                    enabled: true,
                },
            ],
        },
        debug: false,
        copyDir: true, // copy go tray binary to outside directory, useful for packing tool like pkg.
    });

    systray.onClick((action) => {
        if (action.seq_id === 0) {
            systray.sendAction({
                type: 'update-item',
                item: {
                    ...action.item,
                    checked: !action.item.checked,
                },
                seq_id: action.seq_id,
            });
        } else if (action.seq_id === 1) {
            showConsole();
        } else if (action.seq_id === 2) {
            process.exit()
        }
    });
}

export { systrayInit };