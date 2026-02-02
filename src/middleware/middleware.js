export async function Middleware(req, res) {
    const buff = [];

    for await (const chunk of req) {
        buff.push(Buffer.from(String(chunk)));
    }

    try {
        req.body = JSON.parse(Buffer.concat(buff).toString());
    } catch {
        req.body = null;
    }

    res.setHeader('Content-type', 'application/json');
}