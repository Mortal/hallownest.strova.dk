// export const areaColor: Record<string, number[]> = {
//     "Dirtmouth": [255, 0, 0],
//     "Forgotten Crossroads": [0, 255, 0],
// };
export const areaColorRaw: Record<string, number[]> = {
    "Crystal Peak": [0x36, 0x30, 0x39],
    "Royal Waterways": [0x27, 0x3c, 0x3c],
    "Resting Grounds": [0x39, 0x2e, 0x29],
    "City of Tears": [0x2b, 0x2e, 0x3b],
    "Fog Canyon": [0x3d, 0x33, 0x3b],
    "Fungal Wastes": [0x39, 0x3b, 0x31],
    "Howling Cliffs": [0x1e, 0x20, 0x1f],
    "Dirtmouth": [0x2f, 0x2f, 0x2f],
    "Forgotten Crossroads": [0x2c, 0x32, 0x39],
    "Queen\'s Gardens": [0x25, 0x2d, 0x26],
    "Kingdom\'s Edge": [0x35, 0x32, 0x2c],
    "Greenpath": [0x33, 0x3c, 0x30],
    "Abyss": [0x1f, 0x1f, 0x1f],
    "Ancient Basin": [0x2f, 0x2f, 0x2e],
    "Deepnest": [0x29, 0x2d, 0x32],
    "The Hive": [0x3b, 0x34, 0x26],
}
const x = 6;
const y = x * 30;
export const areaColor = Object.fromEntries(
    Object.entries(areaColorRaw).map(
        ([k, [r, g, b]]) => [k, [x * r - y, x * g - y, x * b - y]]
    )
)

export const defaultColor = [0, 0, 255];
