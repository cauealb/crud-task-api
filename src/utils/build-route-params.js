export function BuildRouteParams(params) {
    const regexPath = /:([a-zA-Z]+)/g;
    const regexTasks = params.replaceAll(regexPath, '(?<$1>[a-z0-9\-_]+)');

    const newPath = new RegExp(`^${regexTasks}(?<query>\\?(.*))?$`);
    return newPath
}