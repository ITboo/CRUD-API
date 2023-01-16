
import { IUser } from "./models/userInterface";
export function isUser(obj: any): obj is IUser {
    return "username" in obj && "age" in obj && "hobbies" in obj;
  }

export function getPostData(req): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {
                resolve(body);
            });
        } catch (err) {
            reject(err);
        }
    });
}

export async function getPostJSONData(req): Promise<any> {
    try {
        const data = await getPostData(req);
        return JSON.parse(data) as Record<string, unknown>;
    } catch (err) {
        console.log(err);
        return null;
    }
}