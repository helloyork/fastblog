
enum APPLY_TYPE {
    BG = 'bg',
    TEXT = 'text',
    BORDER = 'border',
}

enum COLOR_TYPE {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    FOREGROUND = 'foreground',
    BACKGROUND = 'background',
}

export const Color = {
    APPLY_TYPE,
    COLOR_TYPE,
}
export const applyColor = (type: APPLY_TYPE, color: COLOR_TYPE) => {
    return `${type}-${color}`;
}

