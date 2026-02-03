export function BuildRouteParams(params) {
    const regexPath = /:([a-zA-Z]+)/g;
    const test = params.replaceAll(regexPath, '/?<$1>/');
}