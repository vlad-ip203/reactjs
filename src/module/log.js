const
    LEVEL_VERBOSE = 2, LEVEL_DEBUG = 3,
    LEVEL_INFO = 4, LEVEL_WARN = 5, LEVEL_ERROR = 6,
    LEVEL_ASSERT = 7, LEVEL_WTF = 8

export class Log {
    static v(msg: string) {
        console.log(formatMessage(LEVEL_VERBOSE, msg))
    }

    static d(msg: string) {
        console.debug(formatMessage(LEVEL_DEBUG, msg))
    }

    static i(msg: string) {
        console.info(formatMessage(LEVEL_INFO, msg))
    }

    static w(msg: string) {
        console.warn(formatMessage(LEVEL_WARN, msg))
    }

    static e(msg: string) {
        console.error(formatMessage(LEVEL_ERROR, msg))
    }

    static a(condition: boolean, msg: string) {
        console.assert(condition, formatMessage(LEVEL_ASSERT, msg))
    }

    static wtf(msg: string) {
        console.error(formatMessage(LEVEL_WTF, msg))
    }
}

const getMessageLevel = (level) => {
    switch (level) {
        case LEVEL_VERBOSE:
            return "Verbose"
        case LEVEL_DEBUG :
            return "Debug  "
        case LEVEL_INFO :
            return "Info   "
        case LEVEL_WARN :
            return "Warning"
        case LEVEL_ERROR :
            return "Error  "
        case LEVEL_ASSERT :
            return "Assert "
        default:
            return "WTF    "
    }
}

function formatMessage(level, msg: string) {
    const d = new Date()
    const date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()
    const time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds()

    return `${date} ${time} | ${getMessageLevel(level)} | ${msg}`
}