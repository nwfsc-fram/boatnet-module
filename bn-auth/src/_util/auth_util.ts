// from https://stackoverflow.com/questions/23097928/node-js-btoa-is-not-defined-error
// Encode/decode base64 (not encryption functions)
const btoaUTF8 = function(str: any) { return Buffer.from(str, 'utf8').toString('base64'); }
const atobUTF8 = function(b64Encoded: any) {return Buffer.from(b64Encoded, 'base64').toString('utf8');}

export function decode64(encValue: string): string {
    return atobUTF8(encValue);
}

export function encode64(value: string): string {
    return btoaUTF8(value);
}