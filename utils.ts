export const fmt = (stuff: string): string => stuff.split("/")[stuff.split("/").length - 1].replace(/\d/g, "").replace(/[A-Z]/g, letter => ` ${letter}`)
