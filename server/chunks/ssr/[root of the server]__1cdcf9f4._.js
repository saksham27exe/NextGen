module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/hooks/use-toast.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "reducer": (()=>reducer),
    "toast": (()=>toast),
    "useToast": (()=>useToast)
});
// Inspired by react-hot-toast library
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(memoryState);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        listeners.push(setState);
        return ()=>{
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}
;
}}),
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}}),
"[project]/src/components/ui/toast.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toast": (()=>Toast),
    "ToastAction": (()=>ToastAction),
    "ToastClose": (()=>ToastClose),
    "ToastDescription": (()=>ToastDescription),
    "ToastProvider": (()=>ToastProvider),
    "ToastTitle": (()=>ToastTitle),
    "ToastViewport": (()=>ToastViewport)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const ToastProvider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"];
const ToastViewport = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, this));
ToastViewport.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"].displayName;
const toastVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background text-foreground",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Toast = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(toastVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
});
Toast.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
const ToastAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Action"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, this));
ToastAction.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Action"].displayName;
const ToastClose = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/toast.tsx",
            lineNumber: 86,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, this));
ToastClose.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"].displayName;
const ToastTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, this));
ToastTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"].displayName;
const ToastDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm opacity-90", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 107,
        columnNumber: 3
    }, this));
ToastDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"].displayName;
;
}}),
"[project]/src/components/ui/toaster.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toaster": (()=>Toaster)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/toast.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function Toaster() {
    const { toasts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastProvider"], {
        children: [
            toasts.map(function({ id, title, description, action, ...props }) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toast"], {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastTitle"], {
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/toaster.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastDescription"], {
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/toaster.tsx",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/toaster.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        action,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastClose"], {}, void 0, false, {
                            fileName: "[project]/src/components/ui/toaster.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/src/components/ui/toaster.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastViewport"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/toaster.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/toaster.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/lib/db.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/lib/db.ts
__turbopack_context__.s({
    "UserDatabase": (()=>UserDatabase),
    "db": (()=>db)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dexie$2f$import$2d$wrapper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dexie/import-wrapper.mjs [app-ssr] (ecmascript)");
;
class UserDatabase extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dexie$2f$import$2d$wrapper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] {
    users;
    cases;
    constructor(){
        super('NextgenEcourtUserDB');
        this.version(2).stores({
            // Primary key is email, add index on id for potential lookups
            users: '&email, id, role',
            // Primary key is caseNumber, add indexes for filtering
            // Indexes added: judgeId, plaintiffId, defendantId, lawyerIds (multiEntry), addedBy, status
            cases: '&caseNumber, judgeId, plaintiffId, defendantId, *lawyerIds, addedBy, status'
        }).upgrade((tx)=>{
            // Optional: Add migration logic here if needed from version 1
            console.log("Upgrading Dexie schema to version 2");
            // Example: If version 1 only had users, this upgrade adds cases
            // No specific data migration needed here as 'cases' is a new table
            // Ensure cases table is clean on upgrade if needed, or migrate data if necessary.
            // Example: return tx.table("cases").clear();
            return Promise.resolve(); // Indicate upgrade is complete
        });
        // Initial version 1 schema definition (if needed for clarity or fallback)
        // This defines the schema that existed *before* version 2.
        this.version(1).stores({
            users: '&email, id'
        });
        // Make sure to handle potential schema upgrades gracefully
        this.on('populate', ()=>{
            // Optional: Populate initial data if needed, e.g., admin user
            console.log('Populating Dexie database...');
        // Example: await this.users.add({ ... });
        });
        this.on('blocked', ()=>{
            console.warn('Dexie database access is blocked, possibly due to an open tab with an older version.');
        });
    }
}
const db = new UserDatabase();
}}),
"[project]/src/services/local-user-service.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/services/local-user-service.ts
__turbopack_context__.s({
    "addUser": (()=>addUser),
    "getAllUsers": (()=>getAllUsers),
    "getLoggedInUserData": (()=>getLoggedInUserData),
    "getUserByEmail": (()=>getUserByEmail),
    "getUsersByRole": (()=>getUsersByRole)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-ssr] (ecmascript)");
'use client'; // Mark as client component because it uses browser APIs (IndexedDB via Dexie)
;
async function addUser(userData) {
    const normalizedEmail = userData.email.toLowerCase();
    const existingUser = await getUserByEmail(normalizedEmail); // getUserByEmail also normalizes, good for consistency
    if (existingUser) {
        throw new Error('auth/email-already-in-use');
    }
    // In a real app, generate a secure ID and HASH the password here.
    // Using email as ID and plain text password for simplicity. HIGHLY INSECURE.
    const newUser = {
        name: userData.name,
        email: normalizedEmail,
        role: userData.role,
        id: normalizedEmail,
        passwordHash: userData.passwordHash
    };
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].users.add(newUser);
        console.log('[LocalUserService] User added to Dexie:', newUser.email);
        return newUser.id;
    } catch (error) {
        console.error('[LocalUserService] Failed to add user to Dexie:', error);
        throw new Error('Failed to register user locally.');
    }
}
async function getUserByEmail(email) {
    const normalizedEmail = email.toLowerCase();
    try {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"] || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].users) {
            console.error('[LocalUserService] Dexie db or users table not initialized!');
            return undefined;
        }
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].users.get(normalizedEmail);
        // console.log('[LocalUserService] Fetched user by email from Dexie:', normalizedEmail, user ? 'Found' : 'Not Found');
        return user;
    } catch (error) {
        console.error('[LocalUserService] Failed to get user by email from Dexie:', error);
        return undefined;
    }
}
async function getLoggedInUserData(email) {
    // getUserByEmail will normalize the email
    const userWithPassword = await getUserByEmail(email);
    if (!userWithPassword) {
        console.warn(`[LocalUserService] getLoggedInUserData: User ${email} (normalized: ${email.toLowerCase()}) not found in Dexie.`);
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userData } = userWithPassword;
    return userData;
}
async function getUsersByRole(role) {
    try {
        const usersWithPasswords = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].users.where('role').equals(role).toArray();
        console.log(`[LocalUserService] Fetched ${usersWithPasswords.length} users with role "${role}" from Dexie.`);
        // Strip passwords before returning
        const users = usersWithPasswords.map((uwp)=>{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { passwordHash, ...userData } = uwp;
            return userData;
        });
        return users;
    } catch (error) {
        console.error(`[LocalUserService] Failed to get users by role "${role}" from Dexie:`, error);
        return [];
    }
}
async function getAllUsers() {
    try {
        const usersWithPasswords = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].users.toArray();
        console.log(`[LocalUserService] Fetched all ${usersWithPasswords.length} users from Dexie.`);
        // Strip passwords before returning
        const users = usersWithPasswords.map((uwp)=>{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { passwordHash, ...userData } = uwp;
            return userData;
        });
        return users;
    } catch (error) {
        console.error(`[LocalUserService] Failed to get all users from Dexie:`, error);
        return [];
    }
}
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$local$2d$user$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/local-user-service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const LOGGED_IN_USER_EMAIL_COOKIE_KEY = 'nextgen-ecourt-logged-in-email';
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [appUser, setAppUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAuthStatus = async ()=>{
            setLoading(true);
            try {
                const loggedInEmailFromCookie = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(LOGGED_IN_USER_EMAIL_COOKIE_KEY);
                if (loggedInEmailFromCookie) {
                    // Normalize the email read from the cookie to ensure consistent lookups
                    const normalizedEmail = loggedInEmailFromCookie.toLowerCase();
                    console.log('[AuthContext] checkAuthStatus: Found cookie, normalized email:', normalizedEmail);
                    const userData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$local$2d$user$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLoggedInUserData"])(normalizedEmail); // Pass normalized email
                    if (userData) {
                        console.log('[AuthContext] checkAuthStatus: Fetched userData from Dexie. Setting user:', userData.email);
                        setAppUser(userData); // userData.email should be lowercase from DB
                    } else {
                        // If user not found in Dexie despite cookie, cookie is stale/invalid. Remove it.
                        console.warn('[AuthContext] checkAuthStatus: User email in cookie, but no user in Dexie. Removing cookie.');
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(LOGGED_IN_USER_EMAIL_COOKIE_KEY, {
                            path: '/'
                        });
                        setAppUser(null);
                    }
                } else {
                    console.log('[AuthContext] checkAuthStatus: No loggedInEmail cookie found.');
                    setAppUser(null);
                }
            } catch (error) {
                console.error("[AuthContext] checkAuthStatus: Error:", error);
                setAppUser(null);
                // Ensure cookie is removed on error too
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(LOGGED_IN_USER_EMAIL_COOKIE_KEY, {
                    path: '/'
                });
            } finally{
                setLoading(false);
            }
        };
        checkAuthStatus();
    }, []);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((userData)=>{
        // userData.email is expected to be normalized (lowercase) by the login process
        console.log('[AuthContext] login: Setting user and cookie for (normalized):', userData.email);
        setAppUser(userData);
        // Store normalized email in cookie
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(LOGGED_IN_USER_EMAIL_COOKIE_KEY, userData.email, {
            expires: 7,
            path: '/'
        });
        setLoading(false);
    }, []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setLoading(true);
        setAppUser(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(LOGGED_IN_USER_EMAIL_COOKIE_KEY, {
            path: '/'
        });
        router.push('/');
    // Setting loading to false in a timeout can be tricky; 
    // it's often better to let the subsequent page load manage its own loading state.
    // For now, keep it simple, router.push will cause a re-render where AuthContext's useEffect runs again.
    // The setLoading(false) will occur in checkAuthStatus.
    }, [
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user: appUser,
            login,
            logout,
            loading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
}}),
"[project]/src/components/icons/NextgenEcourtLogo.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-ssr] (ecmascript) <export default as Scale>"); // Or any other relevant icon like Gavel
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const NextgenEcourtLogo = (props)=>{
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        "aria-label": t('logo.ariaLabel'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                className: "h-8 w-8 text-primary"
            }, void 0, false, {
                fileName: "[project]/src/components/icons/NextgenEcourtLogo.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-2xl font-semibold text-foreground",
                children: [
                    "Nextgen-",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-primary",
                        children: "Ecourt"
                    }, void 0, false, {
                        fileName: "[project]/src/components/icons/NextgenEcourtLogo.tsx",
                        lineNumber: 13,
                        columnNumber: 17
                    }, this),
                    " "
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/icons/NextgenEcourtLogo.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/icons/NextgenEcourtLogo.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = NextgenEcourtLogo;
}}),
"[project]/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DropdownMenu": (()=>DropdownMenu),
    "DropdownMenuCheckboxItem": (()=>DropdownMenuCheckboxItem),
    "DropdownMenuContent": (()=>DropdownMenuContent),
    "DropdownMenuGroup": (()=>DropdownMenuGroup),
    "DropdownMenuItem": (()=>DropdownMenuItem),
    "DropdownMenuLabel": (()=>DropdownMenuLabel),
    "DropdownMenuPortal": (()=>DropdownMenuPortal),
    "DropdownMenuRadioGroup": (()=>DropdownMenuRadioGroup),
    "DropdownMenuRadioItem": (()=>DropdownMenuRadioItem),
    "DropdownMenuSeparator": (()=>DropdownMenuSeparator),
    "DropdownMenuShortcut": (()=>DropdownMenuShortcut),
    "DropdownMenuSub": (()=>DropdownMenuSub),
    "DropdownMenuSubContent": (()=>DropdownMenuSubContent),
    "DropdownMenuSubTrigger": (()=>DropdownMenuSubTrigger),
    "DropdownMenuTrigger": (()=>DropdownMenuTrigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const DropdownMenu = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const DropdownMenuTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"];
const DropdownMenuGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"];
const DropdownMenuPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"];
const DropdownMenuSub = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sub"];
const DropdownMenuRadioGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"];
const DropdownMenuSubTrigger = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, inset, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubTrigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                className: "ml-auto"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 37,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, this));
DropdownMenuSubTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubTrigger"].displayName;
const DropdownMenuSubContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubContent"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 47,
        columnNumber: 3
    }, this));
DropdownMenuSubContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubContent"].displayName;
const DropdownMenuContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 64,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, this));
DropdownMenuContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
const DropdownMenuItem = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, inset, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 83,
        columnNumber: 3
    }, this));
DropdownMenuItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"].displayName;
const DropdownMenuCheckboxItem = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, children, checked, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CheckboxItem"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 109,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 108,
                columnNumber: 5
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 99,
        columnNumber: 3
    }, this));
DropdownMenuCheckboxItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CheckboxItem"].displayName;
const DropdownMenuRadioItem = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioItem"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                        className: "h-2 w-2 fill-current"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 132,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 131,
                columnNumber: 5
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 123,
        columnNumber: 3
    }, this));
DropdownMenuRadioItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioItem"].displayName;
const DropdownMenuLabel = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, inset, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 147,
        columnNumber: 3
    }, this));
DropdownMenuLabel.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"].displayName;
const DropdownMenuSeparator = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("-mx-1 my-1 h-px bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 163,
        columnNumber: 3
    }, this));
DropdownMenuSeparator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"].displayName;
const DropdownMenuShortcut = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("ml-auto text-xs tracking-widest opacity-60", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
;
}}),
"[project]/src/components/ui/avatar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Avatar": (()=>Avatar),
    "AvatarFallback": (()=>AvatarFallback),
    "AvatarImage": (()=>AvatarImage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-avatar/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const Avatar = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/avatar.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, this));
Avatar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
const AvatarImage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Image"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("aspect-square h-full w-full", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/avatar.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, this));
AvatarImage.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Image"].displayName;
const AvatarFallback = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fallback"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/avatar.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, this));
AvatarFallback.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fallback"].displayName;
;
}}),
"[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, this);
});
Button.displayName = "Button";
;
}}),
"[project]/src/components/ui/skeleton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Skeleton": (()=>Skeleton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-md bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/skeleton.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
;
}}),
"[project]/src/components/auth/UserProfile.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>UserProfile)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user.js [app-ssr] (ecmascript) <export default as UserCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-in.js [app-ssr] (ecmascript) <export default as LogIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/skeleton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function UserProfile() {
    const { user, logout, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
            className: "h-10 w-10 rounded-full"
        }, void 0, false, {
            fileName: "[project]/src/components/auth/UserProfile.tsx",
            lineNumber: 25,
            columnNumber: 12
        }, this);
    }
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            href: "/login",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                        className: "mr-2 h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/UserProfile.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this),
                    " ",
                    t('userProfile.loginButton')
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/UserProfile.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/auth/UserProfile.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this);
    }
    const getInitials = (name)=>{
        const names = name.split(' ');
        if (names.length === 1) return names[0][0]?.toUpperCase() || 'U';
        return (names[0][0] + (names[names.length - 1][0] || '')).toUpperCase();
    };
    // Generate a consistent seed for Picsum based on user ID (email in this case)
    const imageSeed = user.id ? user.id.replace(/[^a-zA-Z0-9]/g, '') : 'defaultUser';
    const userImageSrc = `https://picsum.photos/seed/${imageSeed}/40/40`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    className: "relative h-10 w-10 rounded-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                        className: "h-9 w-9",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                src: userImageSrc,
                                alt: user.name,
                                "data-ai-hint": "user avatar"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/UserProfile.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                children: getInitials(user.name)
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/UserProfile.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/auth/UserProfile.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/UserProfile.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/auth/UserProfile.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                className: "w-56",
                align: "end",
                forceMount: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                        className: "font-normal",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium leading-none",
                                    children: user.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/UserProfile.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs leading-none text-muted-foreground",
                                    children: user.email
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/UserProfile.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/auth/UserProfile.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/UserProfile.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                        fileName: "[project]/src/components/auth/UserProfile.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/profile",
                            className: "cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__["UserCircle"], {
                                    className: "mr-2 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/UserProfile.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: t('userProfile.profileLink')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/UserProfile.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/auth/UserProfile.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/UserProfile.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                        fileName: "[project]/src/components/auth/UserProfile.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        onClick: logout,
                        className: "cursor-pointer text-destructive focus:text-destructive-foreground focus:bg-destructive",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/UserProfile.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t('userProfile.logoutButton')
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/UserProfile.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/auth/UserProfile.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/UserProfile.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/auth/UserProfile.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/ui/sheet.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Sheet": (()=>Sheet),
    "SheetClose": (()=>SheetClose),
    "SheetContent": (()=>SheetContent),
    "SheetDescription": (()=>SheetDescription),
    "SheetFooter": (()=>SheetFooter),
    "SheetHeader": (()=>SheetHeader),
    "SheetOverlay": (()=>SheetOverlay),
    "SheetPortal": (()=>SheetPortal),
    "SheetTitle": (()=>SheetTitle),
    "SheetTrigger": (()=>SheetTrigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const Sheet = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const SheetTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"];
const SheetClose = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"];
const SheetPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"];
const SheetOverlay = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props,
        ref: ref
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, this));
SheetOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const sheetVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
    variants: {
        side: {
            top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
            right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
        }
    },
    defaultVariants: {
        side: "right"
    }
});
const SheetContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ side = "right", className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/sheet.tsx",
                lineNumber: 61,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(sheetVariants({
                    side
                }), className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/sheet.tsx",
                                lineNumber: 69,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/sheet.tsx",
                                lineNumber: 70,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/sheet.tsx",
                        lineNumber: 68,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/sheet.tsx",
                lineNumber: 62,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 60,
        columnNumber: 3
    }, this));
SheetContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
const SheetHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 81,
        columnNumber: 3
    }, this);
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, this);
SheetFooter.displayName = "SheetFooter";
const SheetTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold text-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 109,
        columnNumber: 3
    }, this));
SheetTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"].displayName;
const SheetDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 121,
        columnNumber: 3
    }, this));
SheetDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"].displayName;
;
}}),
"[project]/src/config/languages.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DEFAULT_LOCALE": (()=>DEFAULT_LOCALE),
    "SUPPORTED_LANGUAGES": (()=>SUPPORTED_LANGUAGES)
});
const SUPPORTED_LANGUAGES = [
    {
        code: 'en',
        name: 'English',
        englishName: 'English'
    },
    {
        code: 'hi',
        name: 'हिन्दी',
        englishName: 'Hindi'
    },
    {
        code: 'es',
        name: 'Español',
        englishName: 'Spanish'
    },
    {
        code: 'fr',
        name: 'Français',
        englishName: 'French'
    }
];
const DEFAULT_LOCALE = 'en';
}}),
"[project]/src/locales/en.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"appName\":\"Nextgen-Ecourt\",\"footer.copyright\":\"© {{year}} Nextgen-Ecourt. All rights reserved.\",\"header.dashboard\":\"Dashboard\",\"header.aiSummaries\":\"AI Summaries\",\"header.legalResearch\":\"Legal Research\",\"header.judgeDashboard\":\"Judge Dashboard\",\"header.addCase\":\"Add Case\",\"header.videoCall\":\"Video Call\",\"header.homeAriaLabel\":\"Nextgen-Ecourt Home\",\"header.toggleNavAriaLabel\":\"Toggle navigation menu\",\"languageToggle.selectLanguage\":\"Select Language\",\"login.title\":\"Login to Nextgen-Ecourt\",\"login.description\":\"Enter your credentials to access your account.\",\"login.emailLabel\":\"Email Address\",\"login.passwordLabel\":\"Password\",\"login.forgotPassword\":\"Forgot password?\",\"login.loginButton\":\"Login\",\"login.loggingInButton\":\"Logging in...\",\"login.noAccount\":\"Don't have an account?\",\"login.signupLink\":\"Sign up here\",\"login.failedTitle\":\"Login Failed\",\"login.unexpectedError\":\"An unexpected error occurred. Please try again.\",\"login.invalidCredentials\":\"Invalid email or password.\",\"login.emailPlaceholder\":\"name@example.com\",\"login.passwordPlaceholder\":\"••••••••\",\"login.hidePasswordAriaLabel\":\"Hide password\",\"login.showPasswordAriaLabel\":\"Show password\",\"login.error.invalidEmail\":\"Invalid email address.\",\"login.error.passwordLength\":\"Password must be at least 6 characters.\",\"login.error.passwordRequired\":\"Password is required.\",\"login.error.userDocNotFound\":\"User profile not found.\",\"login.successTitle\":\"Login Successful\",\"login.successDescription\":\"Welcome back, {{name}}!\",\"signup.title\":\"Create Nextgen-Ecourt Account\",\"signup.description\":\"Join Nextgen-Ecourt to manage and track cases efficiently.\",\"signup.nameLabel\":\"Full Name\",\"signup.namePlaceholder\":\"John Doe\",\"signup.roleLabel\":\"Your Role\",\"signup.confirmPasswordLabel\":\"Confirm Password\",\"signup.signupButton\":\"Sign Up\",\"signup.creatingAccountButton\":\"Creating account...\",\"signup.hasAccount\":\"Already have an account?\",\"signup.loginLink\":\"Log in here\",\"signup.failedTitle\":\"Signup Failed\",\"signup.error.unexpected\":\"An unexpected error occurred during signup. Please try again.\",\"signup.error.nameLength\":\"Name must be at least 2 characters.\",\"signup.error.invalidEmail\":\"Invalid email address format.\",\"signup.error.passwordLength\":\"Password must be at least 6 characters.\",\"signup.error.passwordsDontMatch\":\"Passwords do not match.\",\"signup.error.roleRequired\":\"Please select a role.\",\"signup.error.generic\":\"An error occurred. Please check your input.\",\"signup.error.emailInUse\":\"This email address is already in use.\",\"signup.error.weakPassword\":\"Password is too weak. Please choose a stronger password.\",\"signup.hideConfirmPasswordAriaLabel\":\"Hide confirmed password\",\"signup.showConfirmPasswordAriaLabel\":\"Show confirmed password\",\"signup.successTitle\":\"Account Created\",\"signup.successDescription\":\"Your account for {{email}} has been successfully created (locally).\",\"profile.title\":\"Profile\",\"profile.editButton\":\"Edit Profile\",\"profile.logoutButton\":\"Log Out\",\"profile.avatarAlt\":\"{{name}}'s profile picture\",\"profile.initialsFallback\":\"{{initials}}\",\"profile.info.email\":\"Email Address\",\"profile.info.userId\":\"User ID\",\"profile.info.accountType\":\"Account Type\",\"profile.info.accountTypeValue\":\"{{role}} Account\",\"profile.supportMessage\":\"For any account-related issues, please contact support at support@nextgen-ecourt.app.\",\"profile.loading\":\"Loading profile...\",\"caseCard.caseNumber\":\"Case Number: {{caseNumber}}\",\"caseCard.plaintiff\":\"Plaintiff\",\"caseCard.defendant\":\"Defendant\",\"caseCard.court\":\"Court\",\"caseCard.judge\":\"Judge\",\"caseCard.filingDate\":\"Filing Date\",\"caseCard.lastUpdate\":\"Last Update\",\"caseCard.nextHearing\":\"Next Hearing\",\"caseCard.viewDetails\":\"View Details\",\"caseCard.viewDetailsAriaLabel\":\"View details for case: {{caseTitle}}\",\"caseCard.deleteButton\":\"Delete\",\"caseCard.deleteCaseAriaLabel\":\"Delete case: {{caseTitle}}\",\"caseSearch.placeholder\":\"Search by case number, title, plaintiff, defendant...\",\"caseSearch.buttonLabel\":\"Search cases\",\"filterByStatus\":\"Filter by status\",\"allStatuses\":\"All Statuses\",\"dashboard.title.judge\":\"My Allocated Cases\",\"dashboard.title.other\":\"Case Dashboard\",\"dashboard.title.official\":\"All Cases (Court Official View)\",\"dashboard.noCasesFound\":\"No Cases Found\",\"dashboard.noCasesFound.description.filtered\":\"Your search or filter criteria did not match any cases.\",\"dashboard.noCasesFound.description.judge.empty\":\"You currently have no cases allocated to you.\",\"dashboard.noCasesFound.description.official.empty\":\"There are no cases in the system yet.\",\"dashboard.noCasesFound.description.other.empty\":\"There are currently no cases to display for your role.\",\"dashboard.addNewCase\":\"Add New Case\",\"dashboard.addYourFirstCase\":\"Add Your First Case\",\"dashboard.loading\":\"Loading dashboard...\",\"dashboard.error.loadFailed\":\"Failed to load cases. Please try refreshing.\",\"status.Pending\":\"Pending\",\"status.Filed\":\"Filed\",\"status.Investigation\":\"Investigation\",\"status.InProgress\":\"In Progress\",\"status.Hearing\":\"Hearing\",\"status.Judgement\":\"Judgement\",\"status.Resolved\":\"Resolved\",\"status.Appealed\":\"Appealed\",\"status.OnHold\":\"On Hold\",\"status.Closed\":\"Closed\",\"urgency.High\":\"High\",\"urgency.Medium\":\"Medium\",\"urgency.Low\":\"Low\",\"role.Lawyer\":\"Lawyer\",\"role.Plaintiff\":\"Plaintiff\",\"role.Defendant\":\"Defendant\",\"role.CourtOfficial\":\"Court Official\",\"role.Judge\":\"Judge\",\"role.assignedManually\":\"Assigned Manually\",\"selectRole\":\"Select your role\",\"userProfile.loginButton\":\"Login\",\"userProfile.profileLink\":\"Profile\",\"userProfile.logoutButton\":\"Log out\",\"page.summaries.title\":\"AI Case Summarizer\",\"page.summaries.description\":\"Generate concise summaries of court cases using advanced AI.\",\"page.summaries.caseDetailsPrefilled\":\"Case details pre-filled for case {{caseId}}. You can edit them below.\",\"page.summaries.enterCaseDetailsTitle\":\"Enter Case Details\",\"page.summaries.enterCaseDetailsDescription\":\"Paste or type the full text of the case, including all relevant facts and context.\",\"page.summaries.caseTextLabel\":\"Case Text\",\"page.summaries.caseTextPlaceholder\":\"Enter the full case details here...\",\"page.summaries.generateButton\":\"Generate Summary\",\"page.summaries.generatingButton\":\"Generating Summary...\",\"page.summaries.aiSummaryTitle\":\"AI Generated Summary\",\"page.summaries.aiSummaryDescription\":\"The AI will provide a concise summary below.\",\"page.summaries.error.generic\":\"Failed to generate summary. Please try again.\",\"page.summaries.error.noDetails\":\"Please enter case details to summarize.\",\"page.summaries.loading\":\"Loading AI Summaries...\",\"page.summaries.resultsPlaceholderTitle\":\"Your case summary will appear here.\",\"page.summaries.resultsPlaceholderDescription\":\"Enter case details and click \\\"Generate Summary\\\".\",\"page.summaries.fetchingCase\":\"Fetching case details...\",\"page.legalResearch.title\":\"Legal Research Assistant\",\"page.legalResearch.description\":\"Leverage AI to find relevant case law, statutes, and legal analysis.\",\"page.legalResearch.queryTitle\":\"Research Query\",\"page.legalResearch.queryDescription\":\"Enter your legal research topic and optional case context.\",\"page.legalResearch.topicLabel\":\"Research Topic\",\"page.legalResearch.topicPlaceholder\":\"e.g., 'admissibility of hearsay evidence in civil trials'\",\"page.legalResearch.contextLabel\":\"Case Context (Optional)\",\"page.legalResearch.contextPlaceholder\":\"Provide specific facts, party names, or procedural posture related to your query...\",\"page.legalResearch.performResearchButton\":\"Perform Research\",\"page.legalResearch.researchingButton\":\"Researching...\",\"page.legalResearch.resultsTitle\":\"Research Results\",\"page.legalResearch.resultsDescription\":\"Relevant case law, statutes, and legal analysis will appear here.\",\"page.legalResearch.error.generic\":\"Failed to perform legal research. Please try again.\",\"page.legalResearch.error.topicRequired\":\"Research topic cannot be empty.\",\"page.legalResearch.loading\":\"Loading Legal Research Assistant...\",\"page.legalResearch.resultsPlaceholderTitle\":\"Your research results will appear here.\",\"page.legalResearch.resultsPlaceholderDescription\":\"Enter a research topic and click \\\"Perform Research\\\".\",\"page.legalResearch.relevantCaseLaw\":\"Relevant Case Law ({{count}})\",\"page.legalResearch.relevantStatutes\":\"Relevant Statutes ({{count}})\",\"page.legalResearch.legalAnalysis\":\"Legal Analysis\",\"page.judgeDashboard.title\":\"Judge Dashboard\",\"page.judgeDashboard.loading\":\"Loading Judge Dashboard...\",\"page.judgeDashboard.searchPlaceholder\":\"Search cases (title, number, parties)...\",\"page.judgeDashboard.filterStatusPlaceholder\":\"Filter by status\",\"page.judgeDashboard.noCases.title\":\"No Cases Found\",\"page.judgeDashboard.noCases.description.filtered\":\"Your search or filter criteria did not match any of your allocated cases.\",\"page.judgeDashboard.noCases.description.empty\":\"You currently have no cases allocated to you.\",\"page.judgeDashboard.caseCard.statusPrefix\":\"Status: \",\"page.judgeDashboard.caseCard.lastUpdatedPrefix\":\"Last Updated:\",\"page.judgeDashboard.caseCard.nextHearingPrefixFull\":\"Next Hearing: {{date}}\",\"page.judgeDashboard.caseCard.noUpcomingHearing\":\"No upcoming hearing scheduled.\",\"page.judgeDashboard.button.updateStatus\":\"Status\",\"page.judgeDashboard.button.addNote\":\"Note\",\"page.judgeDashboard.button.reschedule\":\"Reschedule\",\"page.judgeDashboard.button.upload\":\"Upload\",\"page.judgeDashboard.button.uploading\":\"Uploading...\",\"page.judgeDashboard.button.deleteCase\":\"Delete Case\",\"page.judgeDashboard.modal.updateStatus.title\":\"Update Status for {{caseNumber}}\",\"page.judgeDashboard.modal.updateStatus.description\":\"Select the new status for this case.\",\"page.judgeDashboard.modal.updateStatus.label\":\"New Status\",\"page.judgeDashboard.modal.updateStatus.placeholder\":\"Select status\",\"page.judgeDashboard.modal.updateStatus.action\":\"Update Status\",\"page.judgeDashboard.modal.addNote.title\":\"Add Note to {{caseNumber}}\",\"page.judgeDashboard.modal.addNote.description\":\"Enter your note or hearing summary below.\",\"page.judgeDashboard.modal.addNote.label\":\"Note\",\"page.judgeDashboard.modal.addNote.placeholder\":\"Type your note here...\",\"page.judgeDashboard.modal.addNote.action\":\"Add Note\",\"page.judgeDashboard.modal.reschedule.title\":\"Reschedule Hearing for {{caseNumber}}\",\"page.judgeDashboard.modal.reschedule.currentHearing\":\"Current Hearing: {{date}}\",\"page.judgeDashboard.modal.reschedule.currentHearingNotScheduled\":\"Not Scheduled\",\"page.judgeDashboard.modal.reschedule.label\":\"New Hearing Date & Time\",\"page.judgeDashboard.modal.reschedule.action\":\"Reschedule\",\"page.judgeDashboard.modal.upload.title\":\"Upload Document for {{caseNumber}}\",\"page.judgeDashboard.modal.upload.description\":\"Select a file and provide a name for the document.\",\"page.judgeDashboard.modal.upload.docNameLabel\":\"Document Name\",\"page.judgeDashboard.modal.upload.docNamePlaceholder\":\"e.g., Exhibit A, Hearing Transcript\",\"page.judgeDashboard.modal.upload.fileLabel\":\"File\",\"page.judgeDashboard.modal.upload.fileSelected\":\"Selected: {{fileName}}\",\"page.judgeDashboard.modal.upload.action\":\"Upload Document\",\"page.judgeDashboard.modal.delete.title\":\"Are you sure?\",\"page.judgeDashboard.modal.delete.description\":\"This action cannot be undone. This will permanently delete the case \\\"{{caseIdentifier}}\\\".\",\"page.judgeDashboard.modal.delete.description.local\":\"This action cannot be undone. This will permanently delete the case \\\"{{caseIdentifier}}\\\" from local storage.\",\"page.judgeDashboard.modal.delete.action\":\"Delete\",\"toast.caseUpdated.title\":\"Case Updated\",\"toast.caseUpdated.description\":\"Case {{caseNumber}} has been updated locally.\",\"toast.caseUpdated.description.status\":\"Status for case {{caseNumber}} updated to {{status}}.\",\"toast.noteAdded.title\":\"Note Added\",\"toast.noteAdded.description\":\"Note added to case {{caseNumber}}.\",\"toast.hearingRescheduled.title\":\"Hearing Rescheduled\",\"toast.hearingRescheduled.description\":\"Hearing for case {{caseNumber}} rescheduled to {{date}}.\",\"toast.uploadSuccess.title\":\"Upload Successful\",\"toast.uploadSuccess.description\":\"Document '{{docName}}' added to case.\",\"toast.invalidDate.title\":\"Invalid Date\",\"toast.invalidDate.description\":\"Please select a valid date and time.\",\"toast.noFileSelected.title\":\"No File Selected\",\"toast.noFileSelected.description\":\"Please select a file to upload.\",\"toast.docNameRequired.title\":\"Document Name Required\",\"toast.docNameRequired.description\":\"Please provide a name for the document.\",\"toast.caseDeleted.title\":\"Case Deleted\",\"toast.caseDeleted.description\":\"Case {{caseIdentifier}} has been removed from local storage.\",\"toast.updateFailed\":\"Failed to update case. Please try again.\",\"toast.deleteFailed\":\"Failed to delete case. Please try again.\",\"toast.uploadFailed\":\"Failed to upload document. Please try again.\",\"toast.accessDenied.title\":\"Access Denied\",\"toast.accessDenied.description.judgeDashboard\":\"You must be logged in as a Judge to view this page.\",\"page.caseDetail.pageName\":\"Case Details\",\"page.caseDetail.backButton\":\"Back\",\"page.caseDetail.caseNumberPrefix\":\"Case Number: {{caseNumber}}\",\"page.caseDetail.section.overview\":\"Case Overview\",\"page.caseDetail.section.details\":\"Case Details\",\"page.caseDetail.section.documents\":\"Associated Documents\",\"page.caseDetail.section.judgeNotes\":\"Judge's Notes\",\"page.caseDetail.section.timeline\":\"Case Timeline\",\"page.caseDetail.timelineComingSoon\":\"Detailed timeline view coming soon.\",\"page.caseDetail.info.plaintiff\":\"Plaintiff\",\"page.caseDetail.info.defendant\":\"Defendant\",\"page.caseDetail.info.court\":\"Court\",\"page.caseDetail.info.judge\":\"Presiding Judge\",\"page.caseDetail.info.urgency\":\"Urgency\",\"page.caseDetail.info.filingDate\":\"Filing Date\",\"page.caseDetail.info.lastUpdated\":\"Last Updated\",\"page.caseDetail.info.nextHearingDate\":\"Next Hearing Date\",\"page.caseDetail.docItem.uploadedByOn\":\"Uploaded by {{uploader}} on {{date}}\",\"page.caseDetail.docItem.downloadAriaLabel\":\"Download {{docName}}\",\"page.caseDetail.noteItem.byOn\":\"By {{author}} on {{date}}\",\"page.caseDetail.button.aiSummary\":\"AI Summary\",\"page.caseDetail.button.updateStatus\":\"Update Status\",\"page.caseDetail.button.addNote\":\"Add Note\",\"page.caseDetail.button.uploadDocument\":\"Upload Document\",\"page.caseDetail.toast.judgeAction.title\":\"Judge Action: {{action}}\",\"page.caseDetail.toast.judgeAction.description\":\"Action '{{action}}' simulated for case {{caseNumber}}\",\"page.caseDetail.toast.downloadStarted.title\":\"Download Started\",\"page.caseDetail.toast.downloadStarted.description\":\"Opening download link for {{fileName}}\",\"page.caseDetail.notFoundTitle\":\"Case Not Found\",\"page.caseDetail.notFound\":\"The requested case ({{caseId}}) could not be found locally or you do not have permission to view it.\",\"page.caseDetail.accessDenied\":\"You do not have permission to view this case.\",\"page.caseDetail.caseNotAvailable\":\"Case not available.\",\"page.caseDetail.backToDashboard\":\"Back to Dashboard\",\"page.caseDetail.loading\":\"Loading case details...\",\"page.caseDetail.loadError\":\"Failed to load case details. Please try again.\",\"page.caseDetail.downloadError\":\"Could not initiate download. Invalid document URL.\",\"page.addCase.title\":\"Add New Case\",\"page.addCase.description\":\"Enter the details for the new case and assign relevant users by email.\",\"page.addCase.section.details\":\"Case Details\",\"page.addCase.section.parties\":\"Parties & Assignment\",\"page.addCase.section.documents\":\"Documents\",\"page.addCase.label.title\":\"Case Title\",\"page.addCase.placeholder.title\":\"e.g., Smith v. Jones Property Dispute\",\"page.addCase.label.caseNumber\":\"Case Number\",\"page.addCase.placeholder.caseNumber\":\"e.g., CV-2024-123\",\"page.addCase.hint.caseNumber\":\"Must be unique. Use letters, numbers, hyphens (e.g., CV-YYYY-NNN).\",\"page.addCase.label.court\":\"Court\",\"page.addCase.placeholder.court\":\"e.g., District Court of Anytown\",\"page.addCase.label.status\":\"Initial Status\",\"page.addCase.placeholder.status\":\"Select initial status\",\"page.addCase.label.urgency\":\"Urgency Level\",\"page.addCase.placeholder.urgency\":\"Select urgency\",\"page.addCase.label.description\":\"Case Description\",\"page.addCase.placeholder.description\":\"Provide a brief overview of the case...\",\"page.addCase.label.plaintiffName\":\"Plaintiff Full Name\",\"page.addCase.placeholder.plaintiffName\":\"e.g., John Smith\",\"page.addCase.label.assignPlaintiffEmail\":\"Assign Plaintiff Email\",\"page.addCase.placeholder.assignPlaintiffEmail\":\"Enter Plaintiff's email\",\"page.addCase.label.defendantName\":\"Defendant Full Name\",\"page.addCase.placeholder.defendantName\":\"e.g., Alice Jones\",\"page.addCase.label.assignDefendantEmail\":\"Assign Defendant Email\",\"page.addCase.placeholder.assignDefendantEmail\":\"Enter Defendant's email\",\"page.addCase.label.assignJudgeEmail\":\"Assign Judge Email\",\"page.addCase.placeholder.assignJudgeEmail\":\"Enter Judge's email\",\"page.addCase.label.assignLawyerEmail\":\"Assign Lawyer Email\",\"page.addCase.placeholder.assignLawyerEmail\":\"Enter Lawyer's email\",\"page.addCase.label.documentUpload\":\"Upload Document (PDF)\",\"page.addCase.hint.documentUpload\":\"Optional. Max file size: {{maxSize}}MB. PDF only.\",\"page.addCase.unassigned\":\"Unassigned\",\"page.addCase.noUsersFound\":\"No users found for role: {{role}}\",\"page.addCase.submitButton\":\"Add Case\",\"page.addCase.submittingButton\":\"Adding Case...\",\"page.addCase.successTitle\":\"Case Added\",\"page.addCase.successDescription.saved\":\"Case {{caseNumber}} has been successfully saved locally.\",\"page.addCase.error.fetchUsersFailed\":\"Failed to load users for assignment.\",\"page.addCase.error.titleMin\":\"Title must be at least 5 characters.\",\"page.addCase.error.descriptionMin\":\"Description must be at least 10 characters.\",\"page.addCase.error.caseNumberFormat\":\"Case number can only contain letters, numbers, and hyphens.\",\"page.addCase.error.caseNumberRequired\":\"Case number is required.\",\"page.addCase.error.caseNumberDuplicate\":\"Case number \\\"{{caseNumber}}\\\" already exists.\",\"page.addCase.error.courtMin\":\"Court name must be at least 3 characters.\",\"page.addCase.error.plaintiffNameMin\":\"Plaintiff name must be at least 2 characters.\",\"page.addCase.error.defendantNameMin\":\"Defendant name must be at least 2 characters.\",\"page.addCase.error.statusRequired\":\"Case status is required.\",\"page.addCase.error.urgencyRequired\":\"Urgency level is required.\",\"page.addCase.error.plaintiffEmailRequired\":\"Plaintiff email is required.\",\"page.addCase.error.plaintiffEmailFormat\":\"Invalid plaintiff email format.\",\"page.addCase.error.defendantEmailRequired\":\"Defendant email is required.\",\"page.addCase.error.defendantEmailFormat\":\"Invalid defendant email format.\",\"page.addCase.error.judgeEmailFormat\":\"Invalid judge email format.\",\"page.addCase.error.lawyerEmailFormat\":\"Invalid lawyer email format.\",\"page.addCase.error.documentInvalid\":\"Invalid file input.\",\"page.addCase.error.documentSize\":\"File size exceeds the limit of {{maxSize}}MB.\",\"page.addCase.error.documentType\":\"Invalid file type. Only PDF is allowed.\",\"page.addCase.error.documentProcessing\":\"Error processing the uploaded document.\",\"page.addCase.toast.blobUrlWarning.title\":\"Local Document Link\",\"page.addCase.toast.blobUrlWarning.description\":\"The uploaded document is linked locally using a temporary Blob URL. It will only be accessible during this browser session.\",\"page.addCase.loadingPage\":\"Loading Add Case Page...\",\"page.addCase.accessDenied\":\"You must be a Court Official to add cases.\",\"error.genericTitle\":\"Error\",\"cancel\":\"Cancel\",\"na\":\"N/A\",\"optional\":\"Optional\",\"accessDenied.loginRequired.page\":\"Please log in to use {{pageName}}.\",\"placeholders.email\":\"name@example.com\",\"placeholders.password\":\"••••••••\",\"logo.ariaLabel\":\"Nextgen-Ecourt Logo\",\"viewCaseLinkText\":\"View Case {{caseId}}\",\"judgeActionsPrompt\":\"Judge actions are performed on the Judge Dashboard.\",\"goToJudgeDashboard\":\"Go to Judge Dashboard\",\"demoWarning.title\":\"Security Warning / Demo Mode\",\"demoWarning.login\":\"This login uses client-side storage for demonstration only. Passwords are NOT stored securely. Do not use real credentials.\",\"demoWarning.signup\":\"This signup uses client-side storage for demonstration only. Passwords are NOT stored securely. Do not use real credentials.\",\"demoWarning.dashboard\":\"User authentication and case data are currently stored locally in your browser using Dexie (IndexedDB). This is for demonstration purposes only and is **not secure for passwords**. Data IS persistent locally but will be lost if you clear browser data or switch browsers/devices.\",\"demoWarning.judgeDashboard.local\":\"Judge actions modify local case data only. Changes ARE saved locally in Dexie but are **not shared** or backed up. Backend integration is required for real collaborative functionality.\",\"demoWarning.profile\":\"User profile data is loaded from local browser storage (Dexie/IndexedDB) and is persistent locally but not across devices or browsers. Profile editing is disabled in this mode.\",\"demoWarning.caseDetail.local\":\"Case data is loaded from local storage (Dexie/IndexedDB). Associated documents use temporary local URLs. Judge actions are performed on the Judge Dashboard.\",\"demoWarning.addCase.localPersistence\":\"Case addition uses local storage (Dexie/IndexedDB). Added cases ARE persistent locally but **not shared** across devices or browsers. Uploaded document URLs are temporary (Blob URLs).\",\"common.disabled\":\"Disabled\",\"common.localOnly\":\"Local\",\"common.localBlobUrlWarning\":\"Download uses a temporary local URL. May not work after refresh.\",\"landing.hero.title\":\"The Future of Justice, Delivered Today\",\"landing.hero.subtitle\":\"Nextgen-Ecourt brings efficiency, transparency, and accessibility to the judicial process with cutting-edge AI and secure technology.\",\"landing.features.title\":\"Revolutionizing Court Operations\",\"landing.features.subtitle\":\"Explore the powerful features designed to streamline workflows and enhance judicial proceedings.\",\"landing.features.summarization.title\":\"AI Case Summarization\",\"landing.features.summarization.description\":\"Instantly extract key points and generate concise summaries from lengthy legal documents.\",\"landing.features.transcription.title\":\"Speech-to-Text Transcription\",\"landing.features.transcription.description\":\"Accurately convert court hearings and audio recordings into searchable digital text records using advanced NLP.\",\"landing.features.research.title\":\"AI Legal Research\",\"landing.features.research.description\":\"Find relevant case law, statutes, and legal analysis quickly with our intelligent research assistant.\",\"landing.features.blockchain.title\":\"Secure Blockchain Records\",\"landing.features.blockchain.description\":\"Ensure the authenticity and integrity of court records with tamper-proof blockchain technology.\",\"landing.features.virtualCourt.title\":\"Virtual Courtroom\",\"landing.features.virtualCourt.description\":\"Conduct secure remote hearings and video conferences, increasing accessibility and reducing delays.\",\"landing.features.chatbot.title\":\"AI Legal Assistant Chatbot\",\"landing.features.chatbot.description\":\"Get instant answers to procedural questions, document guidance, and case status updates.\",\"landing.features.scheduling.title\":\"Intelligent Scheduling\",\"landing.features.scheduling.description\":\"Optimize hearing dates and courtroom allocation automatically to minimize backlog and wait times.\",\"landing.features.workflow.title\":\"Automated Workflows\",\"landing.features.workflow.description\":\"Streamline case filing, document management, and notification processes for maximum efficiency.\",\"landing.benefits.title\":\"Why Choose Nextgen-Ecourt?\",\"landing.benefits.efficiency.title\":\"Enhanced Efficiency\",\"landing.benefits.efficiency.description\":\"Automate repetitive tasks, reduce paperwork, and speed up case processing.\",\"landing.benefits.transparency.title\":\"Increased Transparency\",\"landing.benefits.transparency.description\":\"Provide secure, real-time access to case information for all authorized parties.\",\"landing.benefits.accessibility.title\":\"Improved Accessibility\",\"landing.benefits.accessibility.description\":\"Enable remote participation and access to justice regardless of location.\",\"landing.cta.title\":\"Ready to Modernize Your Court?\",\"landing.cta.subtitle\":\"Join the growing number of judicial bodies transforming their operations with Nextgen-Ecourt.\",\"landing.cta.button\":\"Get Started Today\",\"page.videoCall.title\":\"Video Call / Hearing\",\"page.videoCall.description.joinOrCreate\":\"Join an existing video call or start a new one.\",\"page.videoCall.description.inMeeting\":\"Currently in meeting: {{code}}\",\"page.videoCall.joinTitle\":\"Join Existing Meeting\",\"page.videoCall.joinDescription\":\"Enter the unique 6-character code provided by the host.\",\"page.videoCall.startTitle\":\"Start New Meeting\",\"page.videoCall.startDescription\":\"Generate a unique code to start a new meeting.\",\"page.videoCall.label.meetingCode\":\"Meeting Code\",\"page.videoCall.placeholder.meetingCode\":\"ABCXYZ\",\"page.videoCall.button.joinMeeting\":\"Join Meeting\",\"page.videoCall.button.startMeeting\":\"Start New Meeting\",\"page.videoCall.button.leaveMeeting\":\"Leave Meeting\",\"page.videoCall.button.copyCode\":\"Copy Code\",\"page.videoCall.error.permissionDeniedTitle\":\"Permission Denied\",\"page.videoCall.error.permissionDenied\":\"Camera and microphone access is required to join or start a video call. Please grant permission in your browser settings.\",\"page.videoCall.error.permissionRequired\":\"Camera and microphone access is required.\",\"page.videoCall.error.codeRequired\":\"Please enter a meeting code.\",\"page.videoCall.error.copyFailed\":\"Failed to copy code to clipboard.\",\"page.videoCall.toast.joiningTitle\":\"Joined Meeting\",\"page.videoCall.toast.joiningDescription\":\"Successfully connected to meeting {{code}}.\",\"page.videoCall.toast.startedTitle\":\"Meeting Started\",\"page.videoCall.toast.startedDescription\":\"Meeting {{code}} is now active. Share the code.\",\"page.videoCall.toast.leftMeeting\":\"You have left the meeting.\",\"page.videoCall.toast.codeCopied\":\"Meeting code copied to clipboard!\",\"page.videoCall.shareCode\":\"Share this code with participants:\",\"page.videoCall.waitingForPermission\":\"Waiting for camera/mic permission...\",\"page.videoCall.placeholder.controls\":\"Meeting controls (mute, video toggle, share screen, etc.) would appear here.\",\"page.videoCall.permissionNeeded\":\"Camera and microphone access needed.\",\"page.videoCall.requestingPermission\":\"Requesting permissions...\",\"page.videoCall.error.permissionInstructions\":\"Please enable camera and microphone permissions in your browser settings to use the video call feature.\",\"page.videoCall.infoTitle\":\"Video Call Instructions\",\"page.videoCall.infoText\":\"To join a meeting, enter the 6-character code provided by the host.\",\"page.videoCall.infoTextOfficial\":\"As a Court Official, you can start a new meeting and share the generated code.\",\"page.videoCall.infoTextParticipant\":\"You can join a meeting using a code shared by a Court Official.\",\"page.videoCall.button.retryPermission\":\"Retry Permission\",\"page.videoCall.participants\":\"Participants ({{count}})\",\"page.videoCall.participantListTitle\":\"Participant List\",\"page.videoCall.noParticipants\":\"No other participants yet.\",\"page.videoCall.you\":\"You\",\"page.videoCall.meetingCodeLabel\":\"Meeting Code\",\"page.videoCall.toast.participantJoined\":\"{{name}} joined the meeting.\",\"page.videoCall.toast.participantLeft\":\"{{name}} left the meeting.\",\"page.videoCall.toast.connectedTitle\":\"Connected\",\"page.videoCall.toast.connectedDescription\":\"Real-time connection established.\",\"page.videoCall.error.connectionFailedTitle\":\"Connection Failed\",\"page.videoCall.error.connectionFailed\":\"Could not connect to the video call server at {{url}}. Details: {{details}}\",\"page.videoCall.error.disconnectedTitle\":\"Disconnected\",\"page.videoCall.error.disconnected\":\"Lost connection to the video call server.\",\"page.videoCall.error.configMissing\":\"Video call server URL is not configured.\",\"page.videoCall.error.notConnected\":\"Not connected to the video call server. Please wait or check the connection.\",\"page.videoCall.error.invalidCodeTitle\":\"Invalid Code\",\"page.videoCall.error.invalidCodeDescription\":\"Meeting code must be 6 uppercase letters or numbers.\",\"page.videoCall.error.checkServer\":\"Please ensure the server is running and accessible.\",\"page.videoCall.toast.micOn\":\"Microphone On\",\"page.videoCall.toast.micOff\":\"Microphone Muted\",\"page.videoCall.toast.cameraOn\":\"Camera On\",\"page.videoCall.toast.cameraOff\":\"Camera Off\",\"page.videoCall.muteMicAria\":\"Mute Microphone\",\"page.videoCall.unmuteMicAria\":\"Unmute Microphone\",\"page.videoCall.cameraOffAria\":\"Turn Camera Off\",\"page.videoCall.cameraOnAria\":\"Turn Camera On\",\"page.videoCall.warning.backendTitle\":\"Backend Required\",\"page.videoCall.warning.backendDescription\":\"This video call feature requires a running Socket.IO backend server for signaling. The frontend code is implemented, but ensure the server at {{url}} is running. Without it, connections will fail. Check the browser console and server logs for errors.\",\"page.videoCall.warning.urlNotSet\":\"URL_NOT_SET\",\"page.videoCall.waitingForOthers\":\"Waiting for others to join...\",\"page.videoCall.startHint\":\"Only Court Officials can start new meetings.\"}"));}}),
"[project]/src/locales/hi.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"appName\":\"नेक्स्टजेन-ईकोर्ट\",\"footer.copyright\":\"© {{year}} नेक्स्टजेन-ईकोर्ट। सर्वाधिकार सुरक्षित।\",\"header.dashboard\":\"डैशबोर्ड\",\"header.aiSummaries\":\"एआई सारांश\",\"header.legalResearch\":\"कानूनी अनुसंधान\",\"header.judgeDashboard\":\"न्यायाधीश डैशबोर्ड\",\"header.addCase\":\"केस जोड़ें\",\"header.videoCall\":\"वीडियो कॉल\",\"header.homeAriaLabel\":\"नेक्स्टजेन-ईकोर्ट होम\",\"header.toggleNavAriaLabel\":\"नेविगेशन मेनू टॉगल करें\",\"languageToggle.selectLanguage\":\"भाषा चुनें\",\"login.title\":\"नेक्स्टजेन-ईकोर्ट में लॉगिन करें\",\"login.description\":\"अपने खाते तक पहुंचने के लिए अपनी क्रेडेंशियल दर्ज करें।\",\"login.emailLabel\":\"ईमेल पता\",\"login.passwordLabel\":\"पासवर्ड\",\"login.forgotPassword\":\"पासवर्ड भूल गए?\",\"login.loginButton\":\"लॉग इन करें\",\"login.loggingInButton\":\"लॉग इन हो रहा है...\",\"login.noAccount\":\"खाता नहीं है?\",\"login.signupLink\":\"यहां साइन अप करें\",\"login.failedTitle\":\"लॉगिन विफल\",\"login.unexpectedError\":\"एक अप्रत्याशित त्रुटि हुई। कृपया पुन: प्रयास करें।\",\"login.invalidCredentials\":\"अमान्य ईमेल या पासवर्ड।\",\"login.emailPlaceholder\":\"नाम@उदाहरण.कॉम\",\"login.passwordPlaceholder\":\"••••••••\",\"login.hidePasswordAriaLabel\":\"पासवर्ड छिपाएं\",\"login.showPasswordAriaLabel\":\"पासवर्ड दिखाएं\",\"login.error.invalidEmail\":\"अमान्य ईमेल पता।\",\"login.error.passwordLength\":\"पासवर्ड कम से कम 6 वर्णों का होना चाहिए।\",\"login.error.passwordRequired\":\"पासवर्ड आवश्यक है।\",\"login.error.userDocNotFound\":\"उपयोगकर्ता प्रोफ़ाइल नहीं मिली।\",\"login.successTitle\":\"लॉगिन सफल\",\"login.successDescription\":\"वापसी पर स्वागत है, {{name}}!\",\"signup.title\":\"नेक्स्टजेन-ईकोर्ट खाता बनाएं\",\"signup.description\":\"मामलों को कुशलतापूर्वक प्रबंधित और ट्रैक करने के लिए नेक्स्टजेन-ईकोर्ट से जुड़ें।\",\"signup.nameLabel\":\"पूरा नाम\",\"signup.namePlaceholder\":\"जॉन डो\",\"signup.roleLabel\":\"आपकी भूमिका\",\"signup.confirmPasswordLabel\":\"पासवर्ड की पुष्टि करें\",\"signup.signupButton\":\"साइन अप करें\",\"signup.creatingAccountButton\":\"खाता बना रहा है...\",\"signup.hasAccount\":\"पहले से ही एक खाता है?\",\"signup.loginLink\":\"यहां लॉग इन करें\",\"signup.failedTitle\":\"साइनअप विफल\",\"signup.error.unexpected\":\"साइन अप के दौरान एक अप्रत्याशित त्रुटि हुई। कृपया पुन: प्रयास करें।\",\"signup.error.nameLength\":\"नाम कम से कम 2 वर्णों का होना चाहिए।\",\"signup.error.invalidEmail\":\"अमान्य ईमेल पता प्रारूप।\",\"signup.error.passwordLength\":\"पासवर्ड कम से कम 6 वर्णों का होना चाहिए।\",\"signup.error.passwordsDontMatch\":\"पासवर्ड मेल नहीं खाते।\",\"signup.error.roleRequired\":\"कृपया एक भूमिका चुनें।\",\"signup.error.generic\":\"एक त्रुटि हुई। कृपया अपनी प्रविष्टि जांचें।\",\"signup.error.emailInUse\":\"यह ईमेल पता पहले से उपयोग में है।\",\"signup.error.weakPassword\":\"पासवर्ड बहुत कमजोर है। कृपया एक मजबूत पासवर्ड चुनें।\",\"signup.hideConfirmPasswordAriaLabel\":\"पुष्टि किया गया पासवर्ड छिपाएं\",\"signup.showConfirmPasswordAriaLabel\":\"पुष्टि किया गया पासवर्ड दिखाएं\",\"signup.successTitle\":\"खाता बन गया\",\"signup.successDescription\":\"{{email}} के लिए आपका खाता सफलतापूर्वक बन गया है (स्थानीय रूप से)।\",\"profile.title\":\"प्रोफ़ाइल\",\"profile.editButton\":\"प्रोफ़ाइल संपादित करें\",\"profile.logoutButton\":\"लॉग आउट\",\"profile.avatarAlt\":\"{{name}} की प्रोफ़ाइल तस्वीर\",\"profile.initialsFallback\":\"{{initials}}\",\"profile.info.email\":\"ईमेल पता\",\"profile.info.userId\":\"उपयोगकर्ता आईडी\",\"profile.info.accountType\":\"खाता प्रकार\",\"profile.info.accountTypeValue\":\"{{role}} खाता\",\"profile.supportMessage\":\"किसी भी खाते से संबंधित मुद्दों के लिए, कृपया support@nextgen-ecourt.app पर समर्थन से संपर्क करें।\",\"profile.loading\":\"प्रोफ़ाइल लोड हो रही है...\",\"caseCard.caseNumber\":\"केस नंबर: {{caseNumber}}\",\"caseCard.plaintiff\":\"वादी\",\"caseCard.defendant\":\"प्रतिवादी\",\"caseCard.court\":\"न्यायालय\",\"caseCard.judge\":\"न्यायाधीश\",\"caseCard.filingDate\":\"दाखिल करने की तारीख\",\"caseCard.lastUpdate\":\"अंतिम अपडेट\",\"caseCard.nextHearing\":\"अगली सुनवाई\",\"caseCard.viewDetails\":\"विवरण देखें\",\"caseCard.viewDetailsAriaLabel\":\"केस के विवरण देखें: {{caseTitle}}\",\"caseCard.deleteButton\":\"हटाएं\",\"caseCard.deleteCaseAriaLabel\":\"केस हटाएं: {{caseTitle}}\",\"caseSearch.placeholder\":\"केस नंबर, शीर्षक, वादी, प्रतिवादी द्वारा खोजें...\",\"caseSearch.buttonLabel\":\"मामलों की खोज करें\",\"filterByStatus\":\"स्थिति के अनुसार फ़िल्टर करें\",\"allStatuses\":\"सभी स्थितियाँ\",\"dashboard.title.judge\":\"मेरे आवंटित मामले\",\"dashboard.title.other\":\"केस डैशबोर्ड\",\"dashboard.title.official\":\"सभी मामले (न्यायालय अधिकारी दृश्य)\",\"dashboard.noCasesFound\":\"कोई मामला नहीं मिला\",\"dashboard.noCasesFound.description.filtered\":\"आपकी खोज या फ़िल्टर मानदंड किसी भी मामले से मेल नहीं खाते।\",\"dashboard.noCasesFound.description.judge.empty\":\"आपके पास वर्तमान में कोई मामला आवंटित नहीं है।\",\"dashboard.noCasesFound.description.official.empty\":\"सिस्टम में अभी कोई मामला नहीं है।\",\"dashboard.noCasesFound.description.other.empty\":\"आपकी भूमिका के लिए वर्तमान में प्रदर्शित करने के लिए कोई मामला नहीं है।\",\"dashboard.addNewCase\":\"नया केस जोड़ें\",\"dashboard.addYourFirstCase\":\"अपना पहला केस जोड़ें\",\"dashboard.loading\":\"डैशबोर्ड लोड हो रहा है...\",\"dashboard.error.loadFailed\":\"मामलों को लोड करने में विफल। कृपया रीफ्रेश करने का प्रयास करें।\",\"status.Pending\":\"लंबित\",\"status.Filed\":\"दाखिल\",\"status.Investigation\":\"जांच\",\"status.InProgress\":\"प्रगति में है\",\"status.Hearing\":\"सुनवाई\",\"status.Judgement\":\"निर्णय\",\"status.Resolved\":\"हल\",\"status.Appealed\":\"अपील की गई\",\"status.OnHold\":\"रोका गया\",\"status.Closed\":\"बंद\",\"urgency.High\":\"उच्च\",\"urgency.Medium\":\"मध्यम\",\"urgency.Low\":\"कम\",\"role.Lawyer\":\"वकील\",\"role.Plaintiff\":\"वादी\",\"role.Defendant\":\"प्रतिवादी\",\"role.CourtOfficial\":\"न्यायालय अधिकारी\",\"role.Judge\":\"न्यायाधीश\",\"role.assignedManually\":\"मैन्युअल रूप से सौंपा गया\",\"selectRole\":\"अपनी भूमिका चुनें\",\"userProfile.loginButton\":\"लॉग इन करें\",\"userProfile.profileLink\":\"प्रोफ़ाइल\",\"userProfile.logoutButton\":\"लॉग आउट\",\"page.summaries.title\":\"एआई केस सारांशक\",\"page.summaries.description\":\"उन्नत एआई का उपयोग करके अदालत के मामलों का संक्षिप्त सारांश उत्पन्न करें।\",\"page.summaries.caseDetailsPrefilled\":\"केस {{caseId}} के लिए केस विवरण पहले से भरे हुए हैं। आप उन्हें नीचे संपादित कर सकते हैं।\",\"page.summaries.enterCaseDetailsTitle\":\"केस विवरण दर्ज करें\",\"page.summaries.enterCaseDetailsDescription\":\"केस का पूरा पाठ पेस्ट या टाइप करें, जिसमें सभी प्रासंगिक तथ्य और संदर्भ शामिल हों।\",\"page.summaries.caseTextLabel\":\"केस पाठ\",\"page.summaries.caseTextPlaceholder\":\"यहां पूरा केस विवरण दर्ज करें...\",\"page.summaries.generateButton\":\"सारांश उत्पन्न करें\",\"page.summaries.generatingButton\":\"सारांश उत्पन्न हो रहा है...\",\"page.summaries.aiSummaryTitle\":\"एआई उत्पन्न सारांश\",\"page.summaries.aiSummaryDescription\":\"एआई नीचे एक संक्षिप्त सारांश प्रदान करेगा।\",\"page.summaries.error.generic\":\"सारांश उत्पन्न करने में विफल। कृपया पुन: प्रयास करें।\",\"page.summaries.error.noDetails\":\"सारांशित करने के लिए कृपया केस विवरण दर्ज करें।\",\"page.summaries.loading\":\"एआई सारांश लोड हो रहा है...\",\"page.summaries.resultsPlaceholderTitle\":\"आपका केस सारांश यहां दिखाई देगा।\",\"page.summaries.resultsPlaceholderDescription\":\"केस विवरण दर्ज करें और \\\"सारांश उत्पन्न करें\\\" पर क्लिक करें।\",\"page.summaries.fetchingCase\":\"मामले का विवरण प्राप्त किया जा रहा है...\",\"page.legalResearch.title\":\"कानूनी अनुसंधान सहायक\",\"page.legalResearch.description\":\"प्रासंगिक केस कानून, क़ानून और कानूनी विश्लेषण खोजने के लिए एआई का लाभ उठाएं।\",\"page.legalResearch.queryTitle\":\"अनुसंधान प्रश्न\",\"page.legalResearch.queryDescription\":\"अपना कानूनी शोध विषय और वैकल्पिक केस संदर्भ दर्ज करें।\",\"page.legalResearch.topicLabel\":\"शोध विषय\",\"page.legalResearch.topicPlaceholder\":\"जैसे, 'दीवानी मुकदमों में अफवाह साक्ष्य की स्वीकार्यता'\",\"page.legalResearch.contextLabel\":\"केस संदर्भ (वैकल्पिक)\",\"page.legalResearch.contextPlaceholder\":\"अपने प्रश्न से संबंधित विशिष्ट तथ्य, पार्टी के नाम, या प्रक्रियात्मक मुद्रा प्रदान करें...\",\"page.legalResearch.performResearchButton\":\"अनुसंधान करें\",\"page.legalResearch.researchingButton\":\"शोध हो रहा है...\",\"page.legalResearch.resultsTitle\":\"शोध परिणाम\",\"page.legalResearch.resultsDescription\":\"प्रासंगिक केस कानून, क़ानून और कानूनी विश्लेषण यहां दिखाई देंगे।\",\"page.legalResearch.error.generic\":\"कानूनी शोध करने में विफल। कृपया पुन: प्रयास करें।\",\"page.legalResearch.error.topicRequired\":\"शोध विषय खाली नहीं हो सकता।\",\"page.legalResearch.loading\":\"कानूनी अनुसंधान सहायक लोड हो रहा है...\",\"page.legalResearch.resultsPlaceholderTitle\":\"आपके शोध परिणाम यहां दिखाई देंगे।\",\"page.legalResearch.resultsPlaceholderDescription\":\"एक शोध विषय दर्ज करें और \\\"अनुसंधान करें\\\" पर क्लिक करें।\",\"page.legalResearch.relevantCaseLaw\":\"प्रासंगिक केस कानून ({{count}})\",\"page.legalResearch.relevantStatutes\":\"प्रासंगिक क़ानून ({{count}})\",\"page.legalResearch.legalAnalysis\":\"कानूनी विश्लेषण\",\"page.judgeDashboard.title\":\"न्यायाधीश डैशबोर्ड\",\"page.judgeDashboard.loading\":\"न्यायाधीश डैशबोर्ड लोड हो रहा है...\",\"page.judgeDashboard.searchPlaceholder\":\"मामलों की खोज करें (शीर्षक, संख्या, पार्टियां)...\",\"page.judgeDashboard.filterStatusPlaceholder\":\"स्थिति के अनुसार फ़िल्टर करें\",\"page.judgeDashboard.noCases.title\":\"कोई मामला नहीं मिला\",\"page.judgeDashboard.noCases.description.filtered\":\"आपकी खोज या फ़िल्टर मानदंड आपके किसी भी आवंटित मामले से मेल नहीं खाते।\",\"page.judgeDashboard.noCases.description.empty\":\"आपके पास वर्तमान में कोई मामला आवंटित नहीं है।\",\"page.judgeDashboard.caseCard.statusPrefix\":\"स्थिति: \",\"page.judgeDashboard.caseCard.lastUpdatedPrefix\":\"अंतिम अपडेट:\",\"page.judgeDashboard.caseCard.nextHearingPrefixFull\":\"अगली सुनवाई: {{date}}\",\"page.judgeDashboard.caseCard.noUpcomingHearing\":\"कोई आगामी सुनवाई निर्धारित नहीं है।\",\"page.judgeDashboard.button.updateStatus\":\"स्थिति\",\"page.judgeDashboard.button.addNote\":\"नोट\",\"page.judgeDashboard.button.reschedule\":\"पुनर्निर्धारित करें\",\"page.judgeDashboard.button.upload\":\"अपलोड करें\",\"page.judgeDashboard.button.uploading\":\"अपलोड हो रहा है...\",\"page.judgeDashboard.button.deleteCase\":\"केस हटाएं\",\"page.judgeDashboard.modal.updateStatus.title\":\"{{caseNumber}} के लिए स्थिति अपडेट करें\",\"page.judgeDashboard.modal.updateStatus.description\":\"इस मामले के लिए नई स्थिति चुनें।\",\"page.judgeDashboard.modal.updateStatus.label\":\"नई स्थिति\",\"page.judgeDashboard.modal.updateStatus.placeholder\":\"स्थिति चुनें\",\"page.judgeDashboard.modal.updateStatus.action\":\"स्थिति अपडेट करें\",\"page.judgeDashboard.modal.addNote.title\":\"{{caseNumber}} में नोट जोड़ें\",\"page.judgeDashboard.modal.addNote.description\":\"नीचे अपना नोट या सुनवाई सारांश दर्ज करें।\",\"page.judgeDashboard.modal.addNote.label\":\"नोट\",\"page.judgeDashboard.modal.addNote.placeholder\":\"अपना नोट यहाँ टाइप करें...\",\"page.judgeDashboard.modal.addNote.action\":\"नोट जोड़ें\",\"page.judgeDashboard.modal.reschedule.title\":\"{{caseNumber}} के लिए सुनवाई पुनर्निर्धारित करें\",\"page.judgeDashboard.modal.reschedule.currentHearing\":\"वर्तमान सुनवाई: {{date}}\",\"page.judgeDashboard.modal.reschedule.currentHearingNotScheduled\":\"निर्धारित नहीं\",\"page.judgeDashboard.modal.reschedule.label\":\"नई सुनवाई तिथि और समय\",\"page.judgeDashboard.modal.reschedule.action\":\"पुनर्निर्धारित करें\",\"page.judgeDashboard.modal.upload.title\":\"{{caseNumber}} के लिए दस्तावेज़ अपलोड करें\",\"page.judgeDashboard.modal.upload.description\":\"एक फ़ाइल चुनें और दस्तावेज़ के लिए एक नाम प्रदान करें।\",\"page.judgeDashboard.modal.upload.docNameLabel\":\"दस्तावेज़ का नाम\",\"page.judgeDashboard.modal.upload.docNamePlaceholder\":\"जैसे, प्रदर्श A, सुनवाई प्रतिलेख\",\"page.judgeDashboard.modal.upload.fileLabel\":\"फ़ाइल\",\"page.judgeDashboard.modal.upload.fileSelected\":\"चयनित: {{fileName}}\",\"page.judgeDashboard.modal.upload.action\":\"दस्तावेज़ अपलोड करें\",\"page.judgeDashboard.modal.delete.title\":\"क्या आप निश्चित हैं?\",\"page.judgeDashboard.modal.delete.description\":\"यह कार्रवाई पूर्ववत नहीं की जा सकती। यह \\\"{{caseIdentifier}}\\\" मामले को स्थायी रूप से हटा देगा।\",\"page.judgeDashboard.modal.delete.description.local\":\"यह कार्रवाई पूर्ववत नहीं की जा सकती। यह \\\"{{caseIdentifier}}\\\" मामले को स्थायी रूप से स्थानीय भंडारण से हटा देगा।\",\"page.judgeDashboard.modal.delete.action\":\"हटाएं\",\"toast.caseUpdated.title\":\"केस अपडेट किया गया\",\"toast.caseUpdated.description\":\"केस {{caseNumber}} स्थानीय रूप से अपडेट किया गया है।\",\"toast.caseUpdated.description.status\":\"मामले {{caseNumber}} की स्थिति को {{status}} में अपडेट किया गया।\",\"toast.noteAdded.title\":\"नोट जोड़ा गया\",\"toast.noteAdded.description\":\"मामले {{caseNumber}} में नोट जोड़ा गया।\",\"toast.hearingRescheduled.title\":\"सुनवाई पुनर्निर्धारित की गई\",\"toast.hearingRescheduled.description\":\"मामले {{caseNumber}} की सुनवाई {{date}} के लिए पुनर्निर्धारित की गई।\",\"toast.uploadSuccess.title\":\"अपलोड सफल\",\"toast.uploadSuccess.description\":\"दस्तावेज़ '{{docName}}' केस में जोड़ा गया।\",\"toast.invalidDate.title\":\"अमान्य तिथि\",\"toast.invalidDate.description\":\"कृपया एक वैध तिथि और समय चुनें।\",\"toast.noFileSelected.title\":\"कोई फ़ाइल नहीं चुनी गई\",\"toast.noFileSelected.description\":\"कृपया अपलोड करने के लिए एक फ़ाइल चुनें।\",\"toast.docNameRequired.title\":\"दस्तावेज़ का नाम आवश्यक है\",\"toast.docNameRequired.description\":\"कृपया दस्तावेज़ के लिए एक नाम प्रदान करें।\",\"toast.caseDeleted.title\":\"केस हटाया गया\",\"toast.caseDeleted.description\":\"मामला {{caseIdentifier}} स्थानीय भंडारण से हटा दिया गया है।\",\"toast.updateFailed\":\"केस अपडेट करने में विफल। कृपया पुनः प्रयास करें।\",\"toast.deleteFailed\":\"केस हटाने में विफल। कृपया पुनः प्रयास करें।\",\"toast.uploadFailed\":\"दस्तावेज़ अपलोड करने में विफल। कृपया पुनः प्रयास करें।\",\"toast.accessDenied.title\":\"पहुंच अस्वीकृत\",\"toast.accessDenied.description.judgeDashboard\":\"इस पृष्ठ को देखने के लिए आपको न्यायाधीश के रूप में लॉग इन होना चाहिए।\",\"page.caseDetail.pageName\":\"केस विवरण\",\"page.caseDetail.backButton\":\"वापस\",\"page.caseDetail.caseNumberPrefix\":\"केस नंबर: {{caseNumber}}\",\"page.caseDetail.section.overview\":\"केस अवलोकन\",\"page.caseDetail.section.details\":\"केस विवरण\",\"page.caseDetail.section.documents\":\"संबंधित दस्तावेज़\",\"page.caseDetail.section.judgeNotes\":\"न्यायाधीश के नोट्स\",\"page.caseDetail.section.timeline\":\"केस टाइमलाइन\",\"page.caseDetail.timelineComingSoon\":\"विस्तृत टाइमलाइन दृश्य जल्द ही आ रहा है।\",\"page.caseDetail.info.plaintiff\":\"वादी\",\"page.caseDetail.info.defendant\":\"प्रतिवादी\",\"page.caseDetail.info.court\":\"न्यायालय\",\"page.caseDetail.info.judge\":\"पीठासीन न्यायाधीश\",\"page.caseDetail.info.urgency\":\"तत्काल आवश्यकता\",\"page.caseDetail.info.filingDate\":\"दाखिल करने की तारीख\",\"page.caseDetail.info.lastUpdated\":\"अंतिम अपडेट\",\"page.caseDetail.info.nextHearingDate\":\"अगली सुनवाई की तारीख\",\"page.caseDetail.docItem.uploadedByOn\":\"{{uploader}} द्वारा {{date}} को अपलोड किया गया\",\"page.caseDetail.docItem.downloadAriaLabel\":\"{{docName}} डाउनलोड करें\",\"page.caseDetail.noteItem.byOn\":\"{{author}} द्वारा {{date}} को\",\"page.caseDetail.button.aiSummary\":\"एआई सारांश\",\"page.caseDetail.button.updateStatus\":\"स्थिति अपडेट करें\",\"page.caseDetail.button.addNote\":\"नोट जोड़ें\",\"page.caseDetail.button.uploadDocument\":\"दस्तावेज़ अपलोड करें\",\"page.caseDetail.toast.judgeAction.title\":\"न्यायाधीश कार्रवाई: {{action}}\",\"page.caseDetail.toast.judgeAction.description\":\"केस {{caseNumber}} के लिए कार्रवाई '{{action}}' का अनुकरण किया गया\",\"page.caseDetail.toast.downloadStarted.title\":\"डाउनलोड शुरू\",\"page.caseDetail.toast.downloadStarted.description\":\"{{fileName}} के लिए डाउनलोड लिंक खोला जा रहा है\",\"page.caseDetail.notFoundTitle\":\"केस नहीं मिला\",\"page.caseDetail.notFound\":\"अनुरोधित केस ({{caseId}}) स्थानीय रूप से नहीं मिला या आपके पास इसे देखने की अनुमति नहीं है।\",\"page.caseDetail.accessDenied\":\"आपको इस मामले को देखने की अनुमति नहीं है।\",\"page.caseDetail.caseNotAvailable\":\"मामला उपलब्ध नहीं है।\",\"page.caseDetail.backToDashboard\":\"डैशबोर्ड पर वापस जाएं\",\"page.caseDetail.loading\":\"केस विवरण लोड हो रहा है...\",\"page.caseDetail.loadError\":\"केस विवरण लोड करने में विफल। कृपया पुनः प्रयास करें।\",\"page.caseDetail.downloadError\":\"डाउनलोड शुरू करने में विफल। अमान्य दस्तावेज़ URL।\",\"page.addCase.title\":\"नया केस जोड़ें\",\"page.addCase.description\":\"नए केस के लिए विवरण दर्ज करें और ईमेल द्वारा संबंधित उपयोगकर्ताओं को असाइन करें।\",\"page.addCase.section.details\":\"केस विवरण\",\"page.addCase.section.parties\":\"पार्टियां और असाइनमेंट\",\"page.addCase.section.documents\":\"दस्तावेज़\",\"page.addCase.label.title\":\"केस शीर्षक\",\"page.addCase.placeholder.title\":\"जैसे, स्मिथ बनाम जोन्स संपत्ति विवाद\",\"page.addCase.label.caseNumber\":\"केस नंबर\",\"page.addCase.placeholder.caseNumber\":\"जैसे, CV-2024-123\",\"page.addCase.hint.caseNumber\":\"अद्वितीय होना चाहिए। अक्षर, संख्या, हाइफ़न का उपयोग करें (जैसे, CV-YYYY-NNN)।\",\"page.addCase.label.court\":\"न्यायालय\",\"page.addCase.placeholder.court\":\"जैसे, एनीटाउन का जिला न्यायालय\",\"page.addCase.label.status\":\"प्रारंभिक स्थिति\",\"page.addCase.placeholder.status\":\"प्रारंभिक स्थिति चुनें\",\"page.addCase.label.urgency\":\"तत्काल आवश्यकता स्तर\",\"page.addCase.placeholder.urgency\":\"तत्काल आवश्यकता चुनें\",\"page.addCase.label.description\":\"केस विवरण\",\"page.addCase.placeholder.description\":\"केस का संक्षिप्त अवलोकन प्रदान करें...\",\"page.addCase.label.plaintiffName\":\"वादी का पूरा नाम\",\"page.addCase.placeholder.plaintiffName\":\"जैसे, जॉन स्मिथ\",\"page.addCase.label.assignPlaintiffEmail\":\"वादी ईमेल असाइन करें\",\"page.addCase.placeholder.assignPlaintiffEmail\":\"वादी का ईमेल दर्ज करें\",\"page.addCase.label.defendantName\":\"प्रतिवादी का पूरा नाम\",\"page.addCase.placeholder.defendantName\":\"जैसे, एलिस जोन्स\",\"page.addCase.label.assignDefendantEmail\":\"प्रतिवादी ईमेल असाइन करें\",\"page.addCase.placeholder.assignDefendantEmail\":\"प्रतिवादी का ईमेल दर्ज करें\",\"page.addCase.label.assignJudgeEmail\":\"न्यायाधीश ईमेल असाइन करें\",\"page.addCase.placeholder.assignJudgeEmail\":\"न्यायाधीश का ईमेल दर्ज करें\",\"page.addCase.label.assignLawyerEmail\":\"वकील ईमेल असाइन करें\",\"page.addCase.placeholder.assignLawyerEmail\":\"वकील का ईमेल दर्ज करें\",\"page.addCase.label.documentUpload\":\"दस्तावेज़ अपलोड करें (PDF)\",\"page.addCase.hint.documentUpload\":\"वैकल्पिक। अधिकतम फ़ाइल आकार: {{maxSize}}एमबी। केवल PDF।\",\"page.addCase.unassigned\":\"असाइन नहीं किया गया\",\"page.addCase.noUsersFound\":\"भूमिका के लिए कोई उपयोगकर्ता नहीं मिला: {{role}}\",\"page.addCase.submitButton\":\"केस जोड़ें\",\"page.addCase.submittingButton\":\"केस जोड़ रहा है...\",\"page.addCase.successTitle\":\"केस जोड़ा गया\",\"page.addCase.successDescription.saved\":\"केस {{caseNumber}} सफलतापूर्वक स्थानीय रूप से सहेजा गया है।\",\"page.addCase.error.fetchUsersFailed\":\"असाइनमेंट के लिए उपयोगकर्ताओं को लोड करने में विफल।\",\"page.addCase.error.titleMin\":\"शीर्षक कम से कम 5 वर्णों का होना चाहिए।\",\"page.addCase.error.descriptionMin\":\"विवरण कम से कम 10 वर्णों का होना चाहिए।\",\"page.addCase.error.caseNumberFormat\":\"केस नंबर में केवल अक्षर, संख्या और हाइफ़न हो सकते हैं।\",\"page.addCase.error.caseNumberRequired\":\"केस नंबर आवश्यक है।\",\"page.addCase.error.caseNumberDuplicate\":\"केस नंबर \\\"{{caseNumber}}\\\" पहले से मौजूद है।\",\"page.addCase.error.courtMin\":\"न्यायालय का नाम कम से कम 3 वर्णों का होना चाहिए।\",\"page.addCase.error.plaintiffNameMin\":\"वादी का नाम कम से कम 2 वर्णों का होना चाहिए।\",\"page.addCase.error.defendantNameMin\":\"प्रतिवादी का नाम कम से कम 2 वर्णों का होना चाहिए।\",\"page.addCase.error.statusRequired\":\"केस की स्थिति आवश्यक है।\",\"page.addCase.error.urgencyRequired\":\"तत्काल आवश्यकता स्तर आवश्यक है।\",\"page.addCase.error.plaintiffEmailRequired\":\"वादी ईमेल आवश्यक है।\",\"page.addCase.error.plaintiffEmailFormat\":\"अमान्य वादी ईमेल प्रारूप।\",\"page.addCase.error.defendantEmailRequired\":\"प्रतिवादी ईमेल आवश्यक है।\",\"page.addCase.error.defendantEmailFormat\":\"अमान्य प्रतिवादी ईमेल प्रारूप।\",\"page.addCase.error.judgeEmailFormat\":\"अमान्य न्यायाधीश ईमेल प्रारूप।\",\"page.addCase.error.lawyerEmailFormat\":\"अमान्य वकील ईमेल प्रारूप।\",\"page.addCase.error.documentInvalid\":\"अमान्य फ़ाइल इनपुट।\",\"page.addCase.error.documentSize\":\"फ़ाइल का आकार {{maxSize}}एमबी की सीमा से अधिक है।\",\"page.addCase.error.documentType\":\"अमान्य फ़ाइल प्रकार। केवल PDF की अनुमति है।\",\"page.addCase.error.documentProcessing\":\"अपलोड किए गए दस्तावेज़ को संसाधित करने में त्रुटि।\",\"page.addCase.toast.blobUrlWarning.title\":\"स्थानीय दस्तावेज़ लिंक\",\"page.addCase.toast.blobUrlWarning.description\":\"अपलोड किया गया दस्तावेज़ एक अस्थायी ब्लॉब यूआरएल का उपयोग करके स्थानीय रूप से लिंक किया गया है। यह केवल इस ब्राउज़र सत्र के दौरान सुलभ होगा।\",\"page.addCase.loadingPage\":\"केस जोड़ने का पृष्ठ लोड हो रहा है...\",\"page.addCase.accessDenied\":\"केस जोड़ने के लिए आपको न्यायालय अधिकारी होना चाहिए।\",\"error.genericTitle\":\"त्रुटि\",\"cancel\":\"रद्द करें\",\"na\":\"लागू नहीं\",\"optional\":\"वैकल्पिक\",\"accessDenied.loginRequired.page\":\"{{pageName}} का उपयोग करने के लिए कृपया लॉग इन करें।\",\"placeholders.email\":\"नाम@उदाहरण.कॉम\",\"placeholders.password\":\"••••••••\",\"logo.ariaLabel\":\"नेक्स्टजेन-ईकोर्ट लोगो\",\"viewCaseLinkText\":\"केस देखें {{caseId}}\",\"judgeActionsPrompt\":\"न्यायाधीश कार्रवाइयाँ न्यायाधीश डैशबोर्ड पर की जाती हैं।\",\"goToJudgeDashboard\":\"न्यायाधीश डैशबोर्ड पर जाएं\",\"demoWarning.title\":\"सुरक्षा चेतावनी / डेमो मोड\",\"demoWarning.login\":\"यह लॉगिन केवल प्रदर्शन के लिए क्लाइंट-साइड स्टोरेज का उपयोग करता है। पासवर्ड सुरक्षित रूप से संग्रहीत नहीं हैं। वास्तविक क्रेडेंशियल का उपयोग न करें।\",\"demoWarning.signup\":\"यह साइनअप केवल प्रदर्शन के लिए क्लाइंट-साइड स्टोरेज का उपयोग करता है। पासवर्ड सुरक्षित रूप से संग्रहीत नहीं हैं। वास्तविक क्रेडेंशियल का उपयोग न करें।\",\"demoWarning.dashboard\":\"उपयोगकर्ता प्रमाणीकरण और केस डेटा वर्तमान में आपके ब्राउज़र में Dexie (IndexedDB) का उपयोग करके स्थानीय रूप से संग्रहीत हैं। यह केवल प्रदर्शन उद्देश्यों के लिए है और **पासवर्ड के लिए सुरक्षित नहीं है**। डेटा स्थानीय रूप से स्थायी है लेकिन यदि आप ब्राउज़र डेटा साफ़ करते हैं या ब्राउज़र/डिवाइस बदलते हैं तो खो जाएगा।\",\"demoWarning.judgeDashboard.local\":\"न्यायाधीश कार्रवाइयां केवल स्थानीय केस डेटा को संशोधित करती हैं। परिवर्तन स्थानीय रूप से Dexie में सहेजे जाते हैं लेकिन **साझा नहीं** किए जाते हैं या बैकअप नहीं लिए जाते हैं। वास्तविक सहयोगात्मक कार्यक्षमता के लिए बैकएंड एकीकरण आवश्यक है।\",\"demoWarning.profile\":\"उपयोगकर्ता प्रोफ़ाइल डेटा स्थानीय ब्राउज़र स्टोरेज (Dexie/IndexedDB) से लोड किया जाता है और स्थानीय रूप से स्थायी होता है लेकिन डिवाइस या ब्राउज़र के बीच नहीं। इस मोड में प्रोफ़ाइल संपादन अक्षम है।\",\"demoWarning.caseDetail.local\":\"केस डेटा स्थानीय भंडारण (Dexie/IndexedDB) से लोड किया जाता है। संबंधित दस्तावेज़ अस्थायी स्थानीय URL का उपयोग करते हैं। न्यायाधीश की कार्रवाइयां न्यायाधीश डैशबोर्ड पर की जाती हैं।\",\"demoWarning.addCase.localPersistence\":\"केस जोड़ने में स्थानीय भंडारण (Dexie/IndexedDB) का उपयोग होता है। जोड़े गए केस स्थानीय रूप से स्थायी हैं लेकिन डिवाइस या ब्राउज़र के बीच **साझा नहीं** किए जाते हैं। अपलोड किए गए दस्तावेज़ यूआरएल अस्थायी (ब्लॉब यूआरएल) हैं।\",\"common.disabled\":\"अक्षम\",\"common.localOnly\":\"स्थानीय\",\"common.localBlobUrlWarning\":\"डाउनलोड एक अस्थायी स्थानीय URL का उपयोग करता है। रीफ्रेश के बाद काम नहीं कर सकता है।\",\"landing.hero.title\":\"न्याय का भविष्य, आज ही प्रदान किया गया\",\"landing.hero.subtitle\":\"नेक्स्टजेन-ईकोर्ट अत्याधुनिक एआई और सुरक्षित तकनीक के साथ न्यायिक प्रक्रिया में दक्षता, पारदर्शिता और पहुंच लाता है।\",\"landing.features.title\":\"न्यायालय संचालन में क्रांति\",\"landing.features.subtitle\":\"कार्यप्रवाह को सुव्यवस्थित करने और न्यायिक कार्यवाही को बढ़ाने के लिए डिज़ाइन की गई शक्तिशाली विशेषताओं का अन्वेषण करें।\",\"landing.features.summarization.title\":\"एआई केस सारांश\",\"landing.features.summarization.description\":\"लंबे कानूनी दस्तावेजों से तुरंत मुख्य बिंदुओं को निकालें और संक्षिप्त सारांश उत्पन्न करें।\",\"landing.features.transcription.title\":\"वाक्-से-पाठ प्रतिलेखन\",\"landing.features.transcription.description\":\"उन्नत एनएलपी का उपयोग करके अदालत की सुनवाई और ऑडियो रिकॉर्डिंग को खोजने योग्य डिजिटल टेक्स्ट रिकॉर्ड में सटीक रूप से परिवर्तित करें।\",\"landing.features.research.title\":\"एआई कानूनी अनुसंधान\",\"landing.features.research.description\":\"हमारे बुद्धिमान अनुसंधान सहायक के साथ प्रासंगिक केस कानून, क़ानून और कानूनी विश्लेषण जल्दी से खोजें।\",\"landing.features.blockchain.title\":\"सुरक्षित ब्लॉकचेन रिकॉर्ड्स\",\"landing.features.blockchain.description\":\"छेड़छाड़-रोधी ब्लॉकचेन तकनीक के साथ अदालत के रिकॉर्ड की प्रामाणिकता और अखंडता सुनिश्चित करें।\",\"landing.features.virtualCourt.title\":\"वर्चुअल कोर्टरूम\",\"landing.features.virtualCourt.description\":\"सुरक्षित दूरस्थ सुनवाई और वीडियो कॉन्फ्रेंस आयोजित करें, पहुंच बढ़ाएं और देरी कम करें।\",\"landing.features.chatbot.title\":\"एआई कानूनी सहायक चैटबॉट\",\"landing.features.chatbot.description\":\"प्रक्रियात्मक प्रश्नों, दस्तावेज़ मार्गदर्शन और केस स्थिति अपडेट के लिए तत्काल उत्तर प्राप्त करें।\",\"landing.features.scheduling.title\":\"बुद्धिमान अनुसूचन\",\"landing.features.scheduling.description\":\"बकाया मामलों और प्रतीक्षा समय को कम करने के लिए सुनवाई की तारीखों और कोर्टरूम आवंटन को स्वचालित रूप से अनुकूलित करें।\",\"landing.features.workflow.title\":\"स्वचालित कार्यप्रवाह\",\"landing.features.workflow.description\":\"अधिकतम दक्षता के लिए केस फाइलिंग, दस्तावेज़ प्रबंधन और अधिसूचना प्रक्रियाओं को सुव्यवस्थित करें।\",\"landing.benefits.title\":\"नेक्स्टजेन-ईकोर्ट क्यों चुनें?\",\"landing.benefits.efficiency.title\":\"बढ़ी हुई दक्षता\",\"landing.benefits.efficiency.description\":\"दोहराए जाने वाले कार्यों को स्वचालित करें, कागजी कार्रवाई कम करें, और केस प्रसंस्करण में तेजी लाएं।\",\"landing.benefits.transparency.title\":\"बढ़ी हुई पारदर्शिता\",\"landing.benefits.transparency.description\":\"सभी अधिकृत पक्षों के लिए केस जानकारी तक सुरक्षित, वास्तविक समय तक पहुंच प्रदान करें।\",\"landing.benefits.accessibility.title\":\"बेहतर पहुंच\",\"landing.benefits.accessibility.description\":\"स्थान की परवाह किए बिना दूरस्थ भागीदारी और न्याय तक पहुंच सक्षम करें।\",\"landing.cta.title\":\"क्या आप अपने न्यायालय को आधुनिक बनाने के लिए तैयार हैं?\",\"landing.cta.subtitle\":\"न्यायिक निकायों की बढ़ती संख्या में शामिल हों जो नेक्स्टजेन-ईकोर्ट के साथ अपने संचालन को बदल रहे हैं।\",\"landing.cta.button\":\"आज ही शुरू करें\",\"page.videoCall.title\":\"वीडियो कॉल / सुनवाई\",\"page.videoCall.description.joinOrCreate\":\"मौजूदा वीडियो कॉल में शामिल हों या एक नया शुरू करें।\",\"page.videoCall.description.inMeeting\":\"वर्तमान में बैठक में: {{code}}\",\"page.videoCall.joinTitle\":\"मौजूदा बैठक में शामिल हों\",\"page.videoCall.joinDescription\":\"मेजबान द्वारा प्रदान किया गया अद्वितीय 6-वर्ण कोड दर्ज करें।\",\"page.videoCall.startTitle\":\"नई बैठक शुरू करें\",\"page.videoCall.startDescription\":\"एक नई बैठक शुरू करने के लिए एक अद्वितीय कोड उत्पन्न करें।\",\"page.videoCall.label.meetingCode\":\"बैठक कोड\",\"page.videoCall.placeholder.meetingCode\":\"ABCXYZ\",\"page.videoCall.button.joinMeeting\":\"बैठक में शामिल हों\",\"page.videoCall.button.startMeeting\":\"नई बैठक शुरू करें\",\"page.videoCall.button.leaveMeeting\":\"बैठक छोड़ें\",\"page.videoCall.button.copyCode\":\"कोड कॉपी करें\",\"page.videoCall.error.permissionDeniedTitle\":\"अनुमति अस्वीकृत\",\"page.videoCall.error.permissionDenied\":\"वीडियो कॉल में शामिल होने या शुरू करने के लिए कैमरा और माइक्रोफ़ोन एक्सेस आवश्यक है। कृपया अपने ब्राउज़र सेटिंग्स में अनुमति दें।\",\"page.videoCall.error.permissionRequired\":\"कैमरा और माइक्रोफ़ोन एक्सेस आवश्यक है।\",\"page.videoCall.error.codeRequired\":\"कृपया एक मीटिंग कोड दर्ज करें।\",\"page.videoCall.error.copyFailed\":\"क्लिपबोर्ड पर कोड कॉपी करने में विफल।\",\"page.videoCall.toast.joiningTitle\":\"बैठक में शामिल हुए\",\"page.videoCall.toast.joiningDescription\":\"बैठक {{code}} से सफलतापूर्वक कनेक्ट हुए।\",\"page.videoCall.toast.startedTitle\":\"बैठक शुरू हुई\",\"page.videoCall.toast.startedDescription\":\"बैठक {{code}} अब सक्रिय है। कोड साझा करें।\",\"page.videoCall.toast.leftMeeting\":\"आपने बैठक छोड़ दी है।\",\"page.videoCall.toast.codeCopied\":\"मीटिंग कोड क्लिपबोर्ड पर कॉपी किया गया!\",\"page.videoCall.shareCode\":\"यह कोड प्रतिभागियों के साथ साझा करें:\",\"page.videoCall.waitingForPermission\":\"कैमरा/माइक अनुमति की प्रतीक्षा है...\",\"page.videoCall.placeholder.controls\":\"बैठक नियंत्रण (म्यूट, वीडियो टॉगल, स्क्रीन शेयर, आदि) यहां दिखाई देंगे।\",\"page.videoCall.permissionNeeded\":\"कैमरा और माइक्रोफ़ोन एक्सेस की आवश्यकता है।\",\"page.videoCall.requestingPermission\":\"अनुमतियाँ अनुरोधित की जा रही हैं...\",\"page.videoCall.error.permissionInstructions\":\"वीडियो कॉल सुविधा का उपयोग करने के लिए कृपया अपने ब्राउज़र सेटिंग्स में कैमरा और माइक्रोफ़ोन अनुमतियों को सक्षम करें।\",\"page.videoCall.infoTitle\":\"वीडियो कॉल निर्देश\",\"page.videoCall.infoText\":\"बैठक में शामिल होने के लिए, मेजबान द्वारा प्रदान किया गया 6-वर्ण कोड दर्ज करें।\",\"page.videoCall.infoTextOfficial\":\"एक न्यायालय अधिकारी के रूप में, आप एक नई बैठक शुरू कर सकते हैं और उत्पन्न कोड साझा कर सकते हैं।\",\"page.videoCall.infoTextParticipant\":\"आप न्यायालय अधिकारी द्वारा साझा किए गए कोड का उपयोग करके बैठक में शामिल हो सकते हैं।\",\"page.videoCall.button.retryPermission\":\"अनुमति पुनः प्रयास करें\",\"page.videoCall.participants\":\"प्रतिभागी ({{count}})\",\"page.videoCall.participantListTitle\":\"प्रतिभागी सूची\",\"page.videoCall.noParticipants\":\"अभी तक कोई अन्य प्रतिभागी नहीं।\",\"page.videoCall.you\":\"आप\",\"page.videoCall.meetingCodeLabel\":\"बैठक कोड\",\"page.videoCall.toast.participantJoined\":\"{{name}} बैठक में शामिल हुए।\",\"page.videoCall.toast.participantLeft\":\"{{name}} ने बैठक छोड़ दी।\",\"page.videoCall.toast.connectedTitle\":\"जुड़ा हुआ\",\"page.videoCall.toast.connectedDescription\":\"वास्तविक समय कनेक्शन स्थापित हुआ।\",\"page.videoCall.error.connectionFailedTitle\":\"कनेक्शन विफल\",\"page.videoCall.error.connectionFailed\":\"{{url}} पर वीडियो कॉल सर्वर से कनेक्ट नहीं हो सका। विवरण: {{details}}\",\"page.videoCall.error.disconnectedTitle\":\"डिस्कनेक्ट किया गया\",\"page.videoCall.error.disconnected\":\"वीडियो कॉल सर्वर से कनेक्शन टूट गया।\",\"page.videoCall.error.configMissing\":\"वीडियो कॉल सर्वर यूआरएल कॉन्फ़िगर नहीं है।\",\"page.videoCall.error.notConnected\":\"वीडियो कॉल सर्वर से कनेक्ट नहीं है। कृपया प्रतीक्षा करें या कनेक्शन जांचें।\",\"page.videoCall.error.invalidCodeTitle\":\"अमान्य कोड\",\"page.videoCall.error.invalidCodeDescription\":\"बैठक कोड 6 अपरकेस अक्षर या संख्याएँ होनी चाहिए।\",\"page.videoCall.error.checkServer\":\"कृपया सुनिश्चित करें कि सर्वर चल रहा है और सुलभ है।\",\"page.videoCall.toast.micOn\":\"माइक्रोफ़ोन चालू\",\"page.videoCall.toast.micOff\":\"माइक्रोफ़ोन म्यूट\",\"page.videoCall.toast.cameraOn\":\"कैमरा चालू\",\"page.videoCall.toast.cameraOff\":\"कैमरा बंद\",\"page.videoCall.muteMicAria\":\"माइक्रोफ़ोन म्यूट करें\",\"page.videoCall.unmuteMicAria\":\"माइक्रोफ़ोन अनम्यूट करें\",\"page.videoCall.cameraOffAria\":\"कैमरा बंद करें\",\"page.videoCall.cameraOnAria\":\"कैमरा चालू करें\",\"page.videoCall.warning.backendTitle\":\"बैकएंड आवश्यक\",\"page.videoCall.warning.backendDescription\":\"इस वीडियो कॉल सुविधा के लिए सिग्नलिंग के लिए एक चालू Socket.IO बैकएंड सर्वर की आवश्यकता है। फ्रंटएंड कोड लागू किया गया है, लेकिन सुनिश्चित करें कि {{url}} पर सर्वर चल रहा है। इसके बिना, कनेक्शन विफल हो जाएंगे। त्रुटियों के लिए ब्राउज़र कंसोल और सर्वर लॉग जांचें।\",\"page.videoCall.warning.urlNotSet\":\"URL_सेट_नहीं_है\",\"page.videoCall.waitingForOthers\":\"अन्य लोगों के शामिल होने की प्रतीक्षा है...\",\"page.videoCall.startHint\":\"केवल न्यायालय अधिकारी ही नई बैठकें शुरू कर सकते हैं।\"}"));}}),
"[project]/src/locales/es.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"appName\":\"Nextgen-Ecourt\",\"footer.copyright\":\"© {{year}} Nextgen-Ecourt. Todos los derechos reservados.\",\"header.dashboard\":\"Tablero\",\"header.aiSummaries\":\"Resúmenes IA\",\"header.legalResearch\":\"Investigación Legal\",\"header.judgeDashboard\":\"Tablero del Juez\",\"header.addCase\":\"Agregar Caso\",\"header.videoCall\":\"Videollamada\",\"header.homeAriaLabel\":\"Página de inicio de Nextgen-Ecourt\",\"header.toggleNavAriaLabel\":\"Alternar menú de navegación\",\"languageToggle.selectLanguage\":\"Seleccionar Idioma\",\"login.title\":\"Iniciar sesión en Nextgen-Ecourt\",\"login.description\":\"Ingrese sus credenciales para acceder a su cuenta.\",\"login.emailLabel\":\"Dirección de correo electrónico\",\"login.passwordLabel\":\"Contraseña\",\"login.forgotPassword\":\"¿Olvidaste tu contraseña?\",\"login.loginButton\":\"Iniciar sesión\",\"login.loggingInButton\":\"Iniciando sesión...\",\"login.noAccount\":\"¿No tienes una cuenta?\",\"login.signupLink\":\"Regístrate aquí\",\"login.failedTitle\":\"Error de inicio de sesión\",\"login.unexpectedError\":\"Ocurrió un error inesperado. Por favor, inténtalo de nuevo.\",\"login.invalidCredentials\":\"Correo electrónico o contraseña no válidos.\",\"login.emailPlaceholder\":\"nombre@ejemplo.com\",\"login.passwordPlaceholder\":\"••••••••\",\"login.hidePasswordAriaLabel\":\"Ocultar contraseña\",\"login.showPasswordAriaLabel\":\"Mostrar contraseña\",\"login.error.invalidEmail\":\"Dirección de correo electrónico inválida.\",\"login.error.passwordLength\":\"La contraseña debe tener al menos 6 caracteres.\",\"login.error.passwordRequired\":\"Se requiere contraseña.\",\"login.error.userDocNotFound\":\"Perfil de usuario no encontrado.\",\"login.successTitle\":\"Inicio de Sesión Exitoso\",\"login.successDescription\":\"¡Bienvenido de nuevo, {{name}}!\",\"signup.title\":\"Crear cuenta en Nextgen-Ecourt\",\"signup.description\":\"Únete a Nextgen-Ecourt para gestionar y seguir casos eficientemente.\",\"signup.nameLabel\":\"Nombre completo\",\"signup.namePlaceholder\":\"Juan Pérez\",\"signup.roleLabel\":\"Tu rol\",\"signup.confirmPasswordLabel\":\"Confirmar contraseña\",\"signup.signupButton\":\"Registrarse\",\"signup.creatingAccountButton\":\"Creando cuenta...\",\"signup.hasAccount\":\"¿Ya tienes una cuenta?\",\"signup.loginLink\":\"Inicia sesión aquí\",\"signup.failedTitle\":\"Error de registro\",\"signup.error.unexpected\":\"Ocurrió un error inesperado durante el registro. Por favor, inténtalo de nuevo.\",\"signup.error.nameLength\":\"El nombre debe tener al menos 2 caracteres.\",\"signup.error.invalidEmail\":\"Formato de dirección de correo electrónico inválido.\",\"signup.error.passwordLength\":\"La contraseña debe tener al menos 6 caracteres.\",\"signup.error.passwordsDontMatch\":\"Las contraseñas no coinciden.\",\"signup.error.roleRequired\":\"Por favor, selecciona un rol.\",\"signup.error.generic\":\"Ocurrió un error. Por favor, verifica tu entrada.\",\"signup.error.emailInUse\":\"Esta dirección de correo electrónico ya está en uso.\",\"signup.error.weakPassword\":\"La contraseña es demasiado débil. Por favor, elige una contraseña más segura.\",\"signup.hideConfirmPasswordAriaLabel\":\"Ocultar contraseña confirmada\",\"signup.showConfirmPasswordAriaLabel\":\"Mostrar contraseña confirmada\",\"signup.successTitle\":\"Cuenta Creada\",\"signup.successDescription\":\"Tu cuenta para {{email}} ha sido creada exitosamente (localmente).\",\"profile.title\":\"Perfil\",\"profile.editButton\":\"Editar Perfil\",\"profile.logoutButton\":\"Cerrar Sesión\",\"profile.avatarAlt\":\"Foto de perfil de {{name}}\",\"profile.initialsFallback\":\"{{initials}}\",\"profile.info.email\":\"Dirección de correo electrónico\",\"profile.info.userId\":\"ID de Usuario\",\"profile.info.accountType\":\"Tipo de Cuenta\",\"profile.info.accountTypeValue\":\"Cuenta de {{role}}\",\"profile.supportMessage\":\"Para cualquier problema relacionado con la cuenta, por favor contacta a soporte en support@nextgen-ecourt.app.\",\"profile.loading\":\"Cargando perfil...\",\"caseCard.caseNumber\":\"Número de Caso: {{caseNumber}}\",\"caseCard.plaintiff\":\"Demandante\",\"caseCard.defendant\":\"Demandado\",\"caseCard.court\":\"Tribunal\",\"caseCard.judge\":\"Juez\",\"caseCard.filingDate\":\"Fecha de Presentación\",\"caseCard.lastUpdate\":\"Última Actualización\",\"caseCard.nextHearing\":\"Próxima Audiencia\",\"caseCard.viewDetails\":\"Ver Detalles\",\"caseCard.viewDetailsAriaLabel\":\"Ver detalles del caso: {{caseTitle}}\",\"caseCard.deleteButton\":\"Eliminar\",\"caseCard.deleteCaseAriaLabel\":\"Eliminar caso: {{caseTitle}}\",\"caseSearch.placeholder\":\"Buscar por número de caso, título, demandante, demandado...\",\"caseSearch.buttonLabel\":\"Buscar casos\",\"filterByStatus\":\"Filtrar por estado\",\"allStatuses\":\"Todos los Estados\",\"dashboard.title.judge\":\"Mis Casos Asignados\",\"dashboard.title.other\":\"Tablero de Casos\",\"dashboard.title.official\":\"Todos los Casos (Vista Oficial de Tribunal)\",\"dashboard.noCasesFound\":\"No se encontraron casos\",\"dashboard.noCasesFound.description.filtered\":\"Tus criterios de búsqueda o filtro no coincidieron con ningún caso.\",\"dashboard.noCasesFound.description.judge.empty\":\"Actualmente no tienes casos asignados.\",\"dashboard.noCasesFound.description.official.empty\":\"Aún no hay casos en el sistema.\",\"dashboard.noCasesFound.description.other.empty\":\"Actualmente no hay casos para mostrar para tu rol.\",\"dashboard.addNewCase\":\"Agregar Nuevo Caso\",\"dashboard.addYourFirstCase\":\"Agrega Tu Primer Caso\",\"dashboard.loading\":\"Cargando tablero...\",\"dashboard.error.loadFailed\":\"Error al cargar los casos. Por favor, intenta recargar.\",\"status.Pending\":\"Pendiente\",\"status.Filed\":\"Presentado\",\"status.Investigation\":\"Investigación\",\"status.InProgress\":\"En Progreso\",\"status.Hearing\":\"Audiencia\",\"status.Judgement\":\"Sentencia\",\"status.Resolved\":\"Resuelto\",\"status.Appealed\":\"Apelado\",\"status.OnHold\":\"En Espera\",\"status.Closed\":\"Cerrado\",\"urgency.High\":\"Alta\",\"urgency.Medium\":\"Media\",\"urgency.Low\":\"Baja\",\"role.Lawyer\":\"Abogado(a)\",\"role.Plaintiff\":\"Demandante\",\"role.Defendant\":\"Demandado(a)\",\"role.CourtOfficial\":\"Oficial de Tribunal\",\"role.Judge\":\"Juez(a)\",\"role.assignedManually\":\"Asignado Manualmente\",\"selectRole\":\"Selecciona tu rol\",\"userProfile.loginButton\":\"Iniciar sesión\",\"userProfile.profileLink\":\"Perfil\",\"userProfile.logoutButton\":\"Cerrar sesión\",\"page.summaries.title\":\"Resumidor de Casos IA\",\"page.summaries.description\":\"Genera resúmenes concisos de casos judiciales utilizando IA avanzada.\",\"page.summaries.caseDetailsPrefilled\":\"Detalles del caso pre-rellenados para el caso {{caseId}}. Puedes editarlos a continuación.\",\"page.summaries.enterCaseDetailsTitle\":\"Ingresar Detalles del Caso\",\"page.summaries.enterCaseDetailsDescription\":\"Pega o escribe el texto completo del caso, incluyendo todos los hechos y contextos relevantes.\",\"page.summaries.caseTextLabel\":\"Texto del Caso\",\"page.summaries.caseTextPlaceholder\":\"Ingresa los detalles completos del caso aquí...\",\"page.summaries.generateButton\":\"Generar Resumen\",\"page.summaries.generatingButton\":\"Generando Resumen...\",\"page.summaries.aiSummaryTitle\":\"Resumen Generado por IA\",\"page.summaries.aiSummaryDescription\":\"La IA proporcionará un resumen conciso a continuación.\",\"page.summaries.error.generic\":\"Error al generar el resumen. Por favor, inténtalo de nuevo.\",\"page.summaries.error.noDetails\":\"Por favor, ingresa los detalles del caso para resumir.\",\"page.summaries.loading\":\"Cargando Resúmenes IA...\",\"page.summaries.resultsPlaceholderTitle\":\"El resumen de tu caso aparecerá aquí.\",\"page.summaries.resultsPlaceholderDescription\":\"Ingresa los detalles del caso y haz clic en \\\"Generar Resumen\\\".\",\"page.summaries.fetchingCase\":\"Obteniendo detalles del caso...\",\"page.legalResearch.title\":\"Asistente de Investigación Legal\",\"page.legalResearch.description\":\"Utiliza la IA para encontrar jurisprudencia, estatutos y análisis legales relevantes.\",\"page.legalResearch.queryTitle\":\"Consulta de Investigación\",\"page.legalResearch.queryDescription\":\"Ingresa tu tema de investigación legal y el contexto opcional del caso.\",\"page.legalResearch.topicLabel\":\"Tema de Investigación\",\"page.legalResearch.topicPlaceholder\":\"ej., 'admisibilidad de la prueba de oídas en juicios civiles'\",\"page.legalResearch.contextLabel\":\"Contexto del Caso (Opcional)\",\"page.legalResearch.contextPlaceholder\":\"Proporciona hechos específicos, nombres de las partes o postura procesal relacionada con tu consulta...\",\"page.legalResearch.performResearchButton\":\"Realizar Investigación\",\"page.legalResearch.researchingButton\":\"Investigando...\",\"page.legalResearch.resultsTitle\":\"Resultados de la Investigación\",\"page.legalResearch.resultsDescription\":\"Jurisprudencia, estatutos y análisis legales relevantes aparecerán aquí.\",\"page.legalResearch.error.generic\":\"Error al realizar la investigación legal. Por favor, inténtalo de nuevo.\",\"page.legalResearch.error.topicRequired\":\"El tema de investigación no puede estar vacío.\",\"page.legalResearch.loading\":\"Cargando Asistente de Investigación Legal...\",\"page.legalResearch.resultsPlaceholderTitle\":\"Tus resultados de investigación aparecerán aquí.\",\"page.legalResearch.resultsPlaceholderDescription\":\"Ingresa un tema de investigación y haz clic en \\\"Realizar Investigación\\\".\",\"page.legalResearch.relevantCaseLaw\":\"Jurisprudencia Relevante ({{count}})\",\"page.legalResearch.relevantStatutes\":\"Estatutos Relevantes ({{count}})\",\"page.legalResearch.legalAnalysis\":\"Análisis Legal\",\"page.judgeDashboard.title\":\"Tablero del Juez\",\"page.judgeDashboard.loading\":\"Cargando Tablero del Juez...\",\"page.judgeDashboard.searchPlaceholder\":\"Buscar casos (título, número, partes)...\",\"page.judgeDashboard.filterStatusPlaceholder\":\"Filtrar por estado\",\"page.judgeDashboard.noCases.title\":\"No se Encontraron Casos\",\"page.judgeDashboard.noCases.description.filtered\":\"Tus criterios de búsqueda o filtro no coincidieron con ninguno de tus casos asignados.\",\"page.judgeDashboard.noCases.description.empty\":\"Actualmente no tienes casos asignados.\",\"page.judgeDashboard.caseCard.statusPrefix\":\"Estado: \",\"page.judgeDashboard.caseCard.lastUpdatedPrefix\":\"Última Actualización:\",\"page.judgeDashboard.caseCard.nextHearingPrefixFull\":\"Próxima Audiencia: {{date}}\",\"page.judgeDashboard.caseCard.noUpcomingHearing\":\"No hay próxima audiencia programada.\",\"page.judgeDashboard.button.updateStatus\":\"Estado\",\"page.judgeDashboard.button.addNote\":\"Nota\",\"page.judgeDashboard.button.reschedule\":\"Reprogramar\",\"page.judgeDashboard.button.upload\":\"Subir\",\"page.judgeDashboard.button.uploading\":\"Subiendo...\",\"page.judgeDashboard.button.deleteCase\":\"Eliminar Caso\",\"page.judgeDashboard.modal.updateStatus.title\":\"Actualizar Estado para {{caseNumber}}\",\"page.judgeDashboard.modal.updateStatus.description\":\"Selecciona el nuevo estado para este caso.\",\"page.judgeDashboard.modal.updateStatus.label\":\"Nuevo Estado\",\"page.judgeDashboard.modal.updateStatus.placeholder\":\"Seleccionar estado\",\"page.judgeDashboard.modal.updateStatus.action\":\"Actualizar Estado\",\"page.judgeDashboard.modal.addNote.title\":\"Agregar Nota a {{caseNumber}}\",\"page.judgeDashboard.modal.addNote.description\":\"Ingresa tu nota o resumen de la audiencia a continuación.\",\"page.judgeDashboard.modal.addNote.label\":\"Nota\",\"page.judgeDashboard.modal.addNote.placeholder\":\"Escribe tu nota aquí...\",\"page.judgeDashboard.modal.addNote.action\":\"Agregar Nota\",\"page.judgeDashboard.modal.reschedule.title\":\"Reprogramar Audiencia para {{caseNumber}}\",\"page.judgeDashboard.modal.reschedule.currentHearing\":\"Audiencia Actual: {{date}}\",\"page.judgeDashboard.modal.reschedule.currentHearingNotScheduled\":\"No Programada\",\"page.judgeDashboard.modal.reschedule.label\":\"Nueva Fecha y Hora de Audiencia\",\"page.judgeDashboard.modal.reschedule.action\":\"Reprogramar\",\"page.judgeDashboard.modal.upload.title\":\"Subir Documento para {{caseNumber}}\",\"page.judgeDashboard.modal.upload.description\":\"Selecciona un archivo y proporciona un nombre para el documento.\",\"page.judgeDashboard.modal.upload.docNameLabel\":\"Nombre del Documento\",\"page.judgeDashboard.modal.upload.docNamePlaceholder\":\"ej., Anexo A, Transcripción de Audiencia\",\"page.judgeDashboard.modal.upload.fileLabel\":\"Archivo\",\"page.judgeDashboard.modal.upload.fileSelected\":\"Seleccionado: {{fileName}}\",\"page.judgeDashboard.modal.upload.action\":\"Subir Documento\",\"page.judgeDashboard.modal.delete.title\":\"¿Estás seguro?\",\"page.judgeDashboard.modal.delete.description\":\"Esta acción no se puede deshacer. Esto eliminará permanentemente el caso \\\"{{caseIdentifier}}\\\".\",\"page.judgeDashboard.modal.delete.description.local\":\"Esta acción no se puede deshacer. Esto eliminará permanentemente el caso \\\"{{caseIdentifier}}\\\" del almacenamiento local.\",\"page.judgeDashboard.modal.delete.action\":\"Eliminar\",\"toast.caseUpdated.title\":\"Caso Actualizado\",\"toast.caseUpdated.description\":\"El caso {{caseNumber}} ha sido actualizado localmente.\",\"toast.caseUpdated.description.status\":\"El estado del caso {{caseNumber}} se actualizó a {{status}}.\",\"toast.noteAdded.title\":\"Nota Agregada\",\"toast.noteAdded.description\":\"Nota agregada al caso {{caseNumber}}.\",\"toast.hearingRescheduled.title\":\"Audiencia Reprogramada\",\"toast.hearingRescheduled.description\":\"La audiencia del caso {{caseNumber}} se reprogramó para {{date}}.\",\"toast.uploadSuccess.title\":\"Subida Exitosa\",\"toast.uploadSuccess.description\":\"El documento '{{docName}}' se agregó al caso.\",\"toast.invalidDate.title\":\"Fecha Inválida\",\"toast.invalidDate.description\":\"Por favor, selecciona una fecha y hora válidas.\",\"toast.noFileSelected.title\":\"No se Seleccionó Archivo\",\"toast.noFileSelected.description\":\"Por favor, selecciona un archivo para subir.\",\"toast.docNameRequired.title\":\"Nombre del Documento Requerido\",\"toast.docNameRequired.description\":\"Por favor, proporciona un nombre para el documento.\",\"toast.caseDeleted.title\":\"Caso Eliminado\",\"toast.caseDeleted.description\":\"El caso {{caseIdentifier}} ha sido eliminado del almacenamiento local.\",\"toast.updateFailed\":\"Error al actualizar el caso. Por favor, inténtalo de nuevo.\",\"toast.deleteFailed\":\"Error al eliminar el caso. Por favor, inténtalo de nuevo.\",\"toast.uploadFailed\":\"Error al subir el documento. Por favor, inténtalo de nuevo.\",\"toast.accessDenied.title\":\"Acceso Denegado\",\"toast.accessDenied.description.judgeDashboard\":\"Debes iniciar sesión como Juez para ver esta página.\",\"page.caseDetail.pageName\":\"Detalles del Caso\",\"page.caseDetail.backButton\":\"Atrás\",\"page.caseDetail.caseNumberPrefix\":\"Número de Caso: {{caseNumber}}\",\"page.caseDetail.section.overview\":\"Resumen del Caso\",\"page.caseDetail.section.details\":\"Detalles del Caso\",\"page.caseDetail.section.documents\":\"Documentos Asociados\",\"page.caseDetail.section.judgeNotes\":\"Notas del Juez\",\"page.caseDetail.section.timeline\":\"Cronología del Caso\",\"page.caseDetail.timelineComingSoon\":\"La vista detallada de la cronología estará disponible pronto.\",\"page.caseDetail.info.plaintiff\":\"Demandante\",\"page.caseDetail.info.defendant\":\"Demandado\",\"page.caseDetail.info.court\":\"Tribunal\",\"page.caseDetail.info.judge\":\"Juez Presidente\",\"page.caseDetail.info.urgency\":\"Urgencia\",\"page.caseDetail.info.filingDate\":\"Fecha de Presentación\",\"page.caseDetail.info.lastUpdated\":\"Última Actualización\",\"page.caseDetail.info.nextHearingDate\":\"Próxima Fecha de Audiencia\",\"page.caseDetail.docItem.uploadedByOn\":\"Subido por {{uploader}} el {{date}}\",\"page.caseDetail.docItem.downloadAriaLabel\":\"Descargar {{docName}}\",\"page.caseDetail.noteItem.byOn\":\"Por {{author}} el {{date}}\",\"page.caseDetail.button.aiSummary\":\"Resumen IA\",\"page.caseDetail.button.updateStatus\":\"Actualizar Estado\",\"page.caseDetail.button.addNote\":\"Agregar Nota\",\"page.caseDetail.button.uploadDocument\":\"Subir Documento\",\"page.caseDetail.toast.judgeAction.title\":\"Acción del Juez: {{action}}\",\"page.caseDetail.toast.judgeAction.description\":\"Acción '{{action}}' simulada para el caso {{caseNumber}}\",\"page.caseDetail.toast.downloadStarted.title\":\"Descarga Iniciada\",\"page.caseDetail.toast.downloadStarted.description\":\"Abriendo enlace de descarga para {{fileName}}\",\"page.caseDetail.notFoundTitle\":\"Caso No Encontrado\",\"page.caseDetail.notFound\":\"El caso solicitado ({{caseId}}) no pudo ser encontrado localmente o no tienes permiso para verlo.\",\"page.caseDetail.accessDenied\":\"No tienes permiso para ver este caso.\",\"page.caseDetail.caseNotAvailable\":\"Caso no disponible.\",\"page.caseDetail.backToDashboard\":\"Volver al Tablero\",\"page.caseDetail.loading\":\"Cargando detalles del caso...\",\"page.caseDetail.loadError\":\"Error al cargar los detalles del caso. Por favor, inténtalo de nuevo.\",\"page.caseDetail.downloadError\":\"No se pudo iniciar la descarga. URL de documento inválida.\",\"page.addCase.title\":\"Agregar Nuevo Caso\",\"page.addCase.description\":\"Ingrese los detalles del nuevo caso y asigne usuarios relevantes por correo electrónico.\",\"page.addCase.section.details\":\"Detalles del Caso\",\"page.addCase.section.parties\":\"Partes y Asignación\",\"page.addCase.section.documents\":\"Documentos\",\"page.addCase.label.title\":\"Título del Caso\",\"page.addCase.placeholder.title\":\"ej., Disputa de Propiedad Smith vs. Jones\",\"page.addCase.label.caseNumber\":\"Número de Caso\",\"page.addCase.placeholder.caseNumber\":\"ej., CV-2024-123\",\"page.addCase.hint.caseNumber\":\"Debe ser único. Use letras, números, guiones (ej., CV-AAAA-NNN).\",\"page.addCase.label.court\":\"Tribunal\",\"page.addCase.placeholder.court\":\"ej., Tribunal de Distrito de Anytown\",\"page.addCase.label.status\":\"Estado Inicial\",\"page.addCase.placeholder.status\":\"Seleccionar estado inicial\",\"page.addCase.label.urgency\":\"Nivel de Urgencia\",\"page.addCase.placeholder.urgency\":\"Seleccionar urgencia\",\"page.addCase.label.description\":\"Descripción del Caso\",\"page.addCase.placeholder.description\":\"Proporcione un breve resumen del caso...\",\"page.addCase.label.plaintiffName\":\"Nombre Completo del Demandante\",\"page.addCase.placeholder.plaintiffName\":\"ej., Juan Pérez\",\"page.addCase.label.assignPlaintiffEmail\":\"Asignar Email del Demandante\",\"page.addCase.placeholder.assignPlaintiffEmail\":\"Ingrese el email del Demandante\",\"page.addCase.label.defendantName\":\"Nombre Completo del Demandado\",\"page.addCase.placeholder.defendantName\":\"ej., Alicia González\",\"page.addCase.label.assignDefendantEmail\":\"Asignar Email del Demandado\",\"page.addCase.placeholder.assignDefendantEmail\":\"Ingrese el email del Demandado\",\"page.addCase.label.assignJudgeEmail\":\"Asignar Email del Juez\",\"page.addCase.placeholder.assignJudgeEmail\":\"Ingrese el email del Juez\",\"page.addCase.label.assignLawyerEmail\":\"Asignar Email del Abogado\",\"page.addCase.placeholder.assignLawyerEmail\":\"Ingrese el email del Abogado\",\"page.addCase.label.documentUpload\":\"Subir Documento (PDF)\",\"page.addCase.hint.documentUpload\":\"Opcional. Tamaño máximo de archivo: {{maxSize}}MB. Solo PDF.\",\"page.addCase.unassigned\":\"Sin asignar\",\"page.addCase.noUsersFound\":\"No se encontraron usuarios para el rol: {{role}}\",\"page.addCase.submitButton\":\"Agregar Caso\",\"page.addCase.submittingButton\":\"Agregando Caso...\",\"page.addCase.successTitle\":\"Caso Agregado\",\"page.addCase.successDescription.saved\":\"El caso {{caseNumber}} ha sido guardado localmente con éxito.\",\"page.addCase.error.fetchUsersFailed\":\"Error al cargar usuarios para asignación.\",\"page.addCase.error.titleMin\":\"El título debe tener al menos 5 caracteres.\",\"page.addCase.error.descriptionMin\":\"La descripción debe tener al menos 10 caracteres.\",\"page.addCase.error.caseNumberFormat\":\"El número de caso solo puede contener letras, números y guiones.\",\"page.addCase.error.caseNumberRequired\":\"El número de caso es obligatorio.\",\"page.addCase.error.caseNumberDuplicate\":\"El número de caso \\\"{{caseNumber}}\\\" ya existe.\",\"page.addCase.error.courtMin\":\"El nombre del tribunal debe tener al menos 3 caracteres.\",\"page.addCase.error.plaintiffNameMin\":\"El nombre del demandante debe tener al menos 2 caracteres.\",\"page.addCase.error.defendantNameMin\":\"El nombre del demandado debe tener al menos 2 caracteres.\",\"page.addCase.error.statusRequired\":\"El estado del caso es obligatorio.\",\"page.addCase.error.urgencyRequired\":\"El nivel de urgencia es obligatorio.\",\"page.addCase.error.plaintiffEmailRequired\":\"El email del demandante es obligatorio.\",\"page.addCase.error.plaintiffEmailFormat\":\"Formato de email del demandante inválido.\",\"page.addCase.error.defendantEmailRequired\":\"El email del demandado es obligatorio.\",\"page.addCase.error.defendantEmailFormat\":\"Formato de email del demandado inválido.\",\"page.addCase.error.judgeEmailFormat\":\"Formato de email del juez inválido.\",\"page.addCase.error.lawyerEmailFormat\":\"Formato de email del abogado inválido.\",\"page.addCase.error.documentInvalid\":\"Entrada de archivo inválida.\",\"page.addCase.error.documentSize\":\"El tamaño del archivo excede el límite de {{maxSize}}MB.\",\"page.addCase.error.documentType\":\"Tipo de archivo inválido. Solo se permite PDF.\",\"page.addCase.error.documentProcessing\":\"Error al procesar el documento subido.\",\"page.addCase.toast.blobUrlWarning.title\":\"Enlace de Documento Local\",\"page.addCase.toast.blobUrlWarning.description\":\"El documento subido está vinculado localmente usando una URL Blob temporal. Solo será accesible durante esta sesión del navegador.\",\"page.addCase.loadingPage\":\"Cargando Página para Agregar Caso...\",\"page.addCase.accessDenied\":\"Debes ser un Oficial de Tribunal para agregar casos.\",\"error.genericTitle\":\"Error\",\"cancel\":\"Cancelar\",\"na\":\"N/D\",\"optional\":\"Opcional\",\"accessDenied.loginRequired.page\":\"Por favor, inicia sesión para usar {{pageName}}.\",\"placeholders.email\":\"nombre@ejemplo.com\",\"placeholders.password\":\"••••••••\",\"logo.ariaLabel\":\"Logotipo de Nextgen-Ecourt\",\"viewCaseLinkText\":\"Ver Caso {{caseId}}\",\"judgeActionsPrompt\":\"Las acciones del juez se realizan en el Tablero del Juez.\",\"goToJudgeDashboard\":\"Ir al Tablero del Juez\",\"demoWarning.title\":\"Advertencia de Seguridad / Modo Demo\",\"demoWarning.login\":\"Este inicio de sesión utiliza almacenamiento del lado del cliente solo para demostración. Las contraseñas NO se almacenan de forma segura. No utilice credenciales reales.\",\"demoWarning.signup\":\"Este registro utiliza almacenamiento del lado del cliente solo para demostración. Las contraseñas NO se almacenan de forma segura. No utilice credenciales reales.\",\"demoWarning.dashboard\":\"La autenticación de usuario y los datos de los casos se almacenan actualmente localmente en su navegador usando Dexie (IndexedDB). Esto es solo para fines de demostración y **no es seguro para las contraseñas**. Los datos SON persistentes localmente pero se perderán si borra los datos del navegador o cambia de navegador/dispositivo.\",\"demoWarning.judgeDashboard.local\":\"Las acciones del juez modifican solo los datos locales del caso. Los cambios SE guardan localmente en Dexie pero **no se comparten** ni se respaldan. Se requiere integración de backend para una funcionalidad colaborativa real.\",\"demoWarning.profile\":\"Los datos del perfil de usuario se cargan desde el almacenamiento local del navegador (Dexie/IndexedDB) y son persistentes localmente pero no entre dispositivos o navegadores. La edición del perfil está deshabilitada en este modo.\",\"demoWarning.caseDetail.local\":\"Los datos del caso se cargan desde el almacenamiento local (Dexie/IndexedDB). Los documentos asociados utilizan URL locales temporales. Las acciones del juez se realizan en el Tablero del Juez.\",\"demoWarning.addCase.localPersistence\":\"La adición de casos utiliza almacenamiento local (Dexie/IndexedDB). Los casos agregados SON persistentes localmente pero **no se comparten** entre dispositivos o navegadores. Las URL de los documentos subidos son temporales (URL Blob).\",\"common.disabled\":\"Deshabilitado\",\"common.localOnly\":\"Local\",\"common.localBlobUrlWarning\":\"La descarga utiliza una URL local temporal. Puede no funcionar después de actualizar.\",\"landing.hero.title\":\"El Futuro de la Justicia, Entregado Hoy\",\"landing.hero.subtitle\":\"Nextgen-Ecourt aporta eficiencia, transparencia y accesibilidad al proceso judicial con IA de vanguardia y tecnología segura.\",\"landing.features.title\":\"Revolucionando las Operaciones Judiciales\",\"landing.features.subtitle\":\"Explora las potentes funciones diseñadas para optimizar los flujos de trabajo y mejorar los procedimientos judiciales.\",\"landing.features.summarization.title\":\"Resumen de Casos por IA\",\"landing.features.summarization.description\":\"Extrae instantáneamente puntos clave y genera resúmenes concisos de extensos documentos legales.\",\"landing.features.transcription.title\":\"Transcripción de Voz a Texto\",\"landing.features.transcription.description\":\"Convierte con precisión audiencias judiciales y grabaciones de audio en registros de texto digital con capacidad de búsqueda utilizando PNL avanzada.\",\"landing.features.research.title\":\"Investigación Legal IA\",\"landing.features.research.description\":\"Encuentra rápidamente jurisprudencia, estatutos y análisis legales relevantes con nuestro asistente de investigación inteligente.\",\"landing.features.blockchain.title\":\"Registros Seguros Blockchain\",\"landing.features.blockchain.description\":\"Garantiza la autenticidad e integridad de los registros judiciales con tecnología blockchain a prueba de manipulaciones.\",\"landing.features.virtualCourt.title\":\"Sala de Audiencias Virtual\",\"landing.features.virtualCourt.description\":\"Realiza audiencias remotas seguras y videoconferencias, aumentando la accesibilidad y reduciendo retrasos.\",\"landing.features.chatbot.title\":\"Chatbot Asistente Legal IA\",\"landing.features.chatbot.description\":\"Obtén respuestas instantáneas a preguntas procesales, orientación sobre documentos y actualizaciones del estado del caso.\",\"landing.features.scheduling.title\":\"Programación Inteligente\",\"landing.features.scheduling.description\":\"Optimiza automáticamente las fechas de audiencia y la asignación de salas para minimizar el retraso y los tiempos de espera.\",\"landing.features.workflow.title\":\"Flujos de Trabajo Automatizados\",\"landing.features.workflow.description\":\"Agiliza la presentación de casos, la gestión de documentos y los procesos de notificación para una máxima eficiencia.\",\"landing.benefits.title\":\"¿Por qué elegir Nextgen-Ecourt?\",\"landing.benefits.efficiency.title\":\"Eficiencia Mejorada\",\"landing.benefits.efficiency.description\":\"Automatiza tareas repetitivas, reduce el papeleo y acelera el procesamiento de casos.\",\"landing.benefits.transparency.title\":\"Mayor Transparencia\",\"landing.benefits.transparency.description\":\"Proporciona acceso seguro y en tiempo real a la información del caso para todas las partes autorizadas.\",\"landing.benefits.accessibility.title\":\"Accesibilidad Mejorada\",\"landing.benefits.accessibility.description\":\"Permite la participación remota y el acceso a la justicia independientemente de la ubicación.\",\"landing.cta.title\":\"¿Listo para Modernizar su Tribunal?\",\"landing.cta.subtitle\":\"Únase al creciente número de órganos judiciales que transforman sus operaciones con Nextgen-Ecourt.\",\"landing.cta.button\":\"Comience Hoy\",\"page.videoCall.title\":\"Videollamada / Audiencia\",\"page.videoCall.description.joinOrCreate\":\"Únete a una videollamada existente o inicia una nueva.\",\"page.videoCall.description.inMeeting\":\"Actualmente en la reunión: {{code}}\",\"page.videoCall.joinTitle\":\"Unirse a Reunión Existente\",\"page.videoCall.joinDescription\":\"Introduce el código único de 6 caracteres proporcionado por el anfitrión.\",\"page.videoCall.startTitle\":\"Iniciar Nueva Reunión\",\"page.videoCall.startDescription\":\"Genera un código único para iniciar una nueva reunión.\",\"page.videoCall.label.meetingCode\":\"Código de Reunión\",\"page.videoCall.placeholder.meetingCode\":\"ABCXYZ\",\"page.videoCall.button.joinMeeting\":\"Unirse a la Reunión\",\"page.videoCall.button.startMeeting\":\"Iniciar Nueva Reunión\",\"page.videoCall.button.leaveMeeting\":\"Salir de la Reunión\",\"page.videoCall.button.copyCode\":\"Copiar Código\",\"page.videoCall.error.permissionDeniedTitle\":\"Permiso Denegado\",\"page.videoCall.error.permissionDenied\":\"Se requiere acceso a la cámara y al micrófono para unirse o iniciar una videollamada. Por favor, concede permiso en la configuración de tu navegador.\",\"page.videoCall.error.permissionRequired\":\"Se requiere acceso a la cámara y al micrófono.\",\"page.videoCall.error.codeRequired\":\"Por favor, introduce un código de reunión.\",\"page.videoCall.error.copyFailed\":\"Error al copiar el código al portapapeles.\",\"page.videoCall.toast.joiningTitle\":\"Unido a la Reunión\",\"page.videoCall.toast.joiningDescription\":\"Conectado exitosamente a la reunión {{code}}.\",\"page.videoCall.toast.startedTitle\":\"Reunión Iniciada\",\"page.videoCall.toast.startedDescription\":\"La reunión {{code}} está ahora activa. Comparte el código.\",\"page.videoCall.toast.leftMeeting\":\"Has salido de la reunión.\",\"page.videoCall.toast.codeCopied\":\"¡Código de reunión copiado al portapapeles!\",\"page.videoCall.shareCode\":\"Comparte este código con los participantes:\",\"page.videoCall.waitingForPermission\":\"Esperando permiso de cámara/micrófono...\",\"page.videoCall.placeholder.controls\":\"Los controles de la reunión (silenciar, activar/desactivar vídeo, compartir pantalla, etc.) aparecerían aquí.\",\"page.videoCall.permissionNeeded\":\"Se necesita acceso a la cámara y al micrófono.\",\"page.videoCall.requestingPermission\":\"Solicitando permisos...\",\"page.videoCall.error.permissionInstructions\":\"Por favor, habilita los permisos de cámara y micrófono en la configuración de tu navegador para usar la función de videollamada.\",\"page.videoCall.infoTitle\":\"Instrucciones de Videollamada\",\"page.videoCall.infoText\":\"Para unirte a una reunión, introduce el código de 6 caracteres proporcionado por el anfitrión.\",\"page.videoCall.infoTextOfficial\":\"Como Oficial de Tribunal, puedes iniciar una nueva reunión y compartir el código generado.\",\"page.videoCall.infoTextParticipant\":\"Puedes unirte a una reunión usando un código compartido por un Oficial de Tribunal.\",\"page.videoCall.button.retryPermission\":\"Reintentar Permiso\",\"page.videoCall.participants\":\"Participantes ({{count}})\",\"page.videoCall.participantListTitle\":\"Lista de Participantes\",\"page.videoCall.noParticipants\":\"Aún no hay otros participantes.\",\"page.videoCall.you\":\"Tú\",\"page.videoCall.meetingCodeLabel\":\"Código de Reunión\",\"page.videoCall.toast.participantJoined\":\"{{name}} se unió a la reunión.\",\"page.videoCall.toast.participantLeft\":\"{{name}} salió de la reunión.\",\"page.videoCall.toast.connectedTitle\":\"Conectado\",\"page.videoCall.toast.connectedDescription\":\"Conexión en tiempo real establecida.\",\"page.videoCall.error.connectionFailedTitle\":\"Falló la Conexión\",\"page.videoCall.error.connectionFailed\":\"No se pudo conectar al servidor de videollamadas en {{url}}. Detalles: {{details}}\",\"page.videoCall.error.disconnectedTitle\":\"Desconectado\",\"page.videoCall.error.disconnected\":\"Se perdió la conexión con el servidor de videollamadas.\",\"page.videoCall.error.configMissing\":\"La URL del servidor de videollamadas no está configurada.\",\"page.videoCall.error.notConnected\":\"No conectado al servidor de videollamadas. Por favor, espera o verifica la conexión.\",\"page.videoCall.error.invalidCodeTitle\":\"Código Inválido\",\"page.videoCall.error.invalidCodeDescription\":\"El código de reunión debe ser de 6 letras mayúsculas o números.\",\"page.videoCall.error.checkServer\":\"Por favor, asegúrate de que el servidor esté funcionando y accesible.\",\"page.videoCall.toast.micOn\":\"Micrófono Activado\",\"page.videoCall.toast.micOff\":\"Micrófono Silenciado\",\"page.videoCall.toast.cameraOn\":\"Cámara Activada\",\"page.videoCall.toast.cameraOff\":\"Cámara Desactivada\",\"page.videoCall.muteMicAria\":\"Silenciar Micrófono\",\"page.videoCall.unmuteMicAria\":\"Activar Micrófono\",\"page.videoCall.cameraOffAria\":\"Desactivar Cámara\",\"page.videoCall.cameraOnAria\":\"Activar Cámara\",\"page.videoCall.warning.backendTitle\":\"Se Requiere Backend\",\"page.videoCall.warning.backendDescription\":\"Esta función de videollamada requiere un servidor backend Socket.IO en ejecución para la señalización. El código frontend está implementado, pero asegúrate de que el servidor en {{url}} esté funcionando. Sin él, las conexiones fallarán. Revisa la consola del navegador y los registros del servidor en busca de errores.\",\"page.videoCall.warning.urlNotSet\":\"URL_NO_CONFIGURADA\",\"page.videoCall.waitingForOthers\":\"Esperando a que otros se unan...\",\"page.videoCall.startHint\":\"Solo los Oficiales de Tribunal pueden iniciar nuevas reuniones.\"}"));}}),
"[project]/src/locales/fr.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"appName\":\"Nextgen-Ecourt\",\"footer.copyright\":\"© {{year}} Nextgen-Ecourt. Tous droits réservés.\",\"header.dashboard\":\"Tableau de Bord\",\"header.aiSummaries\":\"Résumés IA\",\"header.legalResearch\":\"Recherche Juridique\",\"header.judgeDashboard\":\"Tableau de Bord du Juge\",\"header.addCase\":\"Ajouter Affaire\",\"header.videoCall\":\"Appel Vidéo\",\"header.homeAriaLabel\":\"Page d'accueil de Nextgen-Ecourt\",\"header.toggleNavAriaLabel\":\"Basculer le menu de navigation\",\"languageToggle.selectLanguage\":\"Sélectionner la Langue\",\"login.title\":\"Connexion à Nextgen-Ecourt\",\"login.description\":\"Entrez vos identifiants pour accéder à votre compte.\",\"login.emailLabel\":\"Adresse e-mail\",\"login.passwordLabel\":\"Mot de passe\",\"login.forgotPassword\":\"Mot de passe oublié ?\",\"login.loginButton\":\"Connexion\",\"login.loggingInButton\":\"Connexion en cours...\",\"login.noAccount\":\"Pas de compte ?\",\"login.signupLink\":\"Inscrivez-vous ici\",\"login.failedTitle\":\"Échec de la connexion\",\"login.unexpectedError\":\"Une erreur inattendue s'est produite. Veuillez réessayer.\",\"login.invalidCredentials\":\"Email ou mot de passe invalide.\",\"login.emailPlaceholder\":\"nom@exemple.com\",\"login.passwordPlaceholder\":\"••••••••\",\"login.hidePasswordAriaLabel\":\"Masquer le mot de passe\",\"login.showPasswordAriaLabel\":\"Afficher le mot de passe\",\"login.error.invalidEmail\":\"Adresse e-mail invalide.\",\"login.error.passwordLength\":\"Le mot de passe doit contenir au moins 6 caractères.\",\"login.error.passwordRequired\":\"Mot de passe requis.\",\"login.error.userDocNotFound\":\"Profil utilisateur introuvable.\",\"login.successTitle\":\"Connexion Réussie\",\"login.successDescription\":\"Bon retour parmi nous, {{name}} !\",\"signup.title\":\"Créer un compte Nextgen-Ecourt\",\"signup.description\":\"Rejoignez Nextgen-Ecourt pour gérer et suivre efficacement les affaires.\",\"signup.nameLabel\":\"Nom complet\",\"signup.namePlaceholder\":\"Jean Dupont\",\"signup.roleLabel\":\"Votre rôle\",\"signup.confirmPasswordLabel\":\"Confirmer le mot de passe\",\"signup.signupButton\":\"S'inscrire\",\"signup.creatingAccountButton\":\"Création du compte...\",\"signup.hasAccount\":\"Vous avez déjà un compte ?\",\"signup.loginLink\":\"Connectez-vous ici\",\"signup.failedTitle\":\"Échec de l'inscription\",\"signup.error.unexpected\":\"Une erreur inattendue s'est produite lors de l'inscription. Veuillez réessayer.\",\"signup.error.nameLength\":\"Le nom doit contenir au moins 2 caractères.\",\"signup.error.invalidEmail\":\"Format d'adresse e-mail invalide.\",\"signup.error.passwordLength\":\"Le mot de passe doit contenir au moins 6 caractères.\",\"signup.error.passwordsDontMatch\":\"Les mots de passe ne correspondent pas.\",\"signup.error.roleRequired\":\"Veuillez sélectionner un rôle.\",\"signup.error.generic\":\"Une erreur s'est produite. Veuillez vérifier votre saisie.\",\"signup.error.emailInUse\":\"Cette adresse e-mail est déjà utilisée.\",\"signup.error.weakPassword\":\"Le mot de passe est trop faible. Veuillez choisir un mot de passe plus fort.\",\"signup.hideConfirmPasswordAriaLabel\":\"Masquer le mot de passe confirmé\",\"signup.showConfirmPasswordAriaLabel\":\"Afficher le mot de passe confirmé\",\"signup.successTitle\":\"Compte Créé\",\"signup.successDescription\":\"Votre compte pour {{email}} a été créé avec succès (localement).\",\"profile.title\":\"Profil\",\"profile.editButton\":\"Modifier le Profil\",\"profile.logoutButton\":\"Déconnexion\",\"profile.avatarAlt\":\"Photo de profil de {{name}}\",\"profile.initialsFallback\":\"{{initials}}\",\"profile.info.email\":\"Adresse e-mail\",\"profile.info.userId\":\"ID Utilisateur\",\"profile.info.accountType\":\"Type de Compte\",\"profile.info.accountTypeValue\":\"Compte {{role}}\",\"profile.supportMessage\":\"Pour tout problème lié au compte, veuillez contacter le support à support@nextgen-ecourt.app.\",\"profile.loading\":\"Chargement du profil...\",\"caseCard.caseNumber\":\"Numéro d'Affaire : {{caseNumber}}\",\"caseCard.plaintiff\":\"Demandeur\",\"caseCard.defendant\":\"Défendeur\",\"caseCard.court\":\"Tribunal\",\"caseCard.judge\":\"Juge\",\"caseCard.filingDate\":\"Date de Dépôt\",\"caseCard.lastUpdate\":\"Dernière Mise à Jour\",\"caseCard.nextHearing\":\"Prochaine Audience\",\"caseCard.viewDetails\":\"Voir les Détails\",\"caseCard.viewDetailsAriaLabel\":\"Voir les détails de l'affaire : {{caseTitle}}\",\"caseCard.deleteButton\":\"Supprimer\",\"caseCard.deleteCaseAriaLabel\":\"Supprimer l'affaire : {{caseTitle}}\",\"caseSearch.placeholder\":\"Rechercher par numéro d'affaire, titre, demandeur, défendeur...\",\"caseSearch.buttonLabel\":\"Rechercher des affaires\",\"filterByStatus\":\"Filtrer par statut\",\"allStatuses\":\"Tous les Statuts\",\"dashboard.title.judge\":\"Mes Affaires Attribuées\",\"dashboard.title.other\":\"Tableau de Bord des Affaires\",\"dashboard.title.official\":\"Toutes les Affaires (Vue Officier de Justice)\",\"dashboard.noCasesFound\":\"Aucune Affaire Trouvée\",\"dashboard.noCasesFound.description.filtered\":\"Vos critères de recherche ou de filtre n'ont correspondu à aucune affaire.\",\"dashboard.noCasesFound.description.judge.empty\":\"Vous n'avez actuellement aucune affaire attribuée.\",\"dashboard.noCasesFound.description.official.empty\":\"Il n'y a pas encore d'affaires dans le système.\",\"dashboard.noCasesFound.description.other.empty\":\"Il n'y a actuellement aucune affaire à afficher pour votre rôle.\",\"dashboard.addNewCase\":\"Ajouter une Nouvelle Affaire\",\"dashboard.addYourFirstCase\":\"Ajoutez Votre Première Affaire\",\"dashboard.loading\":\"Chargement du tableau de bord...\",\"dashboard.error.loadFailed\":\"Échec du chargement des affaires. Veuillez essayer de rafraîchir.\",\"status.Pending\":\"En Attente\",\"status.Filed\":\"Déposé\",\"status.Investigation\":\"Enquête\",\"status.InProgress\":\"En Cours\",\"status.Hearing\":\"Audience\",\"status.Judgement\":\"Jugement\",\"status.Resolved\":\"Résolu\",\"status.Appealed\":\"En Appel\",\"status.OnHold\":\"En Suspens\",\"status.Closed\":\"Clôturé\",\"urgency.High\":\"Élevée\",\"urgency.Medium\":\"Moyenne\",\"urgency.Low\":\"Faible\",\"role.Lawyer\":\"Avocat(e)\",\"role.Plaintiff\":\"Demandeur(eresse)\",\"role.Defendant\":\"Défendeur(eresse)\",\"role.CourtOfficial\":\"Officier de Justice\",\"role.Judge\":\"Juge\",\"role.assignedManually\":\"Assigné Manuellement\",\"selectRole\":\"Sélectionnez votre rôle\",\"userProfile.loginButton\":\"Connexion\",\"userProfile.profileLink\":\"Profil\",\"userProfile.logoutButton\":\"Déconnexion\",\"page.summaries.title\":\"Résumeur d'Affaires IA\",\"page.summaries.description\":\"Générez des résumés concis d'affaires judiciaires grâce à une IA avancée.\",\"page.summaries.caseDetailsPrefilled\":\"Détails de l'affaire pré-remplis pour l'affaire {{caseId}}. Vous pouvez les modifier ci-dessous.\",\"page.summaries.enterCaseDetailsTitle\":\"Entrer les Détails de l'Affaire\",\"page.summaries.enterCaseDetailsDescription\":\"Collez ou tapez le texte intégral de l'affaire, y compris tous les faits et contextes pertinents.\",\"page.summaries.caseTextLabel\":\"Texte de l'Affaire\",\"page.summaries.caseTextPlaceholder\":\"Entrez les détails complets de l'affaire ici...\",\"page.summaries.generateButton\":\"Générer le Résumé\",\"page.summaries.generatingButton\":\"Génération du Résumé...\",\"page.summaries.aiSummaryTitle\":\"Résumé Généré par l'IA\",\"page.summaries.aiSummaryDescription\":\"L'IA fournira un résumé concis ci-dessous.\",\"page.summaries.error.generic\":\"Échec de la génération du résumé. Veuillez réessayer.\",\"page.summaries.error.noDetails\":\"Veuillez entrer les détails de l'affaire pour résumer.\",\"page.summaries.loading\":\"Chargement des Résumés IA...\",\"page.summaries.resultsPlaceholderTitle\":\"Le résumé de votre affaire apparaîtra ici.\",\"page.summaries.resultsPlaceholderDescription\":\"Entrez les détails de l'affaire et cliquez sur \\\"Générer le Résumé\\\".\",\"page.summaries.fetchingCase\":\"Récupération des détails de l'affaire...\",\"page.legalResearch.title\":\"Assistant de Recherche Juridique\",\"page.legalResearch.description\":\"Exploitez l'IA pour trouver la jurisprudence, les lois et les analyses juridiques pertinentes.\",\"page.legalResearch.queryTitle\":\"Requête de Recherche\",\"page.legalResearch.queryDescription\":\"Entrez votre sujet de recherche juridique et le contexte optionnel de l'affaire.\",\"page.legalResearch.topicLabel\":\"Sujet de Recherche\",\"page.legalResearch.topicPlaceholder\":\"par ex., 'admissibilité de la preuve par ouï-dire dans les procès civils'\",\"page.legalResearch.contextLabel\":\"Contexte de l'Affaire (Optionnel)\",\"page.legalResearch.contextPlaceholder\":\"Fournissez des faits spécifiques, des noms de parties ou la posture procédurale liée à votre requête...\",\"page.legalResearch.performResearchButton\":\"Effectuer la Recherche\",\"page.legalResearch.researchingButton\":\"Recherche en cours...\",\"page.legalResearch.resultsTitle\":\"Résultats de la Recherche\",\"page.legalResearch.resultsDescription\":\"La jurisprudence, les lois et les analyses juridiques pertinentes apparaîtront ici.\",\"page.legalResearch.error.generic\":\"Échec de la recherche juridique. Veuillez réessayer.\",\"page.legalResearch.error.topicRequired\":\"Le sujet de recherche ne peut pas être vide.\",\"page.legalResearch.loading\":\"Chargement de l'Assistant de Recherche Juridique...\",\"page.legalResearch.resultsPlaceholderTitle\":\"Vos résultats de recherche apparaîtront ici.\",\"page.legalResearch.resultsPlaceholderDescription\":\"Entrez un sujet de recherche et cliquez sur \\\"Effectuer la Recherche\\\".\",\"page.legalResearch.relevantCaseLaw\":\"Jurisprudence Pertinente ({{count}})\",\"page.legalResearch.relevantStatutes\":\"Lois Pertinentes ({{count}})\",\"page.legalResearch.legalAnalysis\":\"Analyse Juridique\",\"page.judgeDashboard.title\":\"Tableau de Bord du Juge\",\"page.judgeDashboard.loading\":\"Chargement du Tableau de Bord du Juge...\",\"page.judgeDashboard.searchPlaceholder\":\"Rechercher des affaires (titre, numéro, parties)...\",\"page.judgeDashboard.filterStatusPlaceholder\":\"Filtrer par statut\",\"page.judgeDashboard.noCases.title\":\"Aucune Affaire Trouvée\",\"page.judgeDashboard.noCases.description.filtered\":\"Vos critères de recherche ou de filtre n'ont correspondu à aucune de vos affaires attribuées.\",\"page.judgeDashboard.noCases.description.empty\":\"Vous n'avez actuellement aucune affaire attribuée.\",\"page.judgeDashboard.caseCard.statusPrefix\":\"Statut : \",\"page.judgeDashboard.caseCard.lastUpdatedPrefix\":\"Dernière Mise à Jour :\",\"page.judgeDashboard.caseCard.nextHearingPrefixFull\":\"Prochaine Audience : {{date}}\",\"page.judgeDashboard.caseCard.noUpcomingHearing\":\"Aucune prochaine audience planifiée.\",\"page.judgeDashboard.button.updateStatus\":\"Statut\",\"page.judgeDashboard.button.addNote\":\"Note\",\"page.judgeDashboard.button.reschedule\":\"Reporter\",\"page.judgeDashboard.button.upload\":\"Téléverser\",\"page.judgeDashboard.button.uploading\":\"Téléversement...\",\"page.judgeDashboard.button.deleteCase\":\"Supprimer l'Affaire\",\"page.judgeDashboard.modal.updateStatus.title\":\"Mettre à Jour le Statut pour {{caseNumber}}\",\"page.judgeDashboard.modal.updateStatus.description\":\"Sélectionnez le nouveau statut pour cette affaire.\",\"page.judgeDashboard.modal.updateStatus.label\":\"Nouveau Statut\",\"page.judgeDashboard.modal.updateStatus.placeholder\":\"Sélectionner le statut\",\"page.judgeDashboard.modal.updateStatus.action\":\"Mettre à Jour le Statut\",\"page.judgeDashboard.modal.addNote.title\":\"Ajouter une Note à {{caseNumber}}\",\"page.judgeDashboard.modal.addNote.description\":\"Entrez votre note ou résumé d'audience ci-dessous.\",\"page.judgeDashboard.modal.addNote.label\":\"Note\",\"page.judgeDashboard.modal.addNote.placeholder\":\"Tapez votre note ici...\",\"page.judgeDashboard.modal.addNote.action\":\"Ajouter la Note\",\"page.judgeDashboard.modal.reschedule.title\":\"Reporter l'Audience pour {{caseNumber}}\",\"page.judgeDashboard.modal.reschedule.currentHearing\":\"Audience Actuelle : {{date}}\",\"page.judgeDashboard.modal.reschedule.currentHearingNotScheduled\":\"Non Planifiée\",\"page.judgeDashboard.modal.reschedule.label\":\"Nouvelle Date et Heure d'Audience\",\"page.judgeDashboard.modal.reschedule.action\":\"Reporter\",\"page.judgeDashboard.modal.upload.title\":\"Téléverser un Document pour {{caseNumber}}\",\"page.judgeDashboard.modal.upload.description\":\"Sélectionnez un fichier et donnez un nom au document.\",\"page.judgeDashboard.modal.upload.docNameLabel\":\"Nom du Document\",\"page.judgeDashboard.modal.upload.docNamePlaceholder\":\"ex., Pièce A, Transcription d'Audience\",\"page.judgeDashboard.modal.upload.fileLabel\":\"Fichier\",\"page.judgeDashboard.modal.upload.fileSelected\":\"Sélectionné : {{fileName}}\",\"page.judgeDashboard.modal.upload.action\":\"Téléverser le Document\",\"page.judgeDashboard.modal.delete.title\":\"Êtes-vous sûr ?\",\"page.judgeDashboard.modal.delete.description\":\"Cette action ne peut pas être annulée. Cela supprimera définitivement l'affaire \\\"{{caseIdentifier}}\\\".\",\"page.judgeDashboard.modal.delete.description.local\":\"Cette action ne peut pas être annulée. Cela supprimera définitivement l'affaire \\\"{{caseIdentifier}}\\\" du stockage local.\",\"page.judgeDashboard.modal.delete.action\":\"Supprimer\",\"toast.caseUpdated.title\":\"Affaire Mise à Jour\",\"toast.caseUpdated.description\":\"L'affaire {{caseNumber}} a été mise à jour localement.\",\"toast.caseUpdated.description.status\":\"Le statut de l'affaire {{caseNumber}} a été mis à jour à {{status}}.\",\"toast.noteAdded.title\":\"Note Ajoutée\",\"toast.noteAdded.description\":\"Note ajoutée à l'affaire {{caseNumber}}.\",\"toast.hearingRescheduled.title\":\"Audience Reportée\",\"toast.hearingRescheduled.description\":\"L'audience pour l'affaire {{caseNumber}} a été reportée à {{date}}.\",\"toast.uploadSuccess.title\":\"Téléversement Réussi\",\"toast.uploadSuccess.description\":\"Le document '{{docName}}' a été ajouté à l'affaire.\",\"toast.invalidDate.title\":\"Date Invalide\",\"toast.invalidDate.description\":\"Veuillez sélectionner une date et une heure valides.\",\"toast.noFileSelected.title\":\"Aucun Fichier Sélectionné\",\"toast.noFileSelected.description\":\"Veuillez sélectionner un fichier à téléverser.\",\"toast.docNameRequired.title\":\"Nom du Document Requis\",\"toast.docNameRequired.description\":\"Veuillez donner un nom au document.\",\"toast.caseDeleted.title\":\"Affaire Supprimée\",\"toast.caseDeleted.description\":\"L'affaire {{caseIdentifier}} a été supprimée du stockage local.\",\"toast.updateFailed\":\"Échec de la mise à jour de l'affaire. Veuillez réessayer.\",\"toast.deleteFailed\":\"Échec de la suppression de l'affaire. Veuillez réessayer.\",\"toast.uploadFailed\":\"Échec du téléversement du document. Veuillez réessayer.\",\"toast.accessDenied.title\":\"Accès Refusé\",\"toast.accessDenied.description.judgeDashboard\":\"Vous devez être connecté en tant que Juge pour voir cette page.\",\"page.caseDetail.pageName\":\"Détails de l'Affaire\",\"page.caseDetail.backButton\":\"Retour\",\"page.caseDetail.caseNumberPrefix\":\"Numéro d'Affaire : {{caseNumber}}\",\"page.caseDetail.section.overview\":\"Aperçu de l'Affaire\",\"page.caseDetail.section.details\":\"Détails de l'Affaire\",\"page.caseDetail.section.documents\":\"Documents Associés\",\"page.caseDetail.section.judgeNotes\":\"Notes du Juge\",\"page.caseDetail.section.timeline\":\"Chronologie de l'Affaire\",\"page.caseDetail.timelineComingSoon\":\"La vue détaillée de la chronologie sera bientôt disponible.\",\"page.caseDetail.info.plaintiff\":\"Demandeur\",\"page.caseDetail.info.defendant\":\"Défendeur\",\"page.caseDetail.info.court\":\"Tribunal\",\"page.caseDetail.info.judge\":\"Juge Président\",\"page.caseDetail.info.urgency\":\"Urgence\",\"page.caseDetail.info.filingDate\":\"Date de Dépôt\",\"page.caseDetail.info.lastUpdated\":\"Dernière Mise à Jour\",\"page.caseDetail.info.nextHearingDate\":\"Prochaine Date d'Audience\",\"page.caseDetail.docItem.uploadedByOn\":\"Téléversé par {{uploader}} le {{date}}\",\"page.caseDetail.docItem.downloadAriaLabel\":\"Télécharger {{docName}}\",\"page.caseDetail.noteItem.byOn\":\"Par {{author}} le {{date}}\",\"page.caseDetail.button.aiSummary\":\"Résumé IA\",\"page.caseDetail.button.updateStatus\":\"Mettre à Jour le Statut\",\"page.caseDetail.button.addNote\":\"Ajouter une Note\",\"page.caseDetail.button.uploadDocument\":\"Téléverser un Document\",\"page.caseDetail.toast.judgeAction.title\":\"Action du Juge : {{action}}\",\"page.caseDetail.toast.judgeAction.description\":\"Action '{{action}}' simulée pour l'affaire {{caseNumber}}\",\"page.caseDetail.toast.downloadStarted.title\":\"Téléchargement Lancé\",\"page.caseDetail.toast.downloadStarted.description\":\"Ouverture du lien de téléchargement pour {{fileName}}\",\"page.caseDetail.notFoundTitle\":\"Affaire Non Trouvée\",\"page.caseDetail.notFound\":\"L'affaire demandée ({{caseId}}) n'a pas pu être trouvée localement ou vous n'avez pas la permission de la voir.\",\"page.caseDetail.accessDenied\":\"Vous n'avez pas la permission de voir cette affaire.\",\"page.caseDetail.caseNotAvailable\":\"Affaire non disponible.\",\"page.caseDetail.backToDashboard\":\"Retour au Tableau de Bord\",\"page.caseDetail.loading\":\"Chargement des détails de l'affaire...\",\"page.caseDetail.loadError\":\"Échec du chargement des détails de l'affaire. Veuillez réessayer.\",\"page.caseDetail.downloadError\":\"Impossible d'initier le téléchargement. URL de document invalide.\",\"page.addCase.title\":\"Ajouter une Nouvelle Affaire\",\"page.addCase.description\":\"Entrez les détails de la nouvelle affaire et attribuez les utilisateurs pertinents par e-mail.\",\"page.addCase.section.details\":\"Détails de l'Affaire\",\"page.addCase.section.parties\":\"Parties et Attribution\",\"page.addCase.section.documents\":\"Documents\",\"page.addCase.label.title\":\"Titre de l'Affaire\",\"page.addCase.placeholder.title\":\"ex., Litige Immobilier Smith c. Jones\",\"page.addCase.label.caseNumber\":\"Numéro d'Affaire\",\"page.addCase.placeholder.caseNumber\":\"ex., CV-2024-123\",\"page.addCase.hint.caseNumber\":\"Doit être unique. Utilisez des lettres, chiffres, tirets (ex., CV-AAAA-NNN).\",\"page.addCase.label.court\":\"Tribunal\",\"page.addCase.placeholder.court\":\"ex., Tribunal de District d'Anytown\",\"page.addCase.label.status\":\"Statut Initial\",\"page.addCase.placeholder.status\":\"Sélectionner le statut initial\",\"page.addCase.label.urgency\":\"Niveau d'Urgence\",\"page.addCase.placeholder.urgency\":\"Sélectionner l'urgence\",\"page.addCase.label.description\":\"Description de l'Affaire\",\"page.addCase.placeholder.description\":\"Fournissez un bref aperçu de l'affaire...\",\"page.addCase.label.plaintiffName\":\"Nom Complet du Demandeur\",\"page.addCase.placeholder.plaintiffName\":\"ex., Jean Dupont\",\"page.addCase.label.assignPlaintiffEmail\":\"Attribuer Email du Demandeur\",\"page.addCase.placeholder.assignPlaintiffEmail\":\"Entrez l'email du Demandeur\",\"page.addCase.label.defendantName\":\"Nom Complet du Défendeur\",\"page.addCase.placeholder.defendantName\":\"ex., Alice Martin\",\"page.addCase.label.assignDefendantEmail\":\"Attribuer Email du Défendeur\",\"page.addCase.placeholder.assignDefendantEmail\":\"Entrez l'email du Défendeur\",\"page.addCase.label.assignJudgeEmail\":\"Attribuer Email du Juge\",\"page.addCase.placeholder.assignJudgeEmail\":\"Entrez l'email du Juge\",\"page.addCase.label.assignLawyerEmail\":\"Attribuer Email de l'Avocat\",\"page.addCase.placeholder.assignLawyerEmail\":\"Entrez l'email de l'Avocat\",\"page.addCase.label.documentUpload\":\"Téléverser un Document (PDF)\",\"page.addCase.hint.documentUpload\":\"Optionnel. Taille max. du fichier : {{maxSize}}Mo. PDF uniquement.\",\"page.addCase.unassigned\":\"Non attribué\",\"page.addCase.noUsersFound\":\"Aucun utilisateur trouvé pour le rôle : {{role}}\",\"page.addCase.submitButton\":\"Ajouter l'Affaire\",\"page.addCase.submittingButton\":\"Ajout de l'Affaire...\",\"page.addCase.successTitle\":\"Affaire Ajoutée\",\"page.addCase.successDescription.saved\":\"L'affaire {{caseNumber}} a été enregistrée localement avec succès.\",\"page.addCase.error.fetchUsersFailed\":\"Échec du chargement des utilisateurs pour l'attribution.\",\"page.addCase.error.titleMin\":\"Le titre doit contenir au moins 5 caractères.\",\"page.addCase.error.descriptionMin\":\"La description doit contenir au moins 10 caractères.\",\"page.addCase.error.caseNumberFormat\":\"Le numéro d'affaire ne peut contenir que des lettres, chiffres et tirets.\",\"page.addCase.error.caseNumberRequired\":\"Le numéro d'affaire est requis.\",\"page.addCase.error.caseNumberDuplicate\":\"Le numéro d'affaire \\\"{{caseNumber}}\\\" existe déjà.\",\"page.addCase.error.courtMin\":\"Le nom du tribunal doit contenir au moins 3 caractères.\",\"page.addCase.error.plaintiffNameMin\":\"Le nom du demandeur doit contenir au moins 2 caractères.\",\"page.addCase.error.defendantNameMin\":\"Le nom du défendeur doit contenir au moins 2 caractères.\",\"page.addCase.error.statusRequired\":\"Le statut de l'affaire est requis.\",\"page.addCase.error.urgencyRequired\":\"Le niveau d'urgence est requis.\",\"page.addCase.error.plaintiffEmailRequired\":\"L'email du demandeur est requis.\",\"page.addCase.error.plaintiffEmailFormat\":\"Format d'email du demandeur invalide.\",\"page.addCase.error.defendantEmailRequired\":\"L'email du défendeur est requis.\",\"page.addCase.error.defendantEmailFormat\":\"Format d'email du défendeur invalide.\",\"page.addCase.error.judgeEmailFormat\":\"Format d'email du juge invalide.\",\"page.addCase.error.lawyerEmailFormat\":\"Format d'email de l'avocat invalide.\",\"page.addCase.error.documentInvalid\":\"Entrée de fichier invalide.\",\"page.addCase.error.documentSize\":\"La taille du fichier dépasse la limite de {{maxSize}}Mo.\",\"page.addCase.error.documentType\":\"Type de fichier invalide. Seul le PDF est autorisé.\",\"page.addCase.error.documentProcessing\":\"Erreur lors du traitement du document téléversé.\",\"page.addCase.toast.blobUrlWarning.title\":\"Lien Document Local\",\"page.addCase.toast.blobUrlWarning.description\":\"Le document téléversé est lié localement à l'aide d'une URL Blob temporaire. Il ne sera accessible que pendant cette session de navigateur.\",\"page.addCase.loadingPage\":\"Chargement de la Page d'Ajout d'Affaire...\",\"page.addCase.accessDenied\":\"Vous devez être un Officier de Justice pour ajouter des affaires.\",\"error.genericTitle\":\"Erreur\",\"cancel\":\"Annuler\",\"na\":\"N/A\",\"optional\":\"Optionnel\",\"accessDenied.loginRequired.page\":\"Veuillez vous connecter pour utiliser {{pageName}}.\",\"placeholders.email\":\"nom@exemple.com\",\"placeholders.password\":\"••••••••\",\"logo.ariaLabel\":\"Logo Nextgen-Ecourt\",\"viewCaseLinkText\":\"Voir l'affaire {{caseId}}\",\"judgeActionsPrompt\":\"Les actions du juge sont effectuées sur le Tableau de Bord du Juge.\",\"goToJudgeDashboard\":\"Aller au Tableau de Bord du Juge\",\"demoWarning.title\":\"Avertissement de Sécurité / Mode Démo\",\"demoWarning.login\":\"Cette connexion utilise le stockage côté client uniquement à des fins de démonstration. Les mots de passe ne sont PAS stockés de manière sécurisée. N'utilisez pas d'identifiants réels.\",\"demoWarning.signup\":\"Cette inscription utilise le stockage côté client uniquement à des fins de démonstration. Les mots de passe ne sont PAS stockés de manière sécurisée. N'utilisez pas d'identifiants réels.\",\"demoWarning.dashboard\":\"L'authentification utilisateur et les données des affaires sont actuellement stockées localement dans votre navigateur à l'aide de Dexie (IndexedDB). Ceci est uniquement à des fins de démonstration et **n'est pas sécurisé pour les mots de passe**. Les données SONT persistantes localement mais seront perdues si vous effacez les données du navigateur ou changez de navigateur/appareil.\",\"demoWarning.judgeDashboard.local\":\"Les actions du juge modifient uniquement les données locales de l'affaire. Les modifications SONT sauvegardées localement dans Dexie mais **ne sont pas partagées** ni sauvegardées. Une intégration backend est requise pour une fonctionnalité collaborative réelle.\",\"demoWarning.profile\":\"Les données du profil utilisateur sont chargées depuis le stockage local du navigateur (Dexie/IndexedDB) et sont persistantes localement mais pas entre les appareils ou les navigateurs. La modification du profil est désactivée dans ce mode.\",\"demoWarning.caseDetail.local\":\"Les données de l'affaire sont chargées depuis le stockage local (Dexie/IndexedDB). Les documents associés utilisent des URL locales temporaires. Les actions du juge sont effectuées sur le Tableau de Bord du Juge.\",\"demoWarning.addCase.localPersistence\":\"L'ajout d'affaires utilise le stockage local (Dexie/IndexedDB). Les affaires ajoutées SONT persistantes localement mais **non partagées** entre les appareils ou les navigateurs. Les URL des documents téléversés sont temporaires (URL Blob).\",\"common.disabled\":\"Désactivé\",\"common.localOnly\":\"Local\",\"common.localBlobUrlWarning\":\"Le téléchargement utilise une URL locale temporaire. Peut ne pas fonctionner après rafraîchissement.\",\"landing.hero.title\":\"L'Avenir de la Justice, Livré Aujourd'hui\",\"landing.hero.subtitle\":\"Nextgen-Ecourt apporte efficacité, transparence et accessibilité au processus judiciaire grâce à une IA de pointe et une technologie sécurisée.\",\"landing.features.title\":\"Révolutionner les Opérations Judiciaires\",\"landing.features.subtitle\":\"Explorez les fonctionnalités puissantes conçues pour rationaliser les flux de travail et améliorer les procédures judiciaires.\",\"landing.features.summarization.title\":\"Résumé d'Affaires par IA\",\"landing.features.summarization.description\":\"Extrayez instantanément les points clés et générez des résumés concis de longs documents juridiques.\",\"landing.features.transcription.title\":\"Transcription Parole-Texte\",\"landing.features.transcription.description\":\"Convertissez avec précision les audiences du tribunal et les enregistrements audio en enregistrements textuels numériques consultables à l'aide du NLP avancé.\",\"landing.features.research.title\":\"Recherche Juridique IA\",\"landing.features.research.description\":\"Trouvez rapidement la jurisprudence, les lois et les analyses juridiques pertinentes grâce à notre assistant de recherche intelligent.\",\"landing.features.blockchain.title\":\"Registres Blockchain Sécurisés\",\"landing.features.blockchain.description\":\"Garantissez l'authenticité et l'intégrité des archives judiciaires grâce à la technologie blockchain inviolable.\",\"landing.features.virtualCourt.title\":\"Salle d'Audience Virtuelle\",\"landing.features.virtualCourt.description\":\"Menez des audiences à distance sécurisées et des vidéoconférences, augmentant l'accessibilité et réduisant les délais.\",\"landing.features.chatbot.title\":\"Chatbot Assistant Juridique IA\",\"landing.features.chatbot.description\":\"Obtenez des réponses instantanées aux questions de procédure, des conseils sur les documents et des mises à jour sur l'état des affaires.\",\"landing.features.scheduling.title\":\"Planification Intelligente\",\"landing.features.scheduling.description\":\"Optimisez automatiquement les dates d'audience et l'attribution des salles d'audience pour minimiser les retards et les temps d'attente.\",\"landing.features.workflow.title\":\"Flux de Travail Automatisés\",\"landing.features.workflow.description\":\"Rationalisez le dépôt des affaires, la gestion des documents et les processus de notification pour une efficacité maximale.\",\"landing.benefits.title\":\"Pourquoi choisir Nextgen-Ecourt ?\",\"landing.benefits.efficiency.title\":\"Efficacité Accrue\",\"landing.benefits.efficiency.description\":\"Automatisez les tâches répétitives, réduisez la paperasse et accélérez le traitement des affaires.\",\"landing.benefits.transparency.title\":\"Transparence Augmentée\",\"landing.benefits.transparency.description\":\"Fournissez un accès sécurisé et en temps réel aux informations sur les affaires pour toutes les parties autorisées.\",\"landing.benefits.accessibility.title\":\"Accessibilité Améliorée\",\"landing.benefits.accessibility.description\":\"Permettez la participation à distance et l'accès à la justice quel que soit le lieu.\",\"landing.cta.title\":\"Prêt à Moderniser Votre Tribunal ?\",\"landing.cta.subtitle\":\"Rejoignez le nombre croissant d'organismes judiciaires qui transforment leurs opérations avec Nextgen-Ecourt.\",\"landing.cta.button\":\"Commencez Aujourd'hui\",\"page.videoCall.title\":\"Appel Vidéo / Audience\",\"page.videoCall.description.joinOrCreate\":\"Rejoignez un appel vidéo existant ou démarrez-en un nouveau.\",\"page.videoCall.description.inMeeting\":\"Actuellement en réunion : {{code}}\",\"page.videoCall.joinTitle\":\"Rejoindre une Réunion Existante\",\"page.videoCall.joinDescription\":\"Entrez le code unique à 6 caractères fourni par l'hôte.\",\"page.videoCall.startTitle\":\"Démarrer une Nouvelle Réunion\",\"page.videoCall.startDescription\":\"Générez un code unique pour démarrer une nouvelle réunion.\",\"page.videoCall.label.meetingCode\":\"Code de Réunion\",\"page.videoCall.placeholder.meetingCode\":\"ABCXYZ\",\"page.videoCall.button.joinMeeting\":\"Rejoindre la Réunion\",\"page.videoCall.button.startMeeting\":\"Démarrer une Nouvelle Réunion\",\"page.videoCall.button.leaveMeeting\":\"Quitter la Réunion\",\"page.videoCall.button.copyCode\":\"Copier le Code\",\"page.videoCall.error.permissionDeniedTitle\":\"Permission Refusée\",\"page.videoCall.error.permissionDenied\":\"L'accès à la caméra et au microphone est requis pour rejoindre ou démarrer un appel vidéo. Veuillez accorder la permission dans les paramètres de votre navigateur.\",\"page.videoCall.error.permissionRequired\":\"L'accès à la caméra et au microphone est requis.\",\"page.videoCall.error.codeRequired\":\"Veuillez entrer un code de réunion.\",\"page.videoCall.error.copyFailed\":\"Échec de la copie du code dans le presse-papiers.\",\"page.videoCall.toast.joiningTitle\":\"Réunion Rejointe\",\"page.videoCall.toast.joiningDescription\":\"Connecté avec succès à la réunion {{code}}.\",\"page.videoCall.toast.startedTitle\":\"Réunion Démarrée\",\"page.videoCall.toast.startedDescription\":\"La réunion {{code}} est maintenant active. Partagez le code.\",\"page.videoCall.toast.leftMeeting\":\"Vous avez quitté la réunion.\",\"page.videoCall.toast.codeCopied\":\"Code de réunion copié dans le presse-papiers !\",\"page.videoCall.shareCode\":\"Partagez ce code avec les participants :\",\"page.videoCall.waitingForPermission\":\"En attente de la permission caméra/micro...\",\"page.videoCall.placeholder.controls\":\"Les contrôles de la réunion (muet, activer/désactiver la vidéo, partager l'écran, etc.) apparaîtraient ici.\",\"page.videoCall.permissionNeeded\":\"Accès caméra et microphone nécessaire.\",\"page.videoCall.requestingPermission\":\"Demande de permissions...\",\"page.videoCall.error.permissionInstructions\":\"Veuillez activer les permissions de la caméra et du microphone dans les paramètres de votre navigateur pour utiliser la fonction d'appel vidéo.\",\"page.videoCall.infoTitle\":\"Instructions pour l'Appel Vidéo\",\"page.videoCall.infoText\":\"Pour rejoindre une réunion, entrez le code à 6 caractères fourni par l'hôte.\",\"page.videoCall.infoTextOfficial\":\"En tant qu'Officier de Justice, vous pouvez démarrer une nouvelle réunion et partager le code généré.\",\"page.videoCall.infoTextParticipant\":\"Vous pouvez rejoindre une réunion en utilisant un code partagé par un Officier de Justice.\",\"page.videoCall.button.retryPermission\":\"Réessayer la Permission\",\"page.videoCall.participants\":\"Participants ({{count}})\",\"page.videoCall.participantListTitle\":\"Liste des Participants\",\"page.videoCall.noParticipants\":\"Aucun autre participant pour le moment.\",\"page.videoCall.you\":\"Vous\",\"page.videoCall.meetingCodeLabel\":\"Code de Réunion\",\"page.videoCall.toast.participantJoined\":\"{{name}} a rejoint la réunion.\",\"page.videoCall.toast.participantLeft\":\"{{name}} a quitté la réunion.\",\"page.videoCall.toast.connectedTitle\":\"Connecté\",\"page.videoCall.toast.connectedDescription\":\"Connexion en temps réel établie.\",\"page.videoCall.error.connectionFailedTitle\":\"Échec de la Connexion\",\"page.videoCall.error.connectionFailed\":\"Impossible de se connecter au serveur d'appel vidéo à {{url}}. Détails : {{details}}\",\"page.videoCall.error.disconnectedTitle\":\"Déconnecté\",\"page.videoCall.error.disconnected\":\"Connexion perdue avec le serveur d'appel vidéo.\",\"page.videoCall.error.configMissing\":\"L'URL du serveur d'appel vidéo n'est pas configurée.\",\"page.videoCall.error.notConnected\":\"Non connecté au serveur d'appel vidéo. Veuillez patienter ou vérifier la connexion.\",\"page.videoCall.error.invalidCodeTitle\":\"Code Invalide\",\"page.videoCall.error.invalidCodeDescription\":\"Le code de réunion doit comporter 6 lettres majuscules ou chiffres.\",\"page.videoCall.error.checkServer\":\"Veuillez vous assurer que le serveur est en cours d'exécution et accessible.\",\"page.videoCall.toast.micOn\":\"Microphone Activé\",\"page.videoCall.toast.micOff\":\"Microphone Muet\",\"page.videoCall.toast.cameraOn\":\"Caméra Activée\",\"page.videoCall.toast.cameraOff\":\"Caméra Désactivée\",\"page.videoCall.muteMicAria\":\"Couper le Microphone\",\"page.videoCall.unmuteMicAria\":\"Activer le Microphone\",\"page.videoCall.cameraOffAria\":\"Désactiver la Caméra\",\"page.videoCall.cameraOnAria\":\"Activer la Caméra\",\"page.videoCall.warning.backendTitle\":\"Backend Requis\",\"page.videoCall.warning.backendDescription\":\"Cette fonctionnalité d'appel vidéo nécessite un serveur backend Socket.IO en cours d'exécution pour la signalisation. Le code frontend est implémenté, mais assurez-vous que le serveur à {{url}} est en cours d'exécution. Sans cela, les connexions échoueront. Vérifiez la console du navigateur et les logs du serveur pour les erreurs.\",\"page.videoCall.warning.urlNotSet\":\"URL_NON_DEFINIE\",\"page.videoCall.waitingForOthers\":\"En attente d'autres participants...\",\"page.videoCall.startHint\":\"Seuls les Officiers de Justice peuvent démarrer de nouvelles réunions.\"}"));}}),
"[project]/src/i18n.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/i18next/dist/esm/i18next.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/initReactI18next.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2d$browser$2d$languagedetector$2f$dist$2f$esm$2f$i18nextBrowserLanguageDetector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/i18next-browser-languagedetector/dist/esm/i18nextBrowserLanguageDetector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$languages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/languages.ts [app-ssr] (ecmascript)");
// Import language files
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$en$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/locales/en.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$hi$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/locales/hi.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$es$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/locales/es.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$fr$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/locales/fr.json (json)");
;
;
;
;
;
;
;
;
const resources = {
    en: {
        translation: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$en$2e$json__$28$json$29$__["default"]
    },
    hi: {
        translation: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$hi$2e$json__$28$json$29$__["default"]
    },
    es: {
        translation: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$es$2e$json__$28$json$29$__["default"]
    },
    fr: {
        translation: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$fr$2e$json__$28$json$29$__["default"]
    }
};
const supportedLngs = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$languages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUPPORTED_LANGUAGES"].map((lang)=>lang.code);
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]// Detect user language
// Learn more: https://github.com/i18next/i18next-browser-languageDetector
.use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2d$browser$2d$languagedetector$2f$dist$2f$esm$2f$i18nextBrowserLanguageDetector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])// Pass the i18n instance to react-i18next.
.use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initReactI18next"])// Init i18next
// Learn more: https://www.i18next.com/overview/configuration-options
.init({
    debug: ("TURBOPACK compile-time value", "development") === 'development',
    fallbackLng: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$languages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_LOCALE"],
    supportedLngs: supportedLngs,
    resources,
    interpolation: {
        escapeValue: false
    },
    detection: {
        // Order and from where user language should be detected
        order: [
            'localStorage',
            'navigator',
            'htmlTag'
        ],
        // Keys or locations to look for the language
        lookupLocalStorage: 'nextgen-ecourt-locale',
        // Cache user language on
        caches: [
            'localStorage'
        ]
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
}}),
"[project]/src/contexts/LocaleContext.tsx [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LocaleProvider": (()=>LocaleProvider),
    "useLocale": (()=>useLocale)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n.ts [app-ssr] (ecmascript)"); // Import the configured i18next instance
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$I18nextProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/I18nextProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$languages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/languages.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
'use client';
;
;
;
;
;
;
const LocaleContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LocaleProvider({ children }) {
    const [isInitializing, setIsInitializing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [locale, _setLocale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].language);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleLanguageChanged = (lng)=>{
            _setLocale(lng);
            document.documentElement.lang = lng;
        };
        const handleInitialized = ()=>{
            _setLocale(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].language);
            document.documentElement.lang = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].language;
            setIsInitializing(false); // Mark initialization complete
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].on('languageChanged', handleLanguageChanged);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].on('initialized', handleInitialized);
        // Check if already initialized (in case event fired before listener attached)
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInitialized) {
            handleInitialized();
        }
        // Cleanup listeners on unmount
        return ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].off('languageChanged', handleLanguageChanged);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].off('initialized', handleInitialized);
        };
    }, []);
    const setLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newLocale)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$languages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUPPORTED_LANGUAGES"].some((lang)=>lang.code === newLocale)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].changeLanguage(newLocale); // Let i18next handle the change and persistence
        } else {
            console.warn(`Attempted to set unsupported locale: ${newLocale}`);
        }
    }, []);
    // Render loading state or children based on initialization status
    const renderContent = ()=>{
        if (isInitializing) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-screen w-screen fixed inset-0 bg-background z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "h-12 w-12 animate-spin text-primary"
                    }, void 0, false, {
                        fileName: "[project]/src/contexts/LocaleContext.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ml-4 text-lg text-muted-foreground",
                        children: "Loading language..."
                    }, void 0, false, {
                        fileName: "[project]/src/contexts/LocaleContext.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/contexts/LocaleContext.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this);
        }
        return children;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LocaleContext.Provider, {
        value: {
            locale,
            setLocale,
            supportedLanguages: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$languages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUPPORTED_LANGUAGES"],
            isInitializing
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$I18nextProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["I18nextProvider"], {
            i18n: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
            children: renderContent()
        }, void 0, false, {
            fileName: "[project]/src/contexts/LocaleContext.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/contexts/LocaleContext.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
function useLocale() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LocaleContext);
    if (context === undefined) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
}
;
}}),
"[project]/src/contexts/LocaleContext.tsx [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$languages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/languages.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/contexts/LocaleContext.tsx [app-ssr] (ecmascript) <locals>");
}}),
"[project]/src/components/LanguageToggle.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>LanguageToggle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/contexts/LocaleContext.tsx [app-ssr] (ecmascript) <module evaluation>"); // Use our custom hook
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/contexts/LocaleContext.tsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>"); // Use directly from react-i18next
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function LanguageToggle() {
    const { locale, setLocale, supportedLanguages, isInitializing } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useLocale"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    if (isInitializing) {
        // Optionally render a placeholder or skeleton while loading
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
            variant: "outline",
            size: "icon",
            disabled: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                className: "h-5 w-5 animate-pulse"
            }, void 0, false, {
                fileName: "[project]/src/components/LanguageToggle.tsx",
                lineNumber: 22,
                columnNumber: 59
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/LanguageToggle.tsx",
            lineNumber: 22,
            columnNumber: 12
        }, this);
    }
    const currentLanguage = supportedLanguages.find((lang)=>lang.code === locale);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    size: "icon",
                    "aria-label": t('languageToggle.selectLanguage'),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LanguageToggle.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/LanguageToggle.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/LanguageToggle.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                className: "w-48",
                align: "end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuRadioGroup"], {
                    value: locale,
                    onValueChange: setLocale,
                    children: supportedLanguages.map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuRadioItem"], {
                            value: lang.code,
                            children: [
                                lang.englishName,
                                " (",
                                lang.name,
                                ")"
                            ]
                        }, lang.code, true, {
                            fileName: "[project]/src/components/LanguageToggle.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/LanguageToggle.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/LanguageToggle.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LanguageToggle.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/layout/Header.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$NextgenEcourtLogo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/NextgenEcourtLogo.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$UserProfile$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/UserProfile.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sheet.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>"); // Added Video icon
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-plus.js [app-ssr] (ecmascript) <export default as PlusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-ssr] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LanguageToggle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function Header() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    // Base navigation items, Dashboard now points to /dashboard
    const baseNavItems = [
        {
            href: '/dashboard',
            labelKey: 'header.dashboard',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
        },
        {
            href: '/summaries',
            labelKey: 'header.aiSummaries'
        },
        {
            href: '/legal-research',
            labelKey: 'header.legalResearch'
        }
    ];
    const currentNavItems = [
        ...baseNavItems
    ];
    if (user?.role === 'Judge') {
        if (!currentNavItems.find((item)=>item.href === '/judge-dashboard')) {
            currentNavItems.push({
                href: '/judge-dashboard',
                labelKey: 'header.judgeDashboard'
            });
        }
    }
    // Add "Add Case" link for Court Officials
    if (user?.role === 'CourtOfficial') {
        if (!currentNavItems.find((item)=>item.href === '/add-case')) {
            currentNavItems.push({
                href: '/add-case',
                labelKey: 'header.addCase',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"]
            }); // Added icon
        }
    }
    // Add Video Call link for all logged-in users
    if (user && !currentNavItems.find((item)=>item.href === '/video-call')) {
        currentNavItems.push({
            href: '/video-call',
            labelKey: 'header.videoCall',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"]
        }); // Added video call link
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container flex h-16 items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "mr-6 flex items-center space-x-2",
                    "aria-label": t('header.homeAriaLabel'),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$NextgenEcourtLogo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/layout/Header.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Header.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "hidden md:flex items-center space-x-6 text-sm font-medium",
                    children: currentNavItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("transition-colors hover:text-primary flex items-center", pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"),
                            children: [
                                item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                    className: "mr-1 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 64,
                                    columnNumber: 28
                                }, this),
                                " ",
                                t(item.labelKey)
                            ]
                        }, item.href, true, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Header.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$UserProfile$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sheet"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetTrigger"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "icon",
                                        className: "shrink-0 md:hidden",
                                        "aria-label": t('header.toggleNavAriaLabel'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Header.tsx",
                                                lineNumber: 81,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: t('header.toggleNavAriaLabel')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Header.tsx",
                                                lineNumber: 82,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetContent"], {
                                    side: "left",
                                    className: "w-[280px] sm:w-[320px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                        className: "grid gap-6 text-lg font-medium pt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/",
                                                className: "flex items-center gap-2 text-lg font-semibold mb-4",
                                                "aria-label": t('header.homeAriaLabel'),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$NextgenEcourtLogo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Header.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sr-only",
                                                        children: t('appName')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Header.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/Header.tsx",
                                                lineNumber: 88,
                                                columnNumber: 17
                                            }, this),
                                            currentNavItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: item.href,
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("transition-colors hover:text-primary py-2 flex items-center", pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"),
                                                    children: [
                                                        item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                                            className: "mr-2 h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Header.tsx",
                                                            lineNumber: 105,
                                                            columnNumber: 36
                                                        }, this),
                                                        " ",
                                                        t(item.labelKey)
                                                    ]
                                                }, item.href, true, {
                                                    fileName: "[project]/src/components/layout/Header.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/Header.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Header.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Header.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Header.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/Header.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Header.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/contexts/LocaleContext.tsx [app-ssr] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LocaleProvider": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LocaleProvider"]),
    "i18n": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]),
    "useLocale": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useLocale"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/contexts/LocaleContext.tsx [app-ssr] (ecmascript) <locals>");
}}),
"[project]/src/contexts/LocaleContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LocaleProvider": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["LocaleProvider"]),
    "i18n": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["i18n"]),
    "useLocale": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["useLocale"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/contexts/LocaleContext.tsx [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LocaleContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i("[project]/src/contexts/LocaleContext.tsx [app-ssr] (ecmascript) <exports>");
}}),
"[project]/src/components/layout/Footer.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Footer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
'use client';
;
;
function Footer() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    const staticYear = '2025'; // Set the year statically
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "py-6 text-center text-sm text-muted-foreground border-t",
        children: t('footer.copyright', {
            year: staticYear
        })
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__1cdcf9f4._.js.map